import { useEffect, useRef, useState } from "react"
import { GeneralUserStats } from "./userStats"
import { UserGamesProfile } from "./profileGames"
import { UserSession } from "../logic/userGlobalState"

export const Profile = () => {
    let user = JSON.parse(localStorage.getItem("currentUser"))
    let token = user.access_token
    let setUser = UserSession((state) => state.setUser)

    const [userData, setUserData] = useState(false)
    let didAlreadyDoIt = useRef(false)

    useEffect(() => {
        if (didAlreadyDoIt.current) return;
        didAlreadyDoIt.current = true;

        fetch("http://localhost:8000/users/me", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
        })
        .then(response => response.json())
        .then((data) => {
            setUserData(data)
        })
        .catch(error => console.log("Error:", error));
    }, [])

    const logOut = () => {
        localStorage.removeItem("currentUser")
        setUser(false)
        window.location.href = "http://localhost:5173/"
    }

    return (
        <main className="absolute bg-[url(./assets/login-background.png)] bg-contain bg-no-repeat bg-bottom t-0 right-0 w-[85%] h-[98vh] flex flex-wrap flex-col pl-20  pr-20 pt-10 ">
            <section className="flex items-baseline  border-b-[#8b7925] border-t-0 border-r-0 border-l-0 border">
                <h1 className="text-[#8b7925] font-bold">{user.username} /</h1>
                <span className="text-white h-[15px] ml-3">{user.email}</span>
                <button className="absolute right-20" onClick={logOut}>Cerrar session</button>
            </section>
            

            <GeneralUserStats stats={userData} user={user} />
            
            <h2 className="text-[#8b7925] mt-5 mb-5 text-4xl font-bold">Partidas</h2>
            <UserGamesProfile games={userData}/> 
        
        </main>
    )
}