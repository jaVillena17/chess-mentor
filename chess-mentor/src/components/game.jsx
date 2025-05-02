import { Board } from './board'
import { Chatbox } from './chatbox'
import { GameHeader } from './gameHeader'

export const Game = () => {
    return (
        <main className="game">
            <GameHeader />
            <Board />
            <Chatbox />
        </main>
    )
}
