import "./Mailpage.css";
import Header from "../components/Header";
import MailSide from "../components/MailSide";
import { useState } from "react";
import axiosInstance from "../components/utils/AxiosInstance";
import { useEffect } from "react";
const MailPage = () => {
    const [selectedFriend, setSelectedFriend] = useState(null);
    const [message, setMessage] = useState("");
    const [chatRooms, setChatRooms] = useState([]);

    const fetchChatRooms = async () => {
        try {
            const response = await axiosInstance.get("/api/mail/my-room");
            if (response.status === 200 && response.data.roomDtos) {
                setChatRooms(response.data.roomDtos);
            }
        } catch (error) {
            console.error("채팅방 목록 불러오기 실패:", error);
        }
    };

    useEffect(() => {
        fetchChatRooms();
    }, []);


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
                        fetchChatRooms={fetchChatRooms}
                        chatRooms={chatRooms}
                        selectedFriend={selectedFriend}
                        setSelectedFriend={setSelectedFriend}
                    />
                </aside>
                <section className="chat-section">
                    <section className="chat-box">
                    sdfsdfsd
                    </section>
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
