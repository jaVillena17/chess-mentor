import { useRef, useState, useEffect } from "react"
import { BoardReplay } from "./boardReplay"

const baseBoard =  [
        ["r", "n", "b", "q", "k", "b", "n", "r"],
        ["p", "p", "p", "p", "p", "p", "p", "p"],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        ["P", "P", "P", "P", "P", "P", "P", "P"],
        ["R", "N", "B", "Q", "K", "B", "N", "R"]
    ]

export const GameReplay  = ({game}) => {

    const [board, setBoard] = useState(baseBoard)
    const currentTurn = useRef(0)
    const capturedPieces = useRef({})

    useEffect(() => {
        setBoard(baseBoard)
        currentTurn.current = 0
    }, [game])

    if (!game) return null

    const pass = () => {
        console.log("Nice try, Carmelo")
    }

    const turnBack = () => {
        new Audio("./assets/sound-effects/move-self.mp3").play()
        let previousTurn = currentTurn.current
        let piece = game[previousTurn].p
        let origin = game[previousTurn].d
        let destination = game[previousTurn].o

        let newBoard = [];
            //Copiamos vamos copiando los valores en el nuevo board
            board.forEach((row, indexX) => {
                let newRow = []

                row.forEach((_, indexY) => {


                    if(indexX == parseInt(origin[0]) && indexY == parseInt(origin[1])){
                        newRow.push((capturedPieces.current[previousTurn] ? capturedPieces.current[""+previousTurn] : 0))
                    }else if (indexX == parseInt(destination[0]) && indexY == parseInt(destination[1])){
                        if (piece == "Q" && parseInt(origin[0]) == 0){
                            newRow.push("P")
                        }else{
                            newRow.push(piece)
                        }
                        
                    }else{
                        newRow.push(board[indexX][indexY])
                    }
                })

                newBoard.push(newRow)
                
            })
        
        currentTurn.current = previousTurn - 1
        setBoard(newBoard)
    }

    const turnForward = () => {
        new Audio("./assets/sound-effects/move-self.mp3").play()
        let nextTurn = currentTurn.current + 1
        let piece = game[nextTurn].p
        let destination = game[nextTurn].d
        let origin = game[nextTurn].o

        let newBoard = [];
            //Copiamos vamos copiando los valores en el nuevo board
            board.forEach((row, indexX) => {
                let newRow = []

                row.forEach((_, indexY) => {


                    if(indexX == parseInt(origin[0]) && indexY == parseInt(origin[1])){
                        newRow.push(0)
                    }else if (indexX == parseInt(destination[0]) && indexY == parseInt(destination[1])){
                        newRow.push(piece)
                        if ((board[parseInt(destination[0])][parseInt(destination[1])] != 0) && !capturedPieces.current[nextTurn]){
                            capturedPieces.current = {
                                ...capturedPieces.current,
                                [nextTurn] : board[parseInt(destination[0])][parseInt(destination[1])]
                            }
                        }
                    }else{
                        newRow.push(board[indexX][indexY])
                    }
                })

                newBoard.push(newRow)
                
            })
        
        currentTurn.current = nextTurn
        setBoard(newBoard)
    }

    const setReplay = () => {
        // Guardamos el tablero
        localStorage.setItem('currentBoard', JSON.stringify(board))

        //Calculamos de quien es el turno y lo guardamos tambien
        let turn = (currentTurn.current % 2 == 0) ? "white" : "black"
        localStorage.setItem("replayTurn", turn)
        localStorage.setItem("saveGame", "no")
        //Redirigimos a la pantalla de juego
       window.location.href = "http://localhost:5173/game"
    }

    

    return ( 
        <div className="relative w-[80vw] h-[80vw] flex flex-row items-center lg:w-[40vw] lg:h-[auto]">
            <svg className={(currentTurn.current) > 0 ? "w-[50px] h-[50px] fill-[#8b7925] hover:cursor-pointer" : "w-[50px] h-[50px] fill-[#534e38]"} onClick={(currentTurn.current) > 0 ? turnBack : pass} xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 463.95"><path fill-rule="nonzero" d="M512 332.66H268.5v92.31c-.68 15.47-5.77 26.46-15.43 32.82-25.79 17.2-52.31-5.26-69.24-22.6L14.33 261.6c-19.11-17.28-19.11-41.93 0-59.21L188.71 24.42c16.06-16.39 40.56-34.09 64.36-18.21 9.66 6.35 14.75 17.34 15.43 32.81v92.31H512v201.33z"/></svg>
            <BoardReplay board={board}/>
            <svg className={(currentTurn.current) < Object.keys(game).length ? "w-[50px] h-[50px] fill-[#8b7925] hover:cursor-pointer" : "w-[50px] h-[50px] fill-[#534e38]"} onClick={(currentTurn.current) < Object.keys(game).length ? turnForward : pass} xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 463.96"><path fill-rule="nonzero" d="M0 131.29h243.5v-92.3c.68-15.48 5.77-26.47 15.42-32.82 25.8-17.21 52.31 5.25 69.25 22.6l169.5 173.58c19.1 17.29 19.1 41.93 0 59.22L323.28 439.53c-16.06 16.39-40.55 34.09-64.36 18.22-9.65-6.36-14.74-17.35-15.42-32.82v-92.3H0V131.29z"/></svg>
            <button className="relative top-[-180px] h-[100px] border-[#8b7925] border" onClick={setReplay}>Retomar en esta posicion</button>
        </div>
    )
}