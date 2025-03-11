import { useState } from "react";
import "./Friends.css";
import Modal from "./Modal";

const Friends = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false)


    const sampleFriends = [
        "진수연",
        "김태희",
        "최경철",
        "구찌",
        "이영찬"
    ];

    // 버튼을 누르면 검색창이 열리도록

    return (
        <div className="Friends-Container">

            <div style={{ display: "flex", gap: "20px", width: "100%", alignItems: "center" }}>
                <button className="Friends-btn" onClick={() => setIsOpen(!isOpen)}>
                    😊 팔로워{isOpen ? "🔺" : "🔻"}
                </button>
                <button
                    className="add-friend-btn"
                    onClick={()=>{setOpenModal(true);console.log("openModal 상태:", openModal); }}
                ></button>
                {openModal ? <Modal openModal={openModal} setOpenModal={setOpenModal} /> : null}
            </div>

            {/* 친구 검색창 */}


            {/* 팔로워 리스트 */}
            {isOpen && (
                <ul className="Friends-List">
                    {sampleFriends.map((friend, index) => (
                        <li key={index} className="Friends-Item">{friend}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Friends;
