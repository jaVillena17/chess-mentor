import { useState, useRef } from "react";
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
    let pieceType = piece.piece.substring(0,1)
    let pieceColor = piece.piece.substring(1)
    

    switch (pieceType){
        case "P":
            console.log(piece.coordinates)
            console.log(translateCoordinates(piece.coordinates))
            moves = pawnMoves(translateCoordinates(piece.coordinates), pieceColor, board)
            break
        default:
            console.log("ERROR")
            break
    }
    return moves

}

function pawnMoves(position, color, board){

    

     let x = color == "w" ? position.X - 1 :  position.X + 1
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
    //const [board, setBoard] = useState(initialBoard)
    const board = useBoardStore((state) => state.board)
    const setBoard = useBoardStore((state) => state.setBoard)
    const [draggedPiece, setDraggedPiece] = useState({coordinates: null, piece: null})
    const [validMoves, setValidMoves] = useState([])


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
        console.log(validMoves)
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
            //Eliminamos la última pieza de la memoria
            setDraggedPiece({coordinates: null, piece: null})
            dragCompleted.current = false
            setValidMoves([])
            setBoard(newBoard)
            
        }else{
            let newBoard = [...board]
            let  coordInit = translateCoordinates(draggedPiece.coordinates)
            newBoard[coordInit.X][coordInit.Y] = draggedPiece.piece 
            setDraggedPiece({coordinates: null, piece: null})
            setValidMoves([])
            setBoard(newBoard)
        }
        
    }

    // TODO : Añadir las imágenes, evitar que una pieza se elimine al dropearse sobre si misma, hacer que el draggear la pieza desapareza de su celda y se mueva
    


                
    //console.log(calcCoordinatesbyIndex(draggedPiece.coordinates))     
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
                            />)
                    )
            )})}
        </div>
    )
}