import { useState, useRef, useEffect } from "react";
import { Square } from "./square";
import '../static/css/board.css'
import { useBoardStore } from "../logic/boardGlobalState";


const coordinates = ["h","g","f","e","d","c","b","a"];

function calcCoordinatesbyIndex(rowIndex, colIndex){
    const x = 7-colIndex;
    const y = 8 - rowIndex%8;
    const xCoord = coordinates[x]
    return  xCoord + "" + y
}

function translateCoordinates(coord){
    const x = 8 - parseInt(coord[1])
    const y = 7 - coordinates.indexOf(coord[0])
    

    return ({
        "X": x, 
        "Y": y
    })
}

function calcMoves(piece, board){
    let moves = []
    let pieceType = piece.piece

    switch (pieceType){
        case "P":
            moves = pawnMoves(translateCoordinates(piece.coordinates), board)
            break
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

     if(board[x][y] != undefined){
        let valid = calcCoordinatesbyIndex(x, y)
        moves.push(valid)
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

    useEffect(() => {
        if(turn == "black"){
            //fetch

            fetch("http://127.0.0.1:8000/calc-move", {
            method : "POST",
            body : JSON.stringify({ "current" : board , "history_moves" : movements.current}),
            headers: { "Content-Type": "application/json" }
            })
            .then(response => response.json())
            .then(data => data.message.content)
            .then(rip => console.log(rip))

            //set board

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