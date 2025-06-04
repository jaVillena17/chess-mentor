import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Game } from './components/game'
import { Login } from './components/login'
import { Header } from './components/header'
import { Footer } from './components/footer'
import { Index } from './components/index'
import { Faq } from './components/faq'
import { Profile } from './components/profile'

export const App = () => {

  return (
    <Router>

      <Header />

        <Routes>
          
          <Route path="/" element={<Index />} />
          <Route path="/game" element={<Game />} />
          <Route path="/login" element={<Login />} />
          <Route path="/FaQ" element={<Faq />} />
          <Route path="/profile" element={<Profile />} />

        </Routes>
  
      <Footer />

    </Router>
  )
}

