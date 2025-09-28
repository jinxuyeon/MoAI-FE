import { useState } from "react";
import { createPortal } from "react-dom";
import "./ProfileModal.css";
import { ROLE_DEFS } from "../utils/RoleUtils";
import RoleTag from "../RoleTag";
import LockModal from "./LockModal";

// roles 배열 안의 key에 맞는 role 객체 가져오기
const getRoleDefs = (roles) =>
  ROLE_DEFS.filter((role) => roles.includes(role.key));

const getRoleIcon = (roles) => {
  if (roles.includes("SYSTEM")) return "🤖";
  if (roles.includes("ADMIN")) return "🔧";
  if (roles.includes("PROFESSOR")) return "👑";
  if (roles.includes("MANAGER")) return "😄";
  if (roles.includes("STUDENT_COUNCIL")) return "🎖️";
  if (roles.includes("STUDENT")) return "🎓";
  return null;
};

const ProfileModal = ({
  userInfo,
  onClose,
  onAddFriend,
  friendMessage,
  isFriendError,
}) => {
  const [showLockModal, setShowLockModal] = useState(false);

  if (!userInfo) return null;

  const roleDefs = getRoleDefs(userInfo.roles);

  return createPortal(
    <>
      <div className="ProfileModal">
        <div className="ProfileModal__overlay" onClick={onClose}>
          <div
            className="ProfileModal__content"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="ProfileModal__header">
              <img
                src={userInfo.profileThumbnails || "/default-profile.png"}
                alt="프로필"
                className="ProfileModal__profile-img"
              />
              <div className="ProfileModal__name-block">
                <h3>
                  {userInfo.nickname}
                  {getRoleIcon(userInfo.roles) && (
                    <span className="ProfileModal__role-icon">
                      {getRoleIcon(userInfo.roles)}
                    </span>
                  )}
                </h3>
                <span className="ProfileModal__username">{userInfo.email}</span>
              </div>
            </div>

            {/* Body */}
            <div className="ProfileModal__body">
              <p>
                <strong>소개:</strong>{" "}
                {userInfo.intro || "소개 정보가 없습니다."}
              </p>

              {roleDefs.length > 0 && (
                <div className="ProfileModal__roles">
                  <strong>권한:</strong>
                  {userInfo.roles.map((role) => (
                    <RoleTag key={role} role={role} />
                  ))}
                </div>
              )}

              <div className="ProfileModal__actions">
                {!userInfo.isFriend && (
                  <button
                    className="ProfileModal__action-btn"
                    onClick={onAddFriend}
                  >
                    친구 추가
                  </button>
                )}

                {/* 쪽지 보내기 클릭 시 LockModal 표시 */}
                <button
                  className="ProfileModal__action-btn"
                  onClick={() => setShowLockModal(true)}
                >
                  쪽지 보내기
                </button>
              </div>

              {friendMessage && (
                <p
                  className={`ProfileModal__friend-message ${
                    isFriendError ? "error" : "success"
                  }`}
                >
                  {friendMessage}
                </p>
              )}
            </div>

            {/* Footer */}
            <div className="ProfileModal__footer">
              <button onClick={onClose}>닫기</button>
            </div>
          </div>
        </div>
      </div>

      {/* LockModal 렌더링 */}
      <LockModal
        isOpen={showLockModal}
        onClose={() => setShowLockModal(false)}
      />
    </>,
    document.body
  );
};

export default ProfileModal;
