export const coordinates = ["h","g","f","e","d","c","b","a"];
export const whitePieces = ["P","R","N","B","Q","K"]

export function calcCoordinatesbyIndex(rowIndex, colIndex){
    const x = rowIndex;
    const y = colIndex + 1
    const xCoord = coordinates[x]
    return  xCoord + "" + y
}

export function getIndexByCoord(coord){
    const x = coordinates.indexOf(coord[0])
    const y = parseInt(coord[1]) - 1

    return ({
        "X": x, 
        "Y": y
    })
}
export function translateCoordinates(coord){
    const x = parseInt(coord[1]) - 1
    const y = coordinates.indexOf(coord[0])
    

    return ({
        "X": y, 
        "Y": x
    })
}
export function isBlack(piece){
    if(piece == 0){
        return false
    }
    return piece.toLowerCase() == piece
}

export function calcMoves(piece, board, posicionesAmenazadas){
    let moves = []
    let pieceType = piece.piece

    switch (pieceType){
        case "P":
            moves = pawnMoves(translateCoordinates(piece.coordinates), board)
            break;
        case "R":
            moves = rookMoves(translateCoordinates(piece.coordinates), board)
            break;
        case "N":
            moves = knightMoves(translateCoordinates(piece.coordinates), board)
            break;
        case "B":
            moves = bishopMoves(translateCoordinates(piece.coordinates), board)
            break;
        case "Q":
            moves = queenMoves(translateCoordinates(piece.coordinates), board)
            break;
        case "K":
            moves = kingMoves(translateCoordinates(piece.coordinates), board, posicionesAmenazadas)
            break;
        default:
            console.log(pieceType)
            break
    }
    return moves

}

export function pawnMoves(position, board){ 
    let x = position.X - 1
    let y = position.Y
    let moves = []

    if(board[x][y] != undefined && board[x][y] == 0){
        let valid = calcCoordinatesbyIndex(x, y)
        moves.push(valid)
    }

    let secondX = position.X - 2
    if(position.X == 6 && board[secondX][y] == 0  && board[x][y] == 0){
        //Primer movimiento, puede moverse 2 casillas
        let valid = calcCoordinatesbyIndex(secondX, y)
        moves.push(valid)
    }

    //Tenemos que calcular si tiene también una pieza en diagonal, en cuyo caso se la debe de poder comer
    let right = position.Y + 1
    let left = position.Y - 1


    if(board[x][left] != undefined && isBlack(board[x][left])){
        let valid = calcCoordinatesbyIndex(x, left)
        moves.push(valid)
    }

    if(board[x][right] != undefined && isBlack(board[x][right])){
        let valid = calcCoordinatesbyIndex(x, right)
        moves.push(valid)
    }

    return moves
}

