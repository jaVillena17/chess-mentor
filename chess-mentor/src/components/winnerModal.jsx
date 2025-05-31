import { winnerState } from "../logic/endgameGlobalState"
import '../static/css/winnerModal.css'

export const WinnerModal = () => {
    let winner = winnerState((state) => state.winner)
    
    if (winner === null) return null

    return (
        <span className="modal-background">
            <div className="winner-modal">
                <h2>{winner}</h2>
                <img src="./assets/checkmate.png" alt="checkmate" />

                <div className="button-container">
                    <button>Jugar Otra vez</button>
                    <button>Salir</button>
                </div>
            </div>
        </span>
        
    )
}