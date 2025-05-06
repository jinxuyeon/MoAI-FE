import MailModal from "./MailModal";
import "./MailSide.css";
import { useState } from "react";

const MailSide = ({ friends, setSelectedFriend }) => {
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeTab, setActiveTab] = useState("search");

    const handleFriendSelect = (friend) => {
        setSelectedFriend(friend);
        setShowModal(false);
    };

    const filteredFriends = friends.filter((friend) =>
        friend.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="MailSide">
            <button
                className="add-chat-button"
                onClick={() => {
                    setShowModal(true);
                    setSearchTerm("");
                    setActiveTab("search");
                }}
            >
                + 대화 추가하기
            </button>

            {showModal && (
                <MailModal setOpenModal={setShowModal} />
            )}

            <p>나의 채팅방</p>
        </div>
    );
};

export default MailSide;
