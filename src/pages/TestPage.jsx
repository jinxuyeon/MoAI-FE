import { useNavigate } from "react-router-dom";
import axiosInstance from "../components/utils/AxiosInstance";
import { useState } from "react";

const WithdrawSection = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleWithdraw = async () => {
    const confirm = window.confirm("정말 탈퇴하시겠습니까?");
    if (!confirm) return;

    setLoading(true);
    try {
      const response = await axiosInstance.delete("/member");
      setResult("✅ 탈퇴 성공: " + response.data);
      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      console.error("탈퇴 오류:", error);
      // 안전하게 에러 메시지 추출
      const msg =
        error.response && error.response.data
          ? error.response.data
          : "오류 발생";
      setResult("❌ 탈퇴 실패: " + msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="withdraw-section">
      <h2>회원 탈퇴</h2>
      <button onClick={handleWithdraw} disabled={loading}>
        {loading ? "처리 중..." : "탈퇴하기"}
      </button>
      {result && <p>{result}</p>}
    </div>
  );
};

export default WithdrawSection;
