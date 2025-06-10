import { GameReplay } from "./gameReplay"
import { GamePreview } from "./gameReview"
import { useState } from "react"
    

export const UserGamesProfile = ({games}) => {
    let gameList = Object.entries(games)

    const [game, setGame] = useState(false)
    const [review, setReview] = useState(null)

    return (
        <div className="flex flex-row justify-between max-h-[480px] max-w-[85vw]">
            <div className="flex flex-row flex-wrap h-[100px]">
                {gameList.map((partida, index) => {
                    return (
                        <GamePreview game={partida[1]} key={partida[0]} clave={index + 1} set={setGame} notUsed={game} setReview={setReview}/>
                    )
                })}
                {review && (
                    <div>
                        <h2 className="text-[#8b7925] undeline">Consejos</h2>
                        <p className="text-white">{review}</p>
                    </div>
                )}
            </div>


            <GameReplay game={game} />
        </div>
        
    )

}