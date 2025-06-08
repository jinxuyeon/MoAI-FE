import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../utils/AxiosInstance";
import "./LectureCategoryBox.css";
import { UserContext } from "../utils/UserContext";
import LectureCreateModal from "../modals/LectureCreateModal";

const LectureCategoryBox = () => {
  const { user } = useContext(UserContext);
  const [lectures, setLectures] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleLectures = lectures.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(lectures.length / itemsPerPage);
  const [showModal, setShowModal] = useState(false);
  const boardTitle = "강의목록";

  const isProfessorOrAdmin = user?.roles?.some(role =>
    ["PROFESSOR", "ADMIN"].includes(role)
  );

  const fetchLectures = async () => {
    try {
      const res = await axiosInstance.get("/api/lecture-room/list");
      setLectures(res.data.data || []);
    } catch (err) {
      console.error("강의 목록 불러오기 실패:", err);
    }
  };

  useEffect(() => {
    fetchLectures();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="LectureCategoryBox">
      <div className="lecture-category-header" style={{ marginBottom: "10px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h1 className="lecture-category-title">{boardTitle}</h1>
        </div>
      </div>

      {isProfessorOrAdmin && (
        <>
          <button className="create-btn" onClick={() => setShowModal(true)}>강의 생성</button>
          {showModal && (
            <LectureCreateModal
              onClose={() => setShowModal(false)}
              onSuccess={() => {
                setCurrentPage(1);
                fetchLectures();
              }}
            />
          )}
        </>
      )}

      <div className="lecture-card-grid">
        {visibleLectures.map((lecture) => (
          <Link
            to={`/main/study-dashboard/${lecture.id}`}
            key={lecture.id}
            className="lecture-card"
            state={{ lecture }}
            title={lecture.intro || ""}
          >
            <div className="lecture-color-box" style={{ backgroundColor: lecture.themeColor }} />
            <div className="lecture-info">
              <h3>{lecture.title}</h3>
              <p>{lecture.professorName} 교수님</p>
              <p>{lecture.grade}학년 {lecture.semester}학기</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="pagination">
        {currentPage > 1 && (
          <button onClick={() => handlePageChange(currentPage - 1)}>&lt; 이전</button>
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
          <button onClick={() => handlePageChange(currentPage + 1)}>다음 &gt;</button>
        )}
      </div>
    </div>
  );
};

export default LectureCategoryBox;
