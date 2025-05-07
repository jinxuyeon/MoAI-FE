import MailModal from "./MailModal";
import "./MailSide.css";
import { useState, useEffect } from "react";
import axiosInstance from "./utils/AxiosInstance";

const MailSide = ({ setSelectedFriend, chatRooms, fetchChatRooms }) => {
    const [showModal, setShowModal] = useState(false);
    const handleFriendSelect = (room) => {
        setSelectedFriend(room); // 전체 room 객체 전달
        setShowModal(false);
    };


    const handleExitRoom = async (roomId) => {
        try {
            const response = await axiosInstance.delete(`/api/mail/exit-room/${roomId}`);
            if (response.status === 200) {
                console.log(response.data.message); // "채팅방 삭제 성공"
                await fetchChatRooms(); // 목록 갱신
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
            <p>나의 채팅방</p>

            <div className="chat-room-list">
                {chatRooms.length > 0 ? (
                    chatRooms.map((room, idx) => (
                        <div key={idx} className="room-button-container">
                            <button className="room-button" onClick={() => handleFriendSelect(room)}>
                                <img
                                    src={room.partner.profileImageUrl || "/default-profile.png"}
                                    alt="프로필"
                                    className="profile-img"
                                />
                                {room.partner.name}
                            </button>
                            <button
                                className="room-button-exit"
                                onClick={() => handleExitRoom(room.roomId)}
                            >
                                나가기
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
