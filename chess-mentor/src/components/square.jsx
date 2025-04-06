export const Square = ({index, piece, row, onDrop, onDragStart, onDragOver, validMoves}) => {
    




    const handleDragStart = () => {
        onDragStart(index, piece)
    }

    const handleDrop = (e) => {
        e.preventDefault()
        onDrop(index)
    }

    return (
        <div className="square" id={`${index}`} row={`${row}`} onDrop={handleDrop} onDragOver={onDragOver}>
           <span draggable="true" onDragStart={handleDragStart}>{piece != 0 && piece}</span>
        </div>
    )
}