export function rookMoves(position, board){
    let x = position.X - 1
    let y = position.Y
    //Variable donde guardaremos los posibles movimientos de la torre
    let moves = []

    let canStillMove = true

    //Calculamos los movimientos hacia arriba
    while(canStillMove){
        let limits = x < 0 || x > 7 || y < 0 || y > 7
        if(limits ||board[x] == undefined){
            canStillMove = false
            break
        }
        let nextPiece = board[x][y]

        if(nextPiece == undefined){
            canStillMove = false
        }

        //Si es una pieza blanca, no hay posibilidad
        if(whitePieces.includes(nextPiece)){
            canStillMove = false
        }else if(nextPiece == 0){
            let valid = calcCoordinatesbyIndex(x, y)
            moves.push(valid)
            x--
        }else{
            let valid = calcCoordinatesbyIndex(x, y)
            moves.push(valid)
            canStillMove = false
        }
    }

    //Calculamos los movimientos hacia abajo
    canStillMove = true
    x = position.X + 1
    while(canStillMove){
        let limits = x < 0 || x > 7 || y < 0 || y > 7
        if(limits || board[x] == undefined){
            canStillMove = false
            break
        }
        let nextPiece = board[x][y]

        if(nextPiece == undefined){
            canStillMove = false
        }

        //Si es una pieza blanca, no hay posibilidad
        if(whitePieces.includes(nextPiece)){
            canStillMove = false
        }else if(nextPiece == 0){
            let valid = calcCoordinatesbyIndex(x, y)
            moves.push(valid)
            x++
        }else{
            let valid = calcCoordinatesbyIndex(x, y)
            moves.push(valid)
            canStillMove = false
        }
    }

    //Calculamos los movimientos en horizontal - derecha
    canStillMove = true
    x = position.X
    y = position.Y + 1
    while(canStillMove){
        let limits = x < 0 || x > 7 || y < 0 || y > 7
        if(limits || board[x] == undefined){
            canStillMove = false
            break
        }
        let nextPiece = board[x][y]

        if(nextPiece == undefined){
            canStillMove = false
        }

        //Si es una pieza blanca, no hay posibilidad
        if(whitePieces.includes(nextPiece)){
            canStillMove = false
        }else if(nextPiece == 0){
            let valid = calcCoordinatesbyIndex(x, y)
            moves.push(valid)
            y++
        }else{
            let valid = calcCoordinatesbyIndex(x, y)
            moves.push(valid)
            canStillMove = false
        }
    }
    //Calculamos los movimientos en horizontal - izquierda
    canStillMove = true
    x = position.X
    y = position.Y - 1
    while(canStillMove){
        let limits = x < 0 || x > 7 || y < 0 || y > 7
        if(limits || board[x] == undefined){
            canStillMove = false
            break
        }
        let nextPiece = board[x][y]

        if(nextPiece == undefined){
            canStillMove = false
        }

        //Si es una pieza blanca, no hay posibilidad
        if(whitePieces.includes(nextPiece)){
            canStillMove = false
        }else if(nextPiece == 0){
            let valid = calcCoordinatesbyIndex(x, y)
            moves.push(valid)
            y--
        }else{
            let valid = calcCoordinatesbyIndex(x, y)
            moves.push(valid)
            canStillMove = false
        }
    }

    return moves
}

export function knightMoves(position, board){
    let x = position.X - 2
    let y = position.Y -1
    
    let moves = []
    // Knight got 8 moves

    // up moves
    if(board[x] != undefined){
        //We have to check left and right
        if(board[x][y] != undefined && !whitePieces.includes(board[x][y])){
            let valid = calcCoordinatesbyIndex(x,y)
            moves.push(valid)
        }

        //Comprobamos la derecha
        y += 2
        if(board[x][y] != undefined && !whitePieces.includes(board[x][y])){
            let valid = calcCoordinatesbyIndex(x,y)
            moves.push(valid)
        }
    }

    //down moves
    x = position.X + 2
    y = position.Y - 1

    if(board[x] != undefined){
        //We have to check left and right
        if(board[x][y] != undefined && !whitePieces.includes(board[x][y])){
            let valid = calcCoordinatesbyIndex(x,y)
            moves.push(valid)
        }

        //Comprobamos la derecha
        y += 2
        if(board[x][y] != undefined && !whitePieces.includes(board[x][y])){
            let valid = calcCoordinatesbyIndex(x,y)
            moves.push(valid)
        }
    }

    //left moves
    x = position.X - 1
    y = position.Y - 2

    if(board[x] != undefined){
        //We have to check up and down
        if(y >= 0 && board[x][y] != undefined && !whitePieces.includes(board[x][y])){
            let valid = calcCoordinatesbyIndex(x,y)
            moves.push(valid)
        }

        //Comprobamos abajo
        x += 2
        if(x <=  7 && board[x][y] != undefined && !whitePieces.includes(board[x][y])){
            let valid = calcCoordinatesbyIndex(x,y)
            moves.push(valid)
        }
    }

    //right moves
    x = position.X - 1
    y = position.Y + 2

    if(board[x] != undefined){
        //We have to check up and down
        if(y >= 0 && board[x][y] != undefined && !whitePieces.includes(board[x][y])){
            let valid = calcCoordinatesbyIndex(x,y)
            moves.push(valid)
        }

        //Comprobamos abajo
        x += 2
        if(x <=  7 && board[x][y] != undefined && !whitePieces.includes(board[x][y])){
            let valid = calcCoordinatesbyIndex(x,y)
            moves.push(valid)
        }
    }

    

    return moves
}

