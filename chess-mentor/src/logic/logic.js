export function invertirMatriz(board){
    let newBoard = []

    for (let i = 7; i >= 0 ; i--) {
        let row = []
        for (let j = 7; j >= 0; j--) {
            let square = board[i][j]

            if (square == 0){
                row.push(square)
            }else if(square.toLowerCase() == square){
                row.push(square.toUpperCase())
            }else{
                row.push(square.toLowerCase())
            }
            
        }
        newBoard.push(row)
    }
    return newBoard
}