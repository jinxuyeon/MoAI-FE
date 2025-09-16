import "./FriendModal.css";
import InputBox from "./InputBox";
import ProfileTemplate from "./ProfileTemplate";
import ConfirmModal from "./modals/ConfirmModal";
import "./modals/Modal.css";
import {
    searchFriendByNickname,
    sendFriendRequest,
    acceptFriendRequest,
    declineFriendRequest,
    removeFriend
} from "./utils/friendApi";
import { X } from "lucide-react";
import { useState, useEffect } from "react";

const FriendModal = ({
    setOpenModal,
    requestMemberList,
    fetchMyFriendInfo,
    setHasFriendrequest,
    setRequestMemberList,
    myFriendList,
}) => {
    const [result, setResult] = useState(null);
    const [resultMessage, setResultMessage] = useState("");
    const [isFriendError, setIsFriendError] = useState(false);
    const [activeTab, setActiveTab] = useState("friends");
    const [nickname, setNickname] = useState("");
    const [filteredFriends, setFilteredFriends] = useState(myFriendList);
    const [confirmDeleteFriendId, setConfirmDeleteFriendId] = useState(null);

    useEffect(() => {
        setFilteredFriends(myFriendList);
    }, [myFriendList]);

    const handleNicknameChange = (value) => {
        setNickname(value);
        const keyword = value.trim().toLowerCase();
        if (!keyword) {
            setFilteredFriends(myFriendList);
            return;
        }
        const filtered = myFriendList.filter((friend) =>
            friend.nickName.toLowerCase().includes(keyword)
        );
        setFilteredFriends(filtered);
    };

    const handleSearch = async () => {
        try {
            const data = await searchFriendByNickname(nickname.trim());
            setResult(data);
            setResultMessage("");
            setIsFriendError(false);
        } catch (error) {
            setResult(null);
            setResultMessage(error.response?.data?.message || "검색 실패");
            setIsFriendError(true);
        }
    };

    const handleAddFriend = async () => {
        try {
            await sendFriendRequest(result.id);
            setResult(null);
            setNickname("");
            setResultMessage("✅ 친구 추가 요청이 전송되었습니다.");
            setIsFriendError(false);
        } catch (error) {
            const message =
                error.response?.data?.message ||
                "친구 요청 중 오류가 발생했습니다.";
            setResultMessage(`❌ ${message}`);
            setIsFriendError(true);
        }
    };

    const handleAccept = async (idToAccept) => {
        try {
            await acceptFriendRequest(idToAccept);
            setRequestMemberList((prev) =>
                prev.filter((request) => request.id !== idToAccept)
            );
            fetchMyFriendInfo();
        } catch (error) {
            console.error("친구 수락 실패:", error);
        }
    };

    const handleDecline = async (idToDecline) => {
        try {
            await declineFriendRequest(idToDecline);
            setRequestMemberList((prev) =>
                prev.filter((request) => request.id !== idToDecline)
            );
        } catch (error) {
            console.error("친구 요청 거절 실패:", error);
        }
    };

    const handleRemoveFriend = async (friendId) => {
        try {
            await removeFriend(friendId);
            // UI에서 바로 제거
            setFilteredFriends((prev) =>
                prev.filter((f) => f.id !== friendId)
            );
            // 부모 상태 갱신
            fetchMyFriendInfo();
        } catch (error) {
            console.error("친구 삭제 실패:", error);
        }
    };

    return (
        <div className="Modal FriendModal">
            <div className="Overlay">
                <div className="container">
                    <div className="friend-modal-header" role="tablist">
                        <div
                            className={`tab ${activeTab === "friends" ? "active" : ""}`}
                            role="tab"
                            tabIndex="0"
                            onClick={() => setActiveTab("friends")}
                        >
                            <span>내 친구</span>
                        </div>
                        <div
                            className={`tab ${activeTab === "search" ? "active" : ""}`}
                            role="tab"
                            tabIndex="0"
                            onClick={() => setActiveTab("search")}
                        >
                            <span>검색</span>
                        </div>
                        <div
                            className={`tab ${activeTab === "request" ? "active" : ""}`}
                            role="tab"
                            tabIndex="0"
                            onClick={() => setActiveTab("request")}
                        >
                            <span>받은 요청</span>
                        </div>
                        <button
                            className="exit-btn"
                            onClick={() => setOpenModal(false)}
                        >
                            <X />
                        </button>
                    </div>

                    {activeTab === "friends" && (
                        <>
                            <div className="search-section">
                                <InputBox
                                    state={nickname}
                                    setStateFunction={handleNicknameChange}
                                    placeholder="내 친구 목록에서 검색"
                                />
                            </div>
                            <ul className="Friends-List">
                                {filteredFriends.length > 0 ? (
                                    filteredFriends.map((friend) => (
                                        <li key={friend.id} className="Friends-Item">
                                            <div className="friend-item-section">
                                                <ProfileTemplate
                                                    profileImageUrl={friend.profileThumbnails}
                                                    name={friend.nickName}
                                                    id={friend.id}
                                                />
                                                <button
                                                    className="friend-del-btn"
                                                    onClick={() => setConfirmDeleteFriendId(friend.id)}
                                                >
                                                    삭제
                                                </button>
                                            </div>
                                        </li>
                                    ))
                                ) : (
                                    <li className="Friends-Item">
                                        친구가 없습니다.
                                    </li>
                                )}
                            </ul>
                        </>
                    )}

                    {activeTab === "search" && (
                        <div>
                            <div className="search-section">
                                <div className="search-box">
                                    <InputBox
                                        state={nickname}
                                        setStateFunction={setNickname}
                                        onClickFunction={handleSearch}
                                        placeholder="닉네임으로 친구를 찾아보세요"
                                    />
                                </div>
                            </div>
                            {resultMessage && (
                                <p className={`friend-message ${isFriendError ? "error" : "success"}`}>
                                    {resultMessage}
                                </p>
                            )}
                            <div className="request-container">
                                {result && (
                                    <>
                                        <div className="search-result-profile">
                                            <img
                                                src={result.profileThumbnails || "/default-profile.png"}
                                                alt="프로필"
                                                className="profile-img"
                                            />
                                            <p>{result.nickName}</p>
                                        </div>
                                        <button
                                            className="request-btn"
                                            onClick={handleAddFriend}
                                        >
                                            +요청
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === "request" && (
                        <div className="requests-box">
                            {requestMemberList.length > 0 ? (
                                requestMemberList.map((request, index) => (
                                    <div className="request-container" key={index}>
                                        <div className="search-result-profile">
                                            <img
                                                src={request.profileThumbnails || "/default-profile.png"}
                                                alt="프로필"
                                                className="profile-img"
                                            />
                                            <span>{request.nickName}</span>
                                        </div>
                                        <div>
                                            <button
                                                className="request-btn accept"
                                                onClick={() => handleAccept(request.id)}
                                            >
                                                수락
                                            </button>
                                            |
                                            <button
                                                className="request-btn decline"
                                                onClick={() => handleDecline(request.id)}
                                            >
                                                거절
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>친구요청이 없습니다.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* 삭제 확인 모달 */}
            {confirmDeleteFriendId && (
                <ConfirmModal
                    message="정말 삭제하시겠습니까?"
                    onConfirm={() => {
                        handleRemoveFriend(confirmDeleteFriendId);
                        setConfirmDeleteFriendId(null);
                    }}
                    onCancel={() => setConfirmDeleteFriendId(null)}
                />
            )}
        </div>
    );
};

export default FriendModal;
