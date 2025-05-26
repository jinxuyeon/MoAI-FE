import { useState } from "react";
import { Link } from "react-router-dom";
import "./LectureCategoryBox.css";

const LectureCategoryBox = () => {
    const lectureList = [
        { id: 1, title: "운영체제", professor: "김운영", color: "#007bff" },
        { id: 2, title: "자료구조", professor: "이자료", color: "#28a745" },
        { id: 3, title: "데이터베이스", professor: "박데이터", color: "#ffc107" },
        { id: 4, title: "캡스톤디자인", professor: "최캡스톤", color: "#dc3545" },
        { id: 5, title: "영상처리", professor: "김영상", color: "#17a2b8" },
        { id: 6, title: "데이터 처리", professor: "김데이터", color: "#20c997" },
        { id: 7, title: "신호처리", professor: "최캡스톤", color: "#28a745" },
        { id: 8, title: "보안체제", professor: "최캡스톤", color: "#f67280" },
        { id: 9, title: "해양데이터통신", professor: "최캡스톤", color: "#6f42c1" },
        { id: 10, title: "c언어", professor: "최캡스톤", color: "#6c757d" },
        { id: 11, title: "네트워크 구조", professor: "최캡스톤", color: "#ff6b6b" },
        { id: 12, title: "알고리즘 설계", professor: "최캡스톤", color: "#17a2b8" },
        { id: 13, title: "선형대수학", professor: "최캡스톤", color: "#6610f2" }
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
