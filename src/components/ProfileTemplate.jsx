import { useState } from "react";
import "./ProfileTemplate.css";
import axiosInstance from "./utils/AxiosInstance";
import { sendFriendRequest } from "./utils/friendApi";
import { ROLE_TITLES_MAP } from "./utils/RoleUtils";

// 역할별 아이콘 매핑 함수
const getRoleIcon = (roles) => {
    if (roles.includes("PROFESSOR")) return "👑";
    if (roles.includes("MANAGER")) return "😄";
    if (roles.includes("ADMIN")) return "🔧";
    if (roles.includes("SYSTEM")) return "🤖";
    if (roles.includes("STUDENT")) return "🎓";
    return null;
};

const ProfileTemplate = ({ profileImageUrl, name, id }) => {
    const [showModal, setShowModal] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [friendMessage, setFriendMessage] = useState("");
    const [isFriendError, setIsFriendError] = useState(false);

    const fetchUserInfo = async () => {
        try {
            const res = await axiosInstance.get(`/api/member/summary/${id}`);
            setUserInfo(res.data);
            setFriendMessage("");
            setIsFriendError(false);
            setShowModal(true);
        } catch (err) {
            console.error("❌ 유저 정보 불러오기 실패:", err);
            alert("사용자 정보를 불러올 수 없습니다.");
        }
    };

    const handleAddFriend = async () => {
        try {
            await sendFriendRequest(userInfo.id);
            setFriendMessage("✅ 친구 요청이 전송되었습니다.");
            setIsFriendError(false);
        } catch (error) {
            const message = error.response?.data?.message || "친구 요청 중 오류가 발생했습니다.";
            console.error("친구 요청 실패:", message);
            setFriendMessage(`❌ ${message}`);
            setIsFriendError(true);
        }
    };


    const handleRemoveFriend = async () => {
        try {
            await axiosInstance.delete(`/api/friend/${userInfo.id}`);
            setFriendMessage("✅ 친구가 삭제되었습니다.");
            setIsFriendError(false);
            setUserInfo((prev) => ({ ...prev, isFriend: false })); // 상태 업데이트
        } catch (error) {
            console.error("친구 삭제 실패:", error);
            setFriendMessage("❌ 친구 삭제 중 오류가 발생했습니다.");
            setIsFriendError(true);
        }
    };
    
    return (
        <>
            <div className="ProfileTemplate">
                <div className="search-result-profile" onClick={fetchUserInfo}>
                    <img
                        src={profileImageUrl || "/default-profile.png"}
                        alt="프로필"
                        className="profile-img"
                    />
                    <span className="profile-name" >
                        {name}
                    </span>
                </div>
            </div>

            {showModal && userInfo && (
                <div className="profile-modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <img
                                src={userInfo.profileThumbnails || "/default-profile.png"}
                                alt="프로필"
                                className="modal-profile-img"
                            />
                            <div className="modal-name-block">
                                <h3>
                                    {userInfo.nickname}
                                    {getRoleIcon(userInfo.roles) && (
                                        <span
                                            className="role-icon"
                                            title={userInfo.roles
                                                .map((r) => ROLE_TITLES_MAP[r])
                                                .filter(Boolean)
                                                .join(", ")}
                                        >
                                            {getRoleIcon(userInfo.roles)}
                                        </span>
                                    )}
                                </h3>
                                <span className="modal-username">{userInfo.email}</span>
                            </div>
                        </div>

                        <div className="modal-body">
                            <p><strong>소개:</strong> {userInfo.intro || "소개 정보가 없습니다."}</p>
                            {userInfo.roles.some(role => ROLE_TITLES_MAP[role]) && (
                                <div className="user-roles">
                                    <strong>칭호:</strong>
                                    {userInfo.roles
                                        .filter(role => ROLE_TITLES_MAP[role])
                                        .map((role) => (
                                            <span className={`role-badge role-${role.toLowerCase()}`} key={role}>
                                                {ROLE_TITLES_MAP[role]}
                                            </span>
                                        ))}
                                </div>
                            )}
                            <div className="modal-actions">
                                {userInfo.isFriend ? (
                                    <button className="remove-friend-button" onClick={handleRemoveFriend}>
                                        친구 삭제
                                    </button>
                                ) : (
                                    <button className="action-button" onClick={handleAddFriend}>
                                        친구 추가
                                    </button>
                                )}
                                <button className="action-button">쪽지 보내기</button>
                            </div>

                            {friendMessage && (
                                <p className={`friend-message ${isFriendError ? "error" : "success"}`}>
                                    {friendMessage}
                                </p>
                            )}
                        </div>

                        <div className="modal-footer">
                            <button onClick={() => setShowModal(false)}>닫기</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProfileTemplate;
