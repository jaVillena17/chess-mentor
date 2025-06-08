import { GameReplay } from "./gameReplay"
import { GamePreview } from "./gameReview"
import { useState } from "react"
    

export const UserGamesProfile = ({games}) => {
    let gameList = Object.entries(games)

    const [game, setGame] = useState(false)

    return (
        <div className="flex flex-row justify-between">
            <div className="flex flex-row flex-wrap h-[100px]">
                {gameList.map((partida, index) => {
                    return (
                        <GamePreview game={partida[1]} key={partida[0]} clave={index + 1} set={setGame} notUsed={game}/>
                    )
                })}
            </div>


            <GameReplay game={game} />
        </div>
        
    )

}