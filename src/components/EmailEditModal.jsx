import React, { useState, useEffect, useContext, useRef } from "react";
import "./EmailEditModal.css";
import axiosInstance from "../components/utils/AxiosInstance";
import { UserContext } from "../components/utils/UserContext";

const EmailEditModal = ({ isOpen, onClose }) => {
  const { user } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const inputRef = useRef(null);

  useEffect(() => {
    if (user?.email) {
      setEmail(user.email);
    }
  }, [user]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current.focus();
      }, 0);
    }
  }, [isOpen]);

  const handleSubmit = async () => {
  const trimmedEmail = email.trim();

  if (!trimmedEmail.includes("@")) {
    setError("@를 포함한 이메일을 입력해주세요.");
    return;
  }

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);

  if (!isValidEmail) {
    setError("유효한 이메일 주소를 입력해주세요.");
    return;
  }

  try {
    await axiosInstance.post("/member/reset-email", {
      newEmail: trimmedEmail,  // ✅ 변수명 맞춤!
    });
    alert("이메일이 변경되었습니다.");
    onClose();
  } catch (err) {
    console.error("이메일 변경 실패:", err);
    setError("이메일 변경에 실패했습니다.");
  }
};


  if (!isOpen) return null;

  return (
    <div className="email-edit-modal-overlay">
      <div className="email-edit-modal">
        <h2>이메일 변경</h2>
        <p>새 이메일을 입력하세요.</p>
        <div className="email-single-input-wrapper">
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            ref={inputRef}
            placeholder="example@domain.com"
          />
        </div>
        {error && <small className="email-error-message">{error}</small>}
        <div className="email-modal-buttons">
          <button onClick={handleSubmit}>저장</button>
          <button onClick={onClose}>취소</button>
        </div>
      </div>
    </div>
  );
};

export default EmailEditModal;
