import "./LectureCard.css";
import { Link } from "react-router-dom";

const LectureCard = ({ lecture }) => {
  return (
    <Link
      to={`/main/study-dashboard/${lecture.id}`}
      className="lecture-card"
      state={{ lecture }}
      title={lecture.intro || ""}
      style={{ borderLeft: `5px solid ${lecture.themeColor}` }}
    >
      <div className="lecture-card-main">
        <h3>{lecture.title}</h3>
        <p>{lecture.professorName} 교수님</p>
        <p>{lecture.grade}학년 {lecture.semester}학기</p>
      </div>

      <div className="marked-count">
        담은 수: <strong>{lecture.markedCount}</strong>명
      </div>
    </Link>
  );
};

export default LectureCard;
