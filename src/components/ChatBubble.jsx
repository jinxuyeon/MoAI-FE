import "./ChatBubble.css";
import { useContext } from "react";
import { UserContext } from "./utils/UserContext";

const ChatBubble = ({ msg }) => {
    const { user } = useContext(UserContext);
    const isMine = user.id === msg.senderId;

    const formattedTime = new Date(msg.date).toLocaleTimeString("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });

    return (
        <div className={`ChatBubble ${isMine ? "mine" : "theirs"}`}>
            <div className="content-box">
                <p className="content">{msg.content}</p>
                <span className="chat-date">{formattedTime}</span>
            </div>
        </div>
    );
};

export default ChatBubble;
