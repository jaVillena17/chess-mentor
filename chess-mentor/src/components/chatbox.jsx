import '../static/css/chatbox.css'

export const Chatbox = () => {
    return (
        //Después esto hay que separarlo en más componentes
        //Decidir si pongo aquí la imagen del usuario con el chat o lo pongo en cada mensaje
        <div className="chatbox">
            
            <div className="chat-header"></div>
            <div className="chat-display"></div>
            <hr className="chatbox-separator"/>
            <textarea className="send-msg-input" placeholder='Escribe un mensaje'/>
            <button className='chat-button'>Enviar</button>
        </div>
    )
}