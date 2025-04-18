import { useState, useRef } from "react";
import { Square } from "./square";
import '../static/css/board.css'

const initialBoard = [
    ["Tb","Hb","Bb","Qb","Kb","Bb","Hb","Tb"],
    ["Pb","Pb","Pb","Pb","Pb","Pb","Pb","Pb"],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    ["Pw","Pw","Pw","Pw","Pw","Pw","Pw","Pw"],
    ["Tw","Hw","Bw","Qw","Kw","Bw","Hw","Tw"]
];

const coordinates = ["h","g","f","e","d","c","b","a"];

function calcCoordinatesbyIndex(index, indice){
    const x = indice;
    const xCoord = coordinates[x]
    const y = index%8 + 1;
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

function calcMoves(piece, board){
    let options = []

    let pieceType = piece.piece.substring(0,1)
    let pieceColor = piece.piece.substring(1)
    

    switch (pieceType){
        case "P":
            calcMovesPawn(translateCoordinates(piece.coordinates), pieceColor, board)
            break
        default:
            console.log("ERROR")
            break
    }

    return options

}

function calcMovesPawn(position, color, board){
    
}



export const Board = () => {
    
    let dragCompleted = useRef(false);
    let destinyPos = useRef("")
    const [board, setBoard] = useState(initialBoard)
    const [draggedPiece, setDraggedPiece] = useState({coordinates: null, piece: null})
    const [validMoves, setValidMoves] = useState([])
    const handleDragStart = (coord, piece) => {
        //Creamos el objeto con los datos guardados de la pieza a mover
        setTimeout(() => {
            setDraggedPiece({
                coordinates: coord,
                piece: piece
            });
        }, 0);    

       
        setValidMoves(calcMoves(draggedPiece, board))

    }

    const handleOnDrop = (index) => {
        dragCompleted.current = true
        destinyPos.current = translateCoordinates(index)
    }

    const handleDragEnd = () => {
        if(dragCompleted.current){
            
            let initialDraggedPosition = translateCoordinates(draggedPiece.coordinates)
            console.log(initialDraggedPosition)
            console.log(destinyPos.current)
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
            console.log(newBoard)
            //Eliminamos la última pieza de la memoria
            setDraggedPiece({coordinates: null, piece: null})
            dragCompleted.current = false

            setBoard(newBoard)
            
        }else{
            let newBoard = [...board]
            let  coordInit = translateCoordinates(draggedPiece.coordinates)
            newBoard[coordInit.X][coordInit.Y] = draggedPiece.piece 
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
                                index={calcCoordinatesbyIndex(colIndex, rowIndex)}
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