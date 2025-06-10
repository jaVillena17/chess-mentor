export const GamePreview = ({game, set, setReview}) => {
    let userName = localStorage.getItem("currentUser").userName
    let isWin = game.game.winner == userName

    const handleOnClick = () => {
        set(JSON.parse(game.game.movimientos))
        setReview(game.valoracion.consejos)
    }

    return (
        <div className="border-[#8b7925] border mr-5 mb-5 p-5 rounded-lg hover:cursor-pointer" onClick={handleOnClick}>
            <h2 className="text-[#8b7925] font-extrabold">{(isWin) ? "VICTORIA" : "DERROTA"}</h2>
            <span className="text-white font-mono">{game.game.fecha}</span>
        </div>
    )   

}