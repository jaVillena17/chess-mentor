import '../static/css/chatbox.css'

export const Message = ({timestamp, from, inputMsg}) => {
    return (
        //Decidir si pongo aquí la imagen del destinatario o lo pongo solo en el header del chat
        <span className={from == "user" ? "user-msg" : "llama-msg"}>
            <p>{inputMsg}</p>
            <label>{timestamp}</label>
        </span>
    )
}