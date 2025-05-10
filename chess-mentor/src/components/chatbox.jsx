import { useEffect, useState } from 'react'
import '../static/css/chatbox.css'
import { ChatMessages } from './chat-messages'
import { ChatboxSend } from './chatbox-send'

export const Chatbox = () => {
    let [chat, setChat] = useState({
       "14:30" :    {"from" : "user",
                    "text" : "user"},

        "14:31" : { "from" :"llama",
                    "text" : "llama"},
    })

    const [lastMsg, setLastMsg] = useState("")
        
    useEffect(() => {
        if (lastMsg == "") return
        let newChat = {
            ...chat,
            [Date.now()] : { "from" :"user","text" : lastMsg}
        }
        setChat(newChat)

        fetch("http://127.0.0.1:8000/chatbox-msg", {
            method : "POST",
            body : {"messages": chat},
            headers: { "Content-Type": "application/json" }
        })
        .then(res => res.json)
        .then(json => alert(json))

        

    }, [lastMsg])

    const  sendMessage = () => {
        //Recuperamos el texto del input
        let texto = document.querySelector(".send-msg-input")
        setLastMsg(texto.value)
        texto.value = ""
    }

    const addKeyDownEvent = (e) => {
            if(e.key == "Enter"){
                e.preventDefault()
                sendMessage()
            }
        }

    const handleTextAreaFocus = () => {
        document.addEventListener('keydown', addKeyDownEvent)
    }

    const handleTextAreaBlur = () => {
        document.removeEventListener('keydown', addKeyDownEvent)
    }

    

    return (
        //Después esto hay que separarlo en más componentes
        //Decidir si pongo aquí la imagen del usuario con el chat o lo pongo en cada mensaje
        <div className="chatbox">
            
            <div className="chat-header"></div>

            <ChatMessages 
                chat = {chat}
            /> 

            <hr className="chatbox-separator"/>

            <ChatboxSend 
                handleFocus = {handleTextAreaFocus}
                handleBlur = {handleTextAreaBlur}
                send = {sendMessage}
            />

        </div>
    )
}