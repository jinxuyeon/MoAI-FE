import "./TestPage.css";
import { useState } from "react";
import axiosInstance from "../components/utils/AxiosInstance";

const TestPage = () => {
  const [result, setResult] = useState(null);

  const handleVerify = async () => {
    try {
      const response = await axiosInstance.post(
        "/member/verify-password",
        { password: "1" } // 입력 없이 고정된 값
      );
      setResult(response.data.success ? "성공" : "실패");
    } catch (error) {
      console.error("비밀번호 인증 실패:", error);
      setResult("실패");
    }
  };

  return (
    <div className="TestPage">
      <button onClick={handleVerify}>비밀번호 인증 요청</button>
      {result && <p>결과: {result}</p>}
    </div>
  );
};

export default TestPage;
