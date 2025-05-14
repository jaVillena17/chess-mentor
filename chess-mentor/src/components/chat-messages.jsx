import { Message } from "./message"
import { useChatStore } from '../logic/chatGlobalState'

export const ChatMessages = () => {

    const chat = useChatStore((state) => state.chat)
    return (
        <div className="chat-display">
            {    
                Object.keys(chat).map( (input, index) => {
                    return <Message 
                                key = {index}
                                timestamp = {input}
                                from = {chat[input].from_}
                                inputMsg = {chat[input].text}
                           />
                })
            }
        </div>
    )
}