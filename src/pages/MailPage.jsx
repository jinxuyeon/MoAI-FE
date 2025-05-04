import "./Mailpage.css";
import Header from "../components/Header";
import MailSide from "../components/MailSide";
import { useState } from "react";

const MailPage = () => {
    const friends = ["친구1", "친구2", "친구3", "친구4"];
    const [selectedFriend, setSelectedFriend] = useState(friends[0]);
    const [message, setMessage] = useState("");

    const chatData = {
        친구1: [
            { from: "me", text: "안녕?" },
            { from: "friend", text: "오랜만이야!" },
        ],
        친구2: [
            { from: "friend", text: "과제 했어?" },
            { from: "me", text: "아직 ㅎ" },
        ],
    };

    const handleSend = () => {
        if (!message.trim()) return;
        console.log(`${selectedFriend}에게 보냄:`, message);
        setMessage("");
    };

    return (
        <div className="MailPage">
            <Header title={"Chat-mail"} />
            <div className="layout">
                <aside className="mail-side">
                    <MailSide
                        friends={friends}
                        selectedFriend={selectedFriend}
                        setSelectedFriend={setSelectedFriend}
                    />
                </aside>

                <section className="chat-section">
                    <div className="chat-content">
                        {selectedFriend ? (
                            chatData[selectedFriend]?.map((msg, idx) => (
                                <div key={idx} className={`chat-bubble ${msg.from}`}>
                                    {msg.text}
                                </div>
                            ))
                        ) : (
                            <div className="no-chat">친구를 선택해주세요.</div>
                        )}
                    </div>

                    <div className="chat-input-box">
                        <input
                            type="text"
                            placeholder="메시지를 입력하세요..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        />
                        <button onClick={handleSend}>전송</button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default MailPage;
