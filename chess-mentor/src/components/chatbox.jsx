import '../static/css/chatbox.css'

export const Chatbox = () => {
    return (
        //Después esto hay que separarlo en más componentes
        //Decidir si pongo aquí la imagen del usuario con el chat o lo pongo en cada mensaje
        <div className="chatbox">
            
            <div className="chatHeader"></div>
            <div className="chat-display"></div>
            <hr className="chatbox-separator"/>
            <input type="text" className="send-msg-input"/>
        </div>
    )
}