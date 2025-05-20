import { MessagesSquare } from "lucide-react";
import { useNavigate } from "react-router-dom"; // ← 추가
import Reddot from "./Reddot";
import "./MailBox.css"

const MailBox = () => {
    const navigate = useNavigate(); // ← 훅 호출

    const handleClick = () => {
        navigate("/chat-mail"); // ← 이동할 경로
    };

    return (
        <div className="MailBox">
            <button className="mail-btn" onClick={handleClick}>
                <MessagesSquare />
                <Reddot count={0} />
            </button>
        </div>
    );
};

export default MailBox;
