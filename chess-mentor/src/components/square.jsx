export const Square = ({index, piece, row, onDrop, onDragStart, onDragOver, onDragEnd, draggedPiece,  validMoves, whosTurn}) => {

    let pieceRoute = ""

    if (piece.length > 1) piece = piece.substring(0,1)

    if(piece != 0){
        pieceRoute = (piece.toLowerCase() == piece) ? "assets/Pieces/black/" : "assets/Pieces/white/"
    }
    const letras = ["a", "c", "d", "e", "f", "g", "h"]
    if(letras.includes(piece)){
        piece = 'p'
    }
    const handleDragStart = () => {
        onDragStart(index, piece)
    }

    const handleDrop = (e) => {
        e.preventDefault()
        if(validMoves.includes(index)) onDrop(index)
    }

    const handleDragEnd = () => {
        onDragEnd()
    }

    const isPieceWhite = piece != 0 && piece.toUpperCase() == piece

    let validMvClass = validMoves.includes(index) ? " valid-move" : ""
    
    const SquareClasses = `square${validMvClass}`

    return (
        <div className={SquareClasses} id={`${index}`} row={`${row}`} onDrop={handleDrop} onDragOver={onDragOver}>
           {piece != 0 && 
                <img 
                    src={`${pieceRoute}${piece}.svg`} 
                    draggable={(whosTurn == "white" && isPieceWhite) ? "true" : "false"}
                    className={index == draggedPiece ? "display-none" : ""} 
                    onDragStart={handleDragStart} 
                    onDragEnd={handleDragEnd} 
                />}
        </div>
    )
}