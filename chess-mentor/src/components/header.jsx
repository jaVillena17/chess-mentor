import '../static/css/header.css'
import { Link } from 'react-router-dom'

const views = ["Inicio", "Game", "FaQ", "Login"]

export const Header = () => {
    return (
        <nav className="header-nav">
            <div>
                <img src="/assets/logo-nipa.png" alt="Logo" /><br />
                <span className='logoName'>Chess - Mentor</span>
            </div>
            
            {views.map((link) => {

                if (link == "Inicio"){
                    return (
                        <Link to={`/`} key={link}>{link}</Link>
                    )
                }
                return (
                    <Link to={`/${link}`} key={link}>{link}</Link>
                )
            })}
        </nav>
    )
}