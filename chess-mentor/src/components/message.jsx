export const Message = ({sender, text}) => {
    return (
        //Decidir si pongo aquí la imagen del destinatario o lo pongo solo en el header del chat
        <span>
            <img src={sender.url} alt="Sender Profile Picture" />
            <p>{text}</p>
        </span>
    )
}