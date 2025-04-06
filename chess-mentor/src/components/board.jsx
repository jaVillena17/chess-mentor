import { useState } from "react";
import { Square } from "./square";

const initialBoard = [
    ["t","h","b","q","k","b","h","t"],
    ["p","p","p","p","p","p","p","p"],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    ["p","p","p","p","p","p","p","p"],
    ["t","h","b","q","k","b","h","t"]
];

const coordinates = ["h","g","f","e","d","c","b","a"];

function calcCoordinatesbyIndex(index, indice){
    const x = indice;
    const xCoord = coordinates[x]
    const y = index%8 + 1 

    return xCoord + "" + y
}

function translateCoordinates(coord){
    const x = coordinates.indexOf(coord[0])
    const y = parseInt(coord[1]) - 1 

    return ({
        "X": x, 
        "Y": y
    })
}



export const Board = () =>{
    const [board, setBoard] = useState(initialBoard)
    const [draggedPiece, setDraggedPiece] = useState(null)
    const [validMoves, setValidMoves] = useState([])

    const handleDragStart = (coord, piece) => {
        setDraggedPiece({
            coordinates : coord,
            piece: piece
        })     
    }

    const handleOnDrop = (coord) => {
        let initialDraggedPosition = translateCoordinates(draggedPiece.coordinates)
        let destinyPosition = translateCoordinates(coord)

        let newBoard = [];
        //Copiamos vamos copiando los valores en el nuevo board
        board.forEach((row, indexX) => {
            let newRow = []

            row.forEach((_, indexY) => {


                if(indexX == initialDraggedPosition.X && indexY == initialDraggedPosition.Y){
                    newRow.push(0)
                }else if ((indexX == destinyPosition.X && indexY == destinyPosition.Y)){
                    newRow.push(draggedPiece.piece)
                }else{
                    newRow.push(board[indexX][indexY])
                }
            })

            newBoard.push(newRow)
        })

        setBoard(newBoard)
    }
    


                
                
    return (
        <div className="flex-board">
            {board.map((row, rowIndex) => {
                return (
                    row.map((piece, colIndex) =>  (
                            <Square 
                                key={`${rowIndex}, ${colIndex}`}
                                index={calcCoordinatesbyIndex(colIndex, rowIndex)}
                                piece={piece}
                                row={rowIndex%2}
                                onDrop = {handleOnDrop}
                                onDragStart = {handleDragStart}
                                onDragOver = {(e) => e.preventDefault()}
                                validMoves = {validMoves}
                            />)
                    )
            )})}
        </div>
    )
}