export function bishopMoves(position, board){
    let x = position.X - 1
    let y = position.Y - 1
    //Variable donde guardaremos los posibles movimientos de la torre
    let moves = []

    let canStillMove = true

    //Calculamos los movimiento diagonal arriba izquierda
    while(canStillMove){
        let limits = x < 0 || x > 7 || y < 0 || y > 7
        if(limits || board[x] == undefined){
            canStillMove = false
            break
        }
        let nextPiece = board[x][y]

        if(nextPiece == undefined){
            canStillMove = false
        }

        //Si es una pieza blanca, no hay posibilidad
        if(whitePieces.includes(nextPiece)){
            canStillMove = false
        }else if(nextPiece == 0){
            let valid = calcCoordinatesbyIndex(x, y)
            moves.push(valid)
            x--
            y--
        }else{
            let valid = calcCoordinatesbyIndex(x, y)
            moves.push(valid)
            canStillMove = false
        }
    }

    //Calculamos los movimientos hacia arriba derecha
    canStillMove = true
    x = position.X - 1
    y = position.Y + 1
    while(canStillMove){
        let limits = x < 0 || x > 7 || y < 0 || y > 7
        if(limits || board[x] == undefined){
            canStillMove = false
            break
        }
        let nextPiece = board[x][y]

        if(nextPiece == undefined){
            canStillMove = false
        }

        //Si es una pieza blanca, no hay posibilidad
        if(whitePieces.includes(nextPiece)){
            canStillMove = false
        }else if(nextPiece == 0){
            let valid = calcCoordinatesbyIndex(x, y)
            moves.push(valid)
            x--
            y++
        }else{
            let valid = calcCoordinatesbyIndex(x, y)
            moves.push(valid)
            canStillMove = false
        }
    }

    //Calculamos los movimientos en diagonal abajo izquierda
    canStillMove = true
    x = position.X + 1
    y = position.Y - 1 
    while(canStillMove){
        let limits = x < 0 || x > 7 || y < 0 || y > 7
        if(limits || board[x] == undefined){
            canStillMove = false
            break
        }
        let nextPiece = board[x][y]

        if(nextPiece == undefined){
            canStillMove = false
        }

        //Si es una pieza blanca, no hay posibilidad
        if(whitePieces.includes(nextPiece)){
            canStillMove = false
        }else if(nextPiece == 0){
            let valid = calcCoordinatesbyIndex(x, y)
            moves.push(valid)
            x++
            y--
        }else{
            let valid = calcCoordinatesbyIndex(x, y)
            moves.push(valid)
            canStillMove = false
        }
    }

    //Calculamos los movimientos en diagonal abajo derecha
    canStillMove = true
    x = position.X + 1
    y = position.Y + 1 
    while(canStillMove){
        let limits = x < 0 || x > 7 || y < 0 || y > 7
        if(limits || board[x] == undefined){
            canStillMove = false
            break
        }
        let nextPiece = board[x][y]

        if(nextPiece == undefined){
            canStillMove = false
        }

        //Si es una pieza blanca, no hay posibilidad
        if(whitePieces.includes(nextPiece)){
            canStillMove = false
        }else if(nextPiece == 0){
            let valid = calcCoordinatesbyIndex(x, y)
            moves.push(valid)
            x++
            y++
        }else{
            let valid = calcCoordinatesbyIndex(x, y)
            moves.push(valid)
            canStillMove = false
        }
    }

    return moves
}

