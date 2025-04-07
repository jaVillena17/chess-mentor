export const Square = ({index, piece, row, onDrop, onDragStart, onDragOver, validMoves}) => {
    
    const pieceImages = {
        "Tb": "assets/Pieces/Chess_rdt45.svg",
        "Hb": "assets/Pieces/Chess_ndt45.svg",
        "Bb": "assets/Pieces/Chess_bdt45.svg",
        "Qb": "assets/Pieces/Chess_qdt45.svg",
        "Kb": "assets/Pieces/Chess_kdt45.svg",
        "Tw": "assets/Pieces/Chess_rlt45.svg",
        "Hw": "assets/Pieces/Chess_nlt45.svg",
        "Bw": "assets/Pieces/Chess_blt45.svg",
        "Qw": "assets/Pieces/Chess_qlt45.svg",
        "Kw": "assets/Pieces/Chess_klt45.svg",
        "Pb": "assets/Pieces/Chess_pdt45.svg",
        "Pw": "assets/Pieces/Chess_plt45.svg"
    }



    const handleDragStart = () => {
        onDragStart(index, piece)
    }

    const handleDrop = (e) => {
        e.preventDefault()
        onDrop(index)
    }

    return (
        <div className="square" id={`${index}`} row={`${row}`} onDrop={handleDrop} onDragOver={onDragOver}>
           {piece != 0 && <img src={pieceImages[piece]} draggable="true" onDragStart={handleDragStart} />}
        </div>
    )
}