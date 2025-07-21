import React, { useState } from "react";
import "./WithdrawConfirmModal.css";
import axiosInstance from "../components/utils/AxiosInstance";

const WithdrawConfirmModal = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);

  const handleWithdraw = async () => {
    if (loading) return; // 중복 클릭 방지
    setLoading(true);

    try {
      console.log("회원 탈퇴 요청 시작");
      await axiosInstance.delete("/member"); // 슬래시 제거

      alert("회원 탈퇴가 완료되었습니다.");
      window.location.href = "/";
    } catch (error) {
      console.error("회원 탈퇴 실패:", error);

      if (error.response) {
        console.error("Response status:", error.response.status);
        console.error("Response data:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error setting up request:", error.message);
      }

      alert("회원 탈퇴에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="withdraw-modal-overlay">
      <div className="withdraw-modal">
        <h3>회원 탈퇴</h3>
        <p>
          정말 탈퇴하시겠습니까?
          <br />
          모든 데이터가 삭제됩니다.
        </p>
        <div className="withdraw-modal-buttons">
          <button onClick={handleWithdraw} disabled={loading}>
            예
          </button>
          <button onClick={onClose} disabled={loading}>
            아니오
          </button>
        </div>
      </div>
    </div>
  );
};

export default WithdrawConfirmModal;
