export const Square = ({index, piece, row}) => {
    return (
        <div className="square" id={`${index}`} row={`${row}`}>
           {piece != 0 && piece} 
        </div>
    )
}