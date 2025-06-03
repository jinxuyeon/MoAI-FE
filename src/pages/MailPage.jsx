import "./Mailpage.css";
import Header from "../components/Header";
import MailSide from "../components/MailSide";
import { useState } from "react";
import axiosInstance from "../components/utils/AxiosInstance";
import { useEffect } from "react";
import ChatBox from "../components/ChatBox";
const MailPage = () => {
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [message, setMessage] = useState("");
    const [chatRooms, setChatRooms] = useState([]);
    const [chatMessages, setChatMessages] = useState([]);

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

    const fetchChatMessages = async (roomId) => {
        try {
            const response = await axiosInstance.get(`/api/mail/messages/${roomId}`);
            if (response.status === 200 && response.data.messages) {
                setChatMessages(response.data.messages);
            }
        } catch (error) {
            console.error("채팅 메시지 불러오기 실패:", error);
        }
    };

    useEffect(() => {
        fetchChatRooms();
    }, []);

    useEffect(() => {
        if (selectedRoom) {
            console.log(selectedRoom)
            fetchChatMessages(selectedRoom.roomId);
        }
    }, [selectedRoom]);

    const handleSend = async () => {
        try {
            const response = await axiosInstance.post(
                `/api/mail/send-mail/${selectedRoom.roomId}`,
                {
                    content: message,
                    partnerId: selectedRoom.partner.id
                }
            );
            if (response.status === 200 && response.data.roomDtos) {
                setChatRooms(response.data.roomDtos);
            }
            setMessage("")
            fetchChatMessages(selectedRoom.roomId);
        } catch (error) {
            console.error("메시지 보내기 실패:", error);
        }
    };

    return (
        <div className="MailPage">
            <Header title={"Chat-mail"} />
            <div className="layout">
                <aside className="mail-side">
                    <MailSide
                        fetchChatRooms={fetchChatRooms}
                        chatRooms={chatRooms}
                        selectedFriend={selectedRoom}
                        setSelectedRoom={setSelectedRoom}
                    />
                </aside>
                <section className="chat-section">
                    {/* 친구가 선택되지 않은 경우 이미지 보여주기 */}
                    {!selectedRoom && (
                        <div className="no-friend-selected">
                            <img
                                className="no-select-img"
                                src="icons/no_select.png"
                                alt="No friend selected"
                            />
                        </div>
                    )}

                    {/* 친구가 선택된 경우 채팅박스와 입력창 보여주기 */}
                    {selectedRoom && (
                        <>
                            <ChatBox selectedRoom={selectedRoom} chatMessages={chatMessages} />
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
                        </>
                    )}
                </section>

            </div>
        </div>
    );
};

export default MailPage;
