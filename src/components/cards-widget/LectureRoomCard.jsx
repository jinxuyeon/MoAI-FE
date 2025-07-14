import { useNavigate } from "react-router-dom";
import { BookOpen } from "lucide-react";
import "./LectureRoomCard.css";

const LectureRoomCard = () => {
  const navigate = useNavigate();

  const goToLecturePage = () => {
    navigate("/main/study-dashboard");
  };

  return (
    <div className="LectureRoomCard" onClick={goToLecturePage}>
      <BookOpen size={32} color="#4F46E5" />
      <div>
        <h4>강의실</h4>
      </div>
    </div>
  );
};

export default LectureRoomCard;