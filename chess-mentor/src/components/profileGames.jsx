import { GamePreview } from "./gameReview"

export const UserGamesProfile = ({games}) => {
    let gameList = Object.entries(games)
    return (
        <div>
            {gameList.map((partida, index) => {
                return (
                    <GamePreview game={partida[1]} key={index} />
                )
            })}
        </div>
    )

}