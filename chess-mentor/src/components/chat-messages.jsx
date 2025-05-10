import { Message } from "./message"

export const ChatMessages = ({chat}) => {
    return (
        <div className="chat-display">
            {    
                Object.keys(chat).map( (input, index) => {
                    return <Message 
                                key = {index}
                                timestamp = {input}
                                from = {chat[input].from}
                                inputMsg = {chat[input].text}
                           />
                })
            }
        </div>
    )
}