import MailModal from "./MailModal";
import "./MailSide.css";
import { useState } from "react";
import axiosInstance from "./utils/AxiosInstance";
import { Trash2 } from "lucide-react";

const MailSide = ({ setSelectedRoom, chatRooms, fetchChatRooms }) => {
    const [showModal, setShowModal] = useState(false);
    const handleFriendSelect = async (room) => {
        try {
            await axiosInstance.put(`/api/mail/read-room/${room.roomId}`);
            await fetchChatRooms();
            setSelectedRoom(room);
            setShowModal(false);
        } catch (error) {
            console.error("읽음 처리 실패:", error);
        }
    };

    const handleExitRoom = async (roomId) => {
        try {
            const response = await axiosInstance.delete(`/api/mail/exit-room/${roomId}`);
            if (response.status === 200) {
                console.log(response.data.message);
                await fetchChatRooms();
            }
        } catch (error) {
            console.error("채팅방 나가기 실패:", error);
        }
    };

    return (
        <div className="MailSide">
            <button
                className="add-chat-button"
                onClick={() => {
                    setShowModal(true);
                }}
            >
                + 대화 추가하기
            </button>

            {showModal && <MailModal
                fetchChatRooms={fetchChatRooms}
                setOpenModal={setShowModal} />}

            <div className="chat-room-list">
                {chatRooms.length > 0 ? (
                    chatRooms.map((room, idx) => (
                        <div key={idx} className="room-button-container">
                            <button className="room-button" onClick={() => handleFriendSelect(room)}>
                                
                                <img
                                    src={room.partner.profileThumbnails || "/default-profile.png"}
                                    alt="프로필"
                                    className="profile-img"
                                />
                                {room.partner.nickName}
                                {room.newMailCount > 0 && (
                                    <span className="new-mail-count">{room.newMailCount}</span>
                                )}
                            </button>
                            <button
                                className="room-button-exit"
                                onClick={() => handleExitRoom(room.roomId)}
                            >
                                <Trash2 />
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="no-room">채팅방이 없습니다.</p>
                )}
            </div>
        </div>
    );
};

export default MailSide;
