import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Game } from './components/game'
import { Login } from './components/login'
import { Header } from './components/header'
import { Footer } from './components/footer'

export const App = () => {

  return (
    <Router>

      <Header />

        <Routes>
          
          <Route path="/game" element={<Game />} />
          <Route path="/login" element={<Login />} />

        </Routes>
  
      <Footer />

    </Router>
  )
}

