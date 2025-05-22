import { useState, useRef, useEffect } from "react";
import { Square } from "./square";
import '../static/css/board.css'
import { useBoardStore } from "../logic/boardGlobalState";
import { useChatStore } from "../logic/chatGlobalState";
import { getIndexByCoord, calcCoordinatesbyIndex, translateCoordinates, checkCheck, calculateAllPossibleMoves } from "../logic/movesLogic";
import { endgameState } from "../logic/endgameGlobalState";
import { invertirMatriz } from "../logic/logic";



export const Board = () => {
    
    const dragCompleted = useRef(false);
    const destinyPos = useRef("")
    const turnCounter = useRef(1)
    const movements = useRef("")
    const dangerSquare = useRef([])
    const board = useBoardStore((state) => state.board)
    const setBoard = useBoardStore((state) => state.setBoard)
    const [draggedPiece, setDraggedPiece] = useState({coordinates: null, piece: null})
    const [validMoves, setValidMoves] = useState([])
    const [allMoves, setAllMoves] = useState(calculateAllPossibleMoves(board, dangerSquare.current))
    const [turn, setTurn] = useState("white")
    const endGame = endgameState((state) => state.endgameStatus)
    const setEndgame = endgameState((state) => state.setEndgameStatus)

    let blackMoves = useRef({})

    const chat = useChatStore((state) => state.chat)
    const setChat = useChatStore((state) => state.setChat)
    useEffect(() => {
        if(turn == "black"){
            //fetch
            fetch("http://127.0.0.1:8000/calc-move", {
            method : "POST",
            body : JSON.stringify({ "current" : board , "history_moves" : movements.current}),
            headers: { "Content-Type": "application/json" }
            })
            .then(response => response.json())
            .then(data => JSON.parse(data.message.content))
            .then(content => {
                let piece = content.pieceToMove.toLowerCase()
                let origin = getIndexByCoord(content.pieceOrigin)
                let destination = getIndexByCoord(content.pieceDestination)
                let explanation = content.moveExplanation

                let newBoard = [...board]
                newBoard[origin.X][origin.Y] = 0
                newBoard[destination.X][destination.Y] = piece

                setBoard(newBoard)
                turnCounter.current++
                movements.current += ` ${piece}${content.pieceDestination} `


                let newChat = {
                    ...chat,
                    [Date.now()] : { "from_" :"assistant","text" : explanation},
                }
                //set chat
                setChat(newChat)
                //set turn
                setTurn("white")
            })
        }
    }, [turn])



    const handleDragStart = (coord, piece) => {
        //Creamos el objeto con los datos guardados de la pieza a mover
        setDraggedPiece({
           coordinates: coord,
            piece: piece
        }); 
        console.log(allMoves)
        setValidMoves(allMoves[coord].pieceMoves)
        
        
    }

    const handleOnDrop = (index) => {
        dragCompleted.current = true
        let destination = translateCoordinates(index)
        destinyPos.current = destination

        //Aquí sacar la pieza que hay en el destino, si es el rey, game over
        let targetPiece = board[destination.X][destination.Y]

        if(targetPiece == "k"){
            setEndgame("YOU WON")
        }
    }

    const handleDragEnd = () => {
        if(dragCompleted.current){
            
            let initialDraggedPosition = translateCoordinates(draggedPiece.coordinates)
            let newBoard = [];
            //Copiamos vamos copiando los valores en el nuevo board
            board.forEach((row, indexX) => {
                let newRow = []

                row.forEach((_, indexY) => {


                    if(indexX == initialDraggedPosition.X && indexY == initialDraggedPosition.Y){
                        newRow.push(0)
                    }else if ((indexX == destinyPos.current.X && indexY == destinyPos.current.Y)){
                        newRow.push(draggedPiece.piece)
                    }else{
                        newRow.push(board[indexX][indexY])
                    }
                })

                newBoard.push(newRow)
                
            })

            let pieceStringForHistory = (draggedPiece.piece == "P") ? "" : draggedPiece.piece
            let index = calcCoordinatesbyIndex(destinyPos.current.X,destinyPos.current.Y)
            movements.current += `${turnCounter.current}. ${pieceStringForHistory}${index}`

            //Control del enroque a posteriori, creo que es la forma más simple de controlarlo
                //Primero enroque largo
                if(draggedPiece.piece == "K" && destinyPos.current.X == 7 && destinyPos.current.Y == 2){
                    //Borramos la torre de su posicion
                    newBoard[7][0] = "0"
                    //Movemos la torre a donde tiene que ir
                    newBoard[7][3] = "R"
                }

                //Ahora para el enroque corto
                else if (draggedPiece.piece == "K" && destinyPos.current.X == 7 && destinyPos.current.Y == 6){
                    //Borramos la torre de su posicion
                    newBoard[7][7] = "0"
                    //Movemos la torre a donde tiene que ir
                    newBoard[7][5] = "R"
                }
            //Comprobamos jaque
            let check = checkCheck({piece : draggedPiece.piece, coordinates : calcCoordinatesbyIndex(destinyPos.current.X, destinyPos.current.Y)}, newBoard, dangerSquare.current)
            if (check){
                setEndgame(check)
            }

            //Eliminamos la última pieza de la memoria
            setDraggedPiece({coordinates: null, piece: null})
            dragCompleted.current = false
            setValidMoves([])
            setBoard(newBoard)
            //Estos van a ser todos los nuevos movimientos que tenemos en nuestra nueva posición
            let allNewMoves = calculateAllPossibleMoves(newBoard, dangerSquare.current)
            console.log(allNewMoves)
            //Tenemos que actualizar los nuevos peligros
            let newDangers = []
            for (const [_, value] of Object.entries(allMoves)){
                let moves = value.pieceMoves
                newDangers.push(...moves)
            }
            //Actualizamos los peligros
            dangerSquare.current = newDangers
            
            //Calculamos movimientos para las piezas negras con dichos peligros
            //le damos la vuelta a la matriz
            let blackBoard = invertirMatriz(newBoard)
            let blackOptions = calculateAllPossibleMoves(blackBoard, dangerSquare.current)
            blackMoves.current = blackOptions
            console.log(blackOptions)
            //Controlar jaque mate y ahogado aqui, si todos los posibles movimientos están vacios
            
            let blackMovesCounter =  0
            for (const [_, value] of Object.entries(blackOptions)){
                let moves = value.pieceMoves
                blackMovesCounter += moves.length
            }

            if(blackMovesCounter == 0 && endGame == "check"){
                setEndgame("CHECKMATE")
            }else if(blackMovesCounter == 0 && endGame == "KEEP PLAYING"){
                setEndgame("DROWNED")
            }
            //setTurn("black")
            
            
        }else{
            let newBoard = [...board]
            let  coordInit = translateCoordinates(draggedPiece.coordinates)
            newBoard[coordInit.X][coordInit.Y] = draggedPiece.piece 
            setDraggedPiece({coordinates: null, piece: null})
            setValidMoves([])
            setBoard(newBoard)
        }
        
    }

    return (
        <div className="flex-board">
            {board.map((row, rowIndex) => {
                return (
                    row.map((piece, colIndex) =>  (
                            <Square 
                                key={`${rowIndex}, ${colIndex}`}
                                index={calcCoordinatesbyIndex(rowIndex, colIndex)}
                                piece={piece}
                                row={rowIndex%2}
                                onDrop = {handleOnDrop}
                                onDragStart = {handleDragStart}
                                onDragOver = {(e) => e.preventDefault()}
                                onDragEnd = {handleDragEnd}
                                draggedPiece = {draggedPiece.coordinates}
                                validMoves = {validMoves}
                                whosTurn = {turn}
                            />)
                    )
            )})}
        </div>
    )
}