import { calcCoordinatesbyIndex } from "../logic/movesLogic"
import { Square } from "./square"

export const BoardReplay = ({board}) => {
    return (
        <div className="max-h-[50vh] max-w-[50vh] flex-board">
            {board.map((row, rowIndex) => {
                return (
                    row.map((piece, colIndex) =>  (
                            <Square 
                                key={`${rowIndex}, ${colIndex}`}
                                index={calcCoordinatesbyIndex(rowIndex, colIndex)}
                                piece={piece}
                                row={rowIndex%2}
                                onDrop = {null}
                                onDragStart = {null}
                                onDragOver = {null}
                                onDragEnd = {null}
                                draggedPiece = {"null"}
                                validMoves = {"null"}
                                whosTurn = {null}
                            />)
                    )
            )})}
        </div>
    )
}