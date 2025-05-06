import MailModal from "./MailModal";
import "./MailSide.css";
import { useState, useEffect } from "react";

const MailSide = ({ setSelectedFriend , chatRooms}) => {
    const [showModal, setShowModal] = useState(false);
    const handleFriendSelect = (room) => {
        setSelectedFriend(room); // 전체 room 객체 전달
        setShowModal(false);
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

            {showModal && <MailModal setOpenModal={setShowModal} />}
            <p>나의 채팅방</p>

            <div className="chat-room-list">
                {chatRooms.length > 0 ? (
                    chatRooms.map((room, idx) => (
                        <button
                            key={idx}
                            className="room-button"
                            onClick={() => handleFriendSelect(room)}
                        >
                            <img
                                src={room.partner.profileImageUrl || "/default-profile.png"}
                                alt="프로필"
                                className="profile-img"
                            />
                            {room.partner.name}
                        </button>
                    ))
                ) : (
                    <p className="no-room">채팅방이 없습니다.</p>
                )}
            </div>
        </div>
    );
};

export default MailSide;
