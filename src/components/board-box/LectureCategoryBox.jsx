import { useState } from "react";
import { Link } from "react-router-dom";
import "./LectureCategoryBox.css";

const LectureCategoryBox = () => {
    const lectureList = [
        { id: 1, title: "영상처리및실습", professor: "박현준", color: "#007bff" },
        { id: 2, title: "데이터분석과 시각화", professor: "윤병수", color: "#28a745" },
        { id: 3, title: "네트워크보안", professor: "이광일", color: "#ffc107" },
        { id: 4, title: "캡스톤디자인", professor: "김재훈", color: "#dc3545" },
        { id: 5, title: "비판적사고와 논리", professor: "안현수", color: "#17a2b8" }
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const visibleLectures = lectureList.slice(startIndex, startIndex + itemsPerPage);
    const totalPages = Math.ceil(lectureList.length / itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="LectureCategoryBox">
            <h2 className="lecture-category-title">강의목록</h2>

            <div className="lecture-card-grid">
                {visibleLectures.map((lecture) => (
                    <Link
                        to={`/main/lecture/${lecture.id}`}
                        key={lecture.id}
                        className="lecture-card"
                        state={{lecture}}
                    >
                        <div
                            className="lecture-color-box"
                            style={{ backgroundColor: lecture.color }}
                        />
                        <div className="lecture-info">
                            <h3>{lecture.title}</h3>
                            <p>{lecture.professor} 교수님</p>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="pagination">
                {currentPage > 1 && (
                    <button onClick={() => handlePageChange(currentPage - 1)}>
                        &lt; 이전
                    </button>
                )}
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={currentPage === index + 1 ? "active-page" : ""}
                    >
                        {index + 1}
                    </button>
                ))}
                {currentPage < totalPages && (
                    <button onClick={() => handlePageChange(currentPage + 1)}>
                        다음 &gt;
                    </button>
                )}
            </div>
        </div>
    );
};

export default LectureCategoryBox;
