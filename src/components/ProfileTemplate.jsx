import { useState } from "react";
import "./ProfileTemplate.css";
import axiosInstance from "./utils/AxiosInstance"; // 경로에 맞게 조정하세요

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
          <span
            className="profile-name"
            onClick={fetchUserInfo}
          >
            {name}
          </span>
        </div>
      </div>

      {showModal && userInfo && (
        <div className="profile-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
            <img
              src={profileImageUrl || "/default-profile.png"}
              alt="프로필"
              className="modal-profile-img"
            />
            <h3>{userInfo.nickname}</h3>
            <p>{userInfo.email}</p>
            <p>{userInfo.introduction || "소개 정보가 없습니다."}</p>
            <button onClick={() => setShowModal(false)}>닫기</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileTemplate;
