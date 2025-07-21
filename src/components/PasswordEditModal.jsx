import React, { useState } from "react";
import axiosInstance from "../components/utils/AxiosInstance";

import "./PasswordEditModal.css";

const PasswordEditModal = ({ isOpen, onClose }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (newPassword.trim() === "") {
      setError("새 비밀번호를 입력해주세요.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      await axiosInstance.post("/member/reset-password", {
        newPassword: newPassword,
      });

      alert("비밀번호가 성공적으로 변경되었습니다.");
      setNewPassword("");
      setConfirmPassword("");
      setError("");
      onClose();
    } catch (error) {
      console.error("비밀번호 변경 실패:", error);

      if (error.response) {
        if (error.response.status === 400) {
          setError("유효하지 않은 요청입니다.");
        } else if (error.response.status === 401) {
          setError("로그인이 필요합니다.");
        } else {
          setError(`서버 오류가 발생했습니다. (${error.response.status})`);
        }
      } else {
        setError("네트워크 오류가 발생했습니다.");
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="password-edit-modal-overlay">
      <div className="password-edit-modal">
        <h2>비밀번호 수정</h2>

        <input
          type="password"
          placeholder="새 비밀번호"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="새 비밀번호 확인"
          value={confirmPassword}
          onChange={(e) => {
            const value = e.target.value;
            setConfirmPassword(value);
            if (newPassword && value !== newPassword) {
              setError("비밀번호가 일치하지 않습니다.");
            } else {
              setError("");
            }
          }}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />

        {error && <small className="password-error-message">{error}</small>}

        <div className="password-modal-buttons">
          <button onClick={handleSubmit}>저장</button>
          <button onClick={onClose}>취소</button>
        </div>
      </div>
    </div>
  );
};

export default PasswordEditModal;