export function queenMoves(position, board){ 
    let x = position.X - 1
    let y = position.Y - 1
    
    let moves = []

    // Queen has all rook and bishop moves. Si alguien lee esto, si, los he copiado y pegado tal cual
    let canStillMove = true

    //Calculamos los movimiento diagonal arriba izquierda
    while(canStillMove){
        let limits = x < 0 || x > 7 || y < 0 || y > 7
        if(limits || board[x] == undefined){
            canStillMove = false
            break
        }
        let nextPiece = board[x][y]

        if(nextPiece == undefined){
            canStillMove = false
        }

        //Si es una pieza blanca, no hay posibilidad
        if(whitePieces.includes(nextPiece)){
            canStillMove = false
        }else if(nextPiece == 0){
            let valid = calcCoordinatesbyIndex(x, y)
            moves.push(valid)
            x--
            y--
        }else{
            let valid = calcCoordinatesbyIndex(x, y)
            moves.push(valid)
            canStillMove = false
        }
    }

    //Calculamos los movimientos hacia arriba derecha
    canStillMove = true
    x = position.X - 1
    y = position.Y + 1
    while(canStillMove){
        let limits = x < 0 || x > 7 || y < 0 || y > 7
        if(limits || board[x] == undefined){
            canStillMove = false
            break
        }
        let nextPiece = board[x][y]

        if(nextPiece == undefined){
            canStillMove = false
        }

        //Si es una pieza blanca, no hay posibilidad
        if(whitePieces.includes(nextPiece)){
            canStillMove = false
        }else if(nextPiece == 0){
            let valid = calcCoordinatesbyIndex(x, y)
            moves.push(valid)
            x--
            y++
        }else{
            let valid = calcCoordinatesbyIndex(x, y)
            moves.push(valid)
            canStillMove = false
        }
    }

    //Calculamos los movimientos en diagonal abajo izquierda
    canStillMove = true
    x = position.X + 1
    y = position.Y - 1 
    while(canStillMove){
        let limits = x < 0 || x > 7 || y < 0 || y > 7
        if(limits || board[x] == undefined){
            canStillMove = false
            break
        }
        let nextPiece = board[x][y]

        if(nextPiece == undefined){
            canStillMove = false
        }

        //Si es una pieza blanca, no hay posibilidad
        if(whitePieces.includes(nextPiece)){
            canStillMove = false
        }else if(nextPiece == 0){
            let valid = calcCoordinatesbyIndex(x, y)
            moves.push(valid)
            x++
            y--
        }else{
            let valid = calcCoordinatesbyIndex(x, y)
            moves.push(valid)
            canStillMove = false
        }
    }

    //Calculamos los movimientos en diagonal abajo derecha
    canStillMove = true
    x = position.X + 1
    y = position.Y + 1 
    while(canStillMove){
        let limits = x < 0 || x > 7 || y < 0 || y > 7
        if(limits || board[x] == undefined){
            canStillMove = false
            break
        }
        let nextPiece = board[x][y]

        if(nextPiece == undefined){
            canStillMove = false
        }

        //Si es una pieza blanca, no hay posibilidad
        if(whitePieces.includes(nextPiece)){
            canStillMove = false
        }else if(nextPiece == 0){
            let valid = calcCoordinatesbyIndex(x, y)
            moves.push(valid)
            x++
            y++
        }else{
            let valid = calcCoordinatesbyIndex(x, y)
            moves.push(valid)
            canStillMove = false
        }
    }

    x = position.X - 1
    y = position.Y
    canStillMove = true

    //Calculamos los movimientos hacia arriba
    while(canStillMove){
        let limits = x < 0 || x > 7 || y < 0 || y > 7
        if(limits || board[x] == undefined){
            canStillMove = false
            break
        }
        let nextPiece = board[x][y]

        if(nextPiece == undefined){
            canStillMove = false
        }

        //Si es una pieza blanca, no hay posibilidad
        if(whitePieces.includes(nextPiece)){
            canStillMove = false
        }else if(nextPiece == 0){
            let valid = calcCoordinatesbyIndex(x, y)
            moves.push(valid)
            x--
        }else{
            let valid = calcCoordinatesbyIndex(x, y)
            moves.push(valid)
            canStillMove = false
        }
    }

    //Calculamos los movimientos hacia abajo
    canStillMove = true
    x = position.X + 1
    while(canStillMove){
        let limits = x < 0 || x > 7 || y < 0 || y > 7
        if(limits || board[x] == undefined){
            canStillMove = false
            break
        }
        let nextPiece = board[x][y]

        if(nextPiece == undefined){
            canStillMove = false
        }

        //Si es una pieza blanca, no hay posibilidad
        if(whitePieces.includes(nextPiece)){
            canStillMove = false
        }else if(nextPiece == 0){
            let valid = calcCoordinatesbyIndex(x, y)
            moves.push(valid)
            x++
        }else{
            let valid = calcCoordinatesbyIndex(x, y)
            moves.push(valid)
            canStillMove = false
        }
    }

    //Calculamos los movimientos en horizontal - derecha
    canStillMove = true
    x = position.X
    y = position.Y + 1
    while(canStillMove){
        let limits = x < 0 || x > 7 || y < 0 || y > 7
        if(limits || board[x] == undefined){
            canStillMove = false
            break
        }
        let nextPiece = board[x][y]

        if(nextPiece == undefined){
            canStillMove = false
        }

        //Si es una pieza blanca, no hay posibilidad
        if(whitePieces.includes(nextPiece)){
            canStillMove = false
        }else if(nextPiece == 0){
            let valid = calcCoordinatesbyIndex(x, y)
            moves.push(valid)
            y++
        }else{
            let valid = calcCoordinatesbyIndex(x, y)
            moves.push(valid)
            canStillMove = false
        }
    }
    //Calculamos los movimientos en horizontal - izquierda
    canStillMove = true
    x = position.X
    y = position.Y - 1
    while(canStillMove){
        let limits = x < 0 || x > 7 || y < 0 || y > 7
        if(limits || board[x] == undefined){
            canStillMove = false
            break
        }
        let nextPiece = board[x][y]

        if(nextPiece == undefined){
            canStillMove = false
        }

        //Si es una pieza blanca, no hay posibilidad
        if(whitePieces.includes(nextPiece)){
            canStillMove = false
        }else if(nextPiece == 0){
            let valid = calcCoordinatesbyIndex(x, y)
            moves.push(valid)
            y--
        }else{
            let valid = calcCoordinatesbyIndex(x, y)
            moves.push(valid)
            canStillMove = false
        }
    }

    return moves
}

