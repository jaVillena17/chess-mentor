import { Board } from './components/board'
import { Chatbox } from './components/chatbox'
import { GameHeader } from './components/gameHeader'
import { Header } from './components/header'
import { Footer } from './components/footer'

export const App = () => {

  return (
    <>
      <Header />
      <main className="game">
        <GameHeader />
        <Board />
        <Chatbox />
      </main>

      <Footer />

    </>
  )
}

