import { Board } from './components/board'
import { Chatbox } from './components/chatbox'

export const App = () => {

  return (
    <>
      <main class="game">
        <GameHeader />
        <Board />
        <Chatbox />
      </main>

    </>
  )
}

