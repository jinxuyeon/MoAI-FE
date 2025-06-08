import { Link } from "react-router-dom";
import "./MyLectureList.css";
import { Book } from "lucide-react";
import { lectureList } from "./utils/lectureUtils";



const MyLectureList = () => {
  return (
    <div className="MyLectureList">
      <h3 className="list-title">
        <Book size={18} style={{ marginRight: "6px", verticalAlign: "middle" }} />
        내 강의 목록
      </h3>
      <ul className="lecture-list">
        {lectureList.map((lec) => (
          <li key={lec.id}>
            <Link to={`/main/study-dashboard/lectures/${lec.id}`} className="lecture-link">
              {lec.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyLectureList;