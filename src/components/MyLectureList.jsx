import "./MyLectureList.css";
import { Book } from "lucide-react";
const MyLectureList = () => {
    const dummyLectures = [
        { id: 1, title: "컴퓨터 구조", professor: "김해동 교수" },
        { id: 2, title: "운영체제", professor: "박영수 교수" },
        { id: 3, title: "웹 프로그래밍", professor: "이서윤 교수" },
    ];

    return (
        <div className="MyLectureList">
            <div>
                <Book size={18} style={{ marginRight: "6px", verticalAlign: "middle" }} />
                내 강의 목록
            </div>

            <ul className="lecture-list">
                {dummyLectures.map((lecture) => (
                    <li key={lecture.id} className="lecture-item">
                        <span className="lecture-title">{lecture.title}</span>
                        <span className="lecture-professor">{lecture.professor}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MyLectureList;
