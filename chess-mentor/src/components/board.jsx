import { useState, useRef, useEffect } from "react";
import { Square } from "./square";
import '../static/css/board.css'
import { useBoardStore } from "../logic/boardGlobalState";
import { useChatStore } from "../logic/chatGlobalState";


const coordinates = ["h","g","f","e","d","c","b","a"];
const whitePieces = ["P","R","N","B","Q","K"]
const blackPieces = ["p","r","n","b","q","k"]

function calcCoordinatesbyIndex(rowIndex, colIndex){
    const x = 7-colIndex;
    const y = 8 - rowIndex%8;
    const xCoord = coordinates[x]
    return  xCoord + "" + y
}

function getIndexByCoord(coord){
    const x = coordinates.indexOf(coord[0])
    const y = parseInt(coord[1]) - 1

    return ({
        "X": x, 
        "Y": y
    })
}
function translateCoordinates(coord){
    const x = 8 - parseInt(coord[1])
    const y = 7 - coordinates.indexOf(coord[0])
    

    return ({
        "X": x, 
        "Y": y
    })
}

function isBlack(piece){
    if(piece == 0){
        return false
    }
    return piece.toLowerCase() == piece
}

function calcMoves(piece, board){
    let moves = []
    let pieceType = piece.piece

    switch (pieceType){
        case "P":
            moves = pawnMoves(translateCoordinates(piece.coordinates), board)
            break;
        case "R":
            moves = rookMoves(translateCoordinates(piece.coordinates), board)
            break;
        default:
            console.log("ERROR")
            break
    }
    return moves

}

function pawnMoves(position, board){ 
    let x = position.X - 1
    let y = position.Y
    
    let moves = []

    if(board[x][y] != undefined && board[x][y] == 0){
        let valid = calcCoordinatesbyIndex(x, y)
        moves.push(valid)
    }

    let secondX = position.X - 2
    if(position.X == 6 && board[secondX][y] == 0  && board[x][y] == 0){
        //Primer movimiento, puede moverse 2 casillas
        let valid = calcCoordinatesbyIndex(secondX, y)
        moves.push(valid)
    }

    //Tenemos que calcular si tiene también una pieza en diagonal, en cuyo caso se la debe de poder comer
    let right = position.Y + 1
    let left = position.Y - 1


    if(board[x][left] != undefined && isBlack(board[x][left])){
        let valid = calcCoordinatesbyIndex(x, left)
        moves.push(valid)
    }

    if(board[x][right] != undefined && isBlack(board[x][right])){
        let valid = calcCoordinatesbyIndex(x, right)
        moves.push(valid)
    }

    return moves
}

function rookMoves(position, board){
    let x = position.X - 1
    let y = position.Y
    //Variable donde guardaremos los posibles movimientos de la torre
    let moves = []

    let canStillMove = true

    //Calculamos los movimientos hacia arriba
    while(canStillMove){
        if(board[x] == undefined){
            canStillMove = false
            break
        }
        let nextPiece = board[x][y]

        if(nextPiece == undefined){
            canStillMove = false
        }

        //Si es una pieza blanca, no hay posibilidad
        if(whitePieces.includes(nextPiece)){
            canStillMove = false
        }else if(nextPiece == 0){
            let valid = calcCoordinatesbyIndex(x, y)
            moves.push(valid)
            x--
        }else{
            let valid = calcCoordinatesbyIndex(x, y)
            moves.push(valid)
            canStillMove = false
        }
    }

    //Calculamos los movimientos hacia abajo
    canStillMove = true
    x = position.X + 1
    while(canStillMove){
        if(board[x] == undefined){
            canStillMove = false
            break
        }
        let nextPiece = board[x][y]

        if(nextPiece == undefined){
            canStillMove = false
        }

        //Si es una pieza blanca, no hay posibilidad
        if(whitePieces.includes(nextPiece)){
            canStillMove = false
        }else if(nextPiece == 0){
            let valid = calcCoordinatesbyIndex(x, y)
            moves.push(valid)
            x++
        }else{
            let valid = calcCoordinatesbyIndex(x, y)
            moves.push(valid)
            canStillMove = false
        }
    }

    //Calculamos los movimientos en horizontal - derecha
    canStillMove = true
    x = position.X
    y = position.Y + 1
    while(canStillMove){
        if(board[x] == undefined){
            canStillMove = false
            break
        }
        let nextPiece = board[x][y]

        if(nextPiece == undefined){
            canStillMove = false
        }

        //Si es una pieza blanca, no hay posibilidad
        if(whitePieces.includes(nextPiece)){
            canStillMove = false
        }else if(nextPiece == 0){
            let valid = calcCoordinatesbyIndex(x, y)
            moves.push(valid)
            y++
        }else{
            let valid = calcCoordinatesbyIndex(x, y)
            moves.push(valid)
            canStillMove = false
        }
    }
    //Calculamos los movimientos en horizontal - izquierda
    canStillMove = true
    x = position.X
    y = position.Y - 1
    while(canStillMove){
        if(board[x] == undefined){
            canStillMove = false
            break
        }
        let nextPiece = board[x][y]

        if(nextPiece == undefined){
            canStillMove = false
        }

        //Si es una pieza blanca, no hay posibilidad
        if(whitePieces.includes(nextPiece)){
            canStillMove = false
        }else if(nextPiece == 0){
            let valid = calcCoordinatesbyIndex(x, y)
            moves.push(valid)
            y--
        }else{
            let valid = calcCoordinatesbyIndex(x, y)
            moves.push(valid)
            canStillMove = false
        }
    }



    return moves
}


export const Board = () => {
    
    let dragCompleted = useRef(false);
    let destinyPos = useRef("")
    let turnCounter = useRef(1)
    let movements = useRef("")
    //const [board, setBoard] = useState(initialBoard)
    const board = useBoardStore((state) => state.board)
    const setBoard = useBoardStore((state) => state.setBoard)
    const [draggedPiece, setDraggedPiece] = useState({coordinates: null, piece: null})
    const [validMoves, setValidMoves] = useState([])
    const [turn, setTurn] = useState("white")

    const chat = useChatStore((state) => state.chat)
    const setChat = useChatStore((state) => state.setChat)
    useEffect(() => {
        if(turn == "black"){
            //fetch
            console.log(movements.current)
            fetch("http://127.0.0.1:8000/calc-move", {
            method : "POST",
            body : JSON.stringify({ "current" : board , "history_moves" : movements.current}),
            headers: { "Content-Type": "application/json" }
            })
            .then(response => response.json())
            .then(data => JSON.parse(data.message.content))
            .then(content => {
                console.log(content)
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

                setChat(newChat)
            })

            //set turn
            setTurn("white")
        }
    }, [turn])



    const handleDragStart = (coord, piece) => {

        const pieceCopy = {coordinates: coord, piece: piece}
        
        setTimeout(() => {
            //Creamos el objeto con los datos guardados de la pieza a mover
            setDraggedPiece({
                coordinates: coord,
                piece: piece
            });
        }, 0);
        setValidMoves(calcMoves(pieceCopy, board))
    }

    const handleOnDrop = (index) => {
        dragCompleted.current = true
        destinyPos.current = translateCoordinates(index)
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

            //Eliminamos la última pieza de la memoria
            setDraggedPiece({coordinates: null, piece: null})
            dragCompleted.current = false
            setValidMoves([])
            setBoard(newBoard)
            setTurn("black")
            
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