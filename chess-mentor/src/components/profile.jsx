import { useEffect } from "react"
import { UserSession } from "../logic/userGlobalState"

export const Profile = () => {
    let user = UserSession((state) => state.user)

    useEffect(() => {
        //Obtener las estadísticas del usuario

    }, [])

    return (
        <main>

        </main>
    )
}