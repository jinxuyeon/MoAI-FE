import "./ChatBox.css";
import ChatBubble from "./ChatBubble";
import { useEffect, useRef } from "react";

const ChatBox = ({ selectedRoom, chatMessages }) => {
    const bottomRef = useRef(null);

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [chatMessages]); // 새 메시지가 올 때마다 실행

    return (
        <section className="chat-box chat-content">
           
                <div className="chat-message-list">
                    {chatMessages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`chat-bubble ${msg.senderId === selectedRoom.partner.id ? "received" : "sent"}`}
                        >
                            <ChatBubble msg={msg} />
                        </div>
                    ))}
                    {/* ⬇️ 스크롤 기준점 */}
                    <div ref={bottomRef} />
                </div>
           
        </section>
    );
};

export default ChatBox;
