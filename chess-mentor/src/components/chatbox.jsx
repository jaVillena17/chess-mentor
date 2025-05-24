import { useEffect, useState } from 'react'
import '../static/css/chatbox.css'
import { ChatMessages } from './chat-messages'
import { ChatboxSend } from './chatbox-send'
import { useBoardStore } from '../logic/boardGlobalState'
import { useChatStore } from '../logic/chatGlobalState'

export const Chatbox = () => {
    const chat = useChatStore((state) => state.chat)
    const setChat = useChatStore((state) => state.setChat)
    //const [chat, setChat] = useState({})
    
    useEffect(() => {
        let container = document.getElementById("chat-display")
        container.scrollTop = container.scrollHeight
    }, [chat])

    const board = useBoardStore((state) => state.board)

    const [lastMsg, setLastMsg] = useState("")
        
    useEffect(() => {
        if (lastMsg == "") return
        let newChat = {
            ...chat,
            [Date.now()] : { "from_" :"user","text" : lastMsg},
        }   
        setChat(newChat)
        fetch("http://127.0.0.1:8000/chatbox-msg", {
            method : "POST",
            body : JSON.stringify({ "messages" : newChat, "board" : board}),
            headers: { "Content-Type": "application/json" }
        })
        .then(res => res.json())
        .then(data => data.message.content)
        .then(msg => {
            newChat = {
            ...newChat,
            [Date.now()] : { "from_" :"assistant","text" : msg}
            }   
            setChat(newChat)
        })

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