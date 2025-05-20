import "./ChatBubble.css";
import { useContext } from "react";
import { UserContext } from "./utils/UserContext";
UserContext
const ChatBubble = ({ msg }) => {
    const { user } = useContext(UserContext);
    const isMine = user.id === msg.senderId;

    return (
        <div className={`ChatBubble ${isMine ? "mine" : "theirs"}`}>
            <div className="content-box">
                <span className="chat-date">{new Date(msg.date).toLocaleString()}</span>
                <p className="content">{msg.content}</p>
            </div>
        </div>

    );
};

export default ChatBubble;
