import { Board } from './board'
import { Chatbox } from './chatbox'
import { GameHeader } from './gameHeader'
import { WinnerModal } from './winnerModal'
import { winnerState } from '../logic/endgameGlobalState'
import confetti from "canvas-confetti"
import { NotLoggedInModal } from './notlogged'

export const Game = () => {
    let winner = winnerState((state) => state.winner)

    if (winner){
        confetti()
    }

    return (
        <main className="game">
            <NotLoggedInModal />

            <GameHeader />
            <Board />
            <Chatbox />

            <WinnerModal />
        </main>
    )
}
