export const NotLoggedInModal = () => {
    let user = localStorage.getItem("currentUser")
    if (!user){
        return (
        <span className="modal-background w-[85vw]">
            <div className="winner-modal">
                <h2 className="text-2xl text-center font-bold mb-5">Necesitas Iniciar Sesión <br />para poder jugar</h2>
                <img className="mb-5" src="./assets/logo-game.png" alt="./assets/logo-nipa.png" />
                <a href="http://localhost:5173/login" className="bg-[#2b2a2a] p-5 rounded-md border-[#8b7925] border">Ir a Inicio de Sesión</a>
            </div>
        </span>
        )
    }else{
        return null
    }
}