export function kingMoves(position, board, posicionesAmenazadas){
    let x = position.X 
    let y = position.Y
    
    let moves = []

    //Movimientos del alrededor
    for(let i = -1; i <= 1; i++){
        if(board[x+i] != undefined){
            for(let j = -1; j <= 1; j++){
                if(board[x+i][y+j] != undefined && !whitePieces.includes(board[x+i][y+j]) && !posicionesAmenazadas.includes(calcCoordinatesbyIndex(x+i, y+j))){
                    let valid = calcCoordinatesbyIndex(x+i, y+j)
                    moves.push(valid)
                }
            }
        }
    }

    //We have to check if the king is in his initial position
    let isKingInPlace = position.X == 7 && position.Y == 4
    
    // We have to do the same with both rooks
    let isLeftRookInPLace = board[7][0] == "R"
    let isRightRookInPLace = board[7][7] == "R"

    //Si el rey quiere enrocarse (no sé como se dice en inglés), necesita que además no haya piezas entre la torre y el mismo
    //We will check left first
    if(isKingInPlace && isLeftRookInPLace){
        let freePath = board[7][1] == 0 && board[7][2] == 0 && board[7][3] == 0

        if(freePath){
            let valid = calcCoordinatesbyIndex(7, 2)
            moves.push(valid)
        }
    }

    if(isKingInPlace && isRightRookInPLace){
        let freePath = board[7][5] == 0 && board[7][6] == 0

        if(freePath){
            let valid = calcCoordinatesbyIndex(7, 6)
            moves.push(valid)
        }
    }
    
    return moves
}

// Función que calcula un jaque
export function checkCheck(piece, board, danger){
    //Calculamos los próximos posibles movimientos de la pieza que acabamos de mover
    let nextMoves = calcMoves(piece, board, danger)
    let check = false
    //Recorremos los movimientos posibles. Si en alguno está el rey, es jaque
    nextMoves.forEach(move => {
        //Transformamos el movimiento en indices de la matriz
        let index = translateCoordinates(move)
        //Si está en rey en la posición
        if (board[index.X][index.Y] == "k"){
            check =  "JAQUE"
        }
    })

    //Si no en cuentra, retornamos false
    return check
}

export function calculateAllPossibleMoves(board, posicionesAmenazadas){
    let allMoves = {}
    board.forEach((row, x) => {

        row.forEach((square, y) => {
            if (whitePieces.includes(square)){ 
                let piece = {piece : square, coordinates : calcCoordinatesbyIndex(x, y)}
                let moves = calcMoves(piece, board, posicionesAmenazadas)
                allMoves[piece.coordinates] = {piece : piece.piece, pieceMoves : moves}
            }
        })

    })
    return allMoves
}