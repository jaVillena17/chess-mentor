import { useEffect, useRef, useState } from "react"
import { UserSession } from "../logic/userGlobalState"

export const Profile = () => {
    let user = JSON.parse(localStorage.getItem("currentUser"))
    let token = user.access_token

    const [userData, setUserData] = useState("")
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
            console.log(userData)
        })
        .catch(error => console.error("Error:", error));


    }, [])

    return (
        <main>
            {JSON.stringify(userData)}
        </main>
    )
}