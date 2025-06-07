import { useState } from "react";
import "./ProfileTemplate.css";
import axiosInstance from "./utils/AxiosInstance";
import { sendFriendRequest } from "./utils/friendApi";

const ProfileTemplate = ({ profileImageUrl, name, id }) => {
    const [showModal, setShowModal] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [friendMessage, setFriendMessage] = useState("");
    const [isFriendError, setIsFriendError] = useState(false); // 성공/실패 색상 구분

    const fetchUserInfo = async () => {
        try {
            const res = await axiosInstance.get(`/api/member/summary/${id}`);
            setUserInfo(res.data);
            setFriendMessage(""); // 이전 메시지 초기화
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
            const message =
                error.response?.data?.message || "친구 요청 중 오류가 발생했습니다.";
            console.error("친구 요청 실패:", message);
            setFriendMessage(`❌ ${message}`);
            setIsFriendError(true);
        }
    };

    return (
        <>
            <div className="ProfileTemplate">
                <div className="search-result-profile">
                    <img
                        src={profileImageUrl || "/default-profile.png"}
                        alt="프로필"
                        className="profile-img"
                    />
                    <span className="profile-name" onClick={fetchUserInfo}>
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
                                <h3>{userInfo.nickname}</h3>
                                <span className="modal-username">{userInfo.email}</span>
                            </div>
                        </div>

                        <div className="modal-body">
                            <p><strong>소개:</strong> {userInfo.intro || "소개 정보가 없습니다."}</p>
                            <p><strong>권한:</strong> {userInfo.roles.join(", ")}</p>
                            <div className="modal-actions">
                                <button className="action-button" onClick={handleAddFriend}>
                                    친구 추가
                                </button>
                                <button className="action-button">쪽지 보내기</button>
                            </div>

                            {/* ✅ 친구 추가 결과 메시지 출력 */}
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
