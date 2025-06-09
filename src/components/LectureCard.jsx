import "./LectureCard.css";
import { Link } from "react-router-dom";

const LectureCard = ({ lecture }) => {
  return (
    <Link
      to={`/main/study-dashboard/${lecture.id}`}
      className="dashboard-card lecture-card"
      state={{ lecture }}
      title={lecture.intro || ""}
      style={{ borderLeft: `5px solid ${lecture.themeColor}` }} // ✅ 직접 색상 지정
    >
      <h3>{lecture.title}</h3>
      <p>{lecture.professorName} 교수님</p>
      <p>{lecture.grade}학년 {lecture.semester}학기</p>
    </Link>
  );
};

export default LectureCard;
