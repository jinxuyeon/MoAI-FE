import { useNavigate } from "react-router-dom";
import { BookOpen } from "lucide-react";
import "./LectureCard.css";

const LectureCard = () => {
  const navigate = useNavigate();

  const goToLecturePage = () => {
    navigate("/main/study-dashboard");
  };

  return (
    <div className="lecture-card" onClick={goToLecturePage}>
      <BookOpen size={32} color="#4F46E5" />
      <div>
        <h4>강의실</h4>
        <p>수강 중인 강의와 자료를 확인하세요</p>
      </div>
    </div>
  );
};

export default LectureCard;