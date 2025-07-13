import { useNavigate } from "react-router-dom";
import { UserRound } from "lucide-react";
import "./MyPageCard.css";

const MyPageCard = () => {
  const navigate = useNavigate();

  const goToMyPage = () => {
    navigate("/mypage");
  };

  return (
    <div className="MyPageCard" onClick={goToMyPage}>
      <UserRound size={32} />
      <div>
        <h4>마이페이지</h4>
        <p>내 정보를 확인하세요</p>
      </div>
    </div>
  );
};

export default MyPageCard;
