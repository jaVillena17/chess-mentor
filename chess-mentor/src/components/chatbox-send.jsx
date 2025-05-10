export const ChatboxSend = ({handleFocus, handleBlur, send}) => {
    return (
        <div>
            <textarea className="send-msg-input" placeholder='Escribe un mensaje' onFocus={handleFocus} onBlur={handleBlur}/>
            <button className='chat-button' onClick={send}>Enviar</button>
         </div>
    )
}