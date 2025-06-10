import '../static/css/gameheader.css'
import { endgameState } from '../logic/endgameGlobalState'

export const GameHeader = () => {
    let endgame = endgameState(state => state.endgameStatus)

    return (
        <div className="gameHeader" id='display-header'>
            <p className='game-status'>{endgame}</p>
        </div>
    )
}   