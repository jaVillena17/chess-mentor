import { winnerState } from "../logic/endgameGlobalState"
import '../static/css/winnerModal.css'
let board = [
        ["r", "n", "b", "q", "k", "b", "n", "r"],
        ["p", "p", "p", "p", "p", "p", "p", "p"],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        ["P", "P", "P", "P", "P", "P", "P", "P"],
        ["R", "N", "B", "Q", "K", "B", "N", "R"]
    ]


export const WinnerModal = () => {
    let winner = winnerState((state) => state.winner)
    let setWinner = winnerState((state) => state.setWinner)
    
    if (winner === null) return null
    
    const getOut = () => {
        setWinner(null)
    } 

    const playAgain = () => {
        localStorage.setItem("currentBoard", JSON.stringify(board))
        localStorage.setItem("replayTurn", "white")
        setWinner(null)
        
        location.reload()
    }


    return (
        <span className="modal-background">
            <div className="winner-modal">
                <h2>{winner}</h2>
                <img src="./assets/checkmate.png" alt="checkmate" />

                <div className="button-container">
                    <button onClick={playAgain}>Jugar Otra vez</button>
                    <button onClick={getOut}>Salir</button>
                </div>
            </div>
        </span>
        
    )
}