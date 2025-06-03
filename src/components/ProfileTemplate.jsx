import { useState } from "react";
import "./ProfileTemplate.css";
import axiosInstance from "./utils/AxiosInstance"; // 경로 조정 필요

const ProfileTemplate = ({ profileImageUrl, name, id }) => {
    const [showModal, setShowModal] = useState(false);
    const [userInfo, setUserInfo] = useState(null);

    const fetchUserInfo = async () => {
        try {
            const res = await axiosInstance.get(`/api/member/summary/${id}`);
            setUserInfo(res.data);
            setShowModal(true);
        } catch (err) {
            console.error("❌ 유저 정보 불러오기 실패:", err);
            alert("사용자 정보를 불러올 수 없습니다.");
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
                                src={userInfo.profileImageUrl || "/default-profile.png"}
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
                                <button className="action-button">친구 추가</button>
                                <button className="action-button">쪽지 보내기</button>
                            </div>
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
