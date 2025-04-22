import '../static/css/header.css'
import { Link } from 'react-router-dom'

const views = ["Inicio", "Jugar", "Social", "FaQ", "Quienés Sómos","Iniciar Sesión"]

export const Header = () => {
    return (
        <nav className="header-nav">
            <img src="/assets/logo.png" alt="Logo" />
            {views.map((link) => {
                return (
                    <Link to={`/${link}`} key={link}>{link}</Link>
                )
            })}
        </nav>
    )
}