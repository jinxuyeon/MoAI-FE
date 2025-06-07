import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import axiosInstance from "../utils/AxiosInstance";
import "./LectureCategoryBox.css";
import { UserContext } from "../utils/UserContext";

const LectureCategoryBox = ({ handleCreateLecture, onBack }) => {
  const { user } = useContext(UserContext); // ✅ 현재 로그인 사용자 정보

  const lectureList = [
    { id: 1, title: "영상처리및실습", professor: "박현준", color: "#007bff" },
    { id: 2, title: "데이터분석과 시각화", professor: "윤병수", color: "#28a745" },
    { id: 3, title: "네트워크보안", professor: "이광일", color: "#ffc107" },
    { id: 4, title: "캡스톤디자인", professor: "김재훈", color: "#dc3545" },
    { id: 5, title: "비판적사고와 논리", professor: "안현수", color: "#17a2b8" },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleLectures = lectureList.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(lectureList.length / itemsPerPage);

  const boardTitle = "강의목록";
  const boardType = "lecture";

  const [isFavorited, setIsFavorited] = useState(false);

  const fetchFavorites = async () => {
    try {
      const response = await axiosInstance.get("/api/post/favorites");
      const matched = response.data.favorites?.find(fav => fav.boardName === boardTitle);
      setIsFavorited(Boolean(matched));
    } catch (e) {
      console.error("즐겨찾기 불러오기 실패", e);
      setIsFavorited(false);
    }
  };

  const toggleFavorite = async () => {
    try {
      if (isFavorited) {
        await axiosInstance.delete("/api/post/favorite", {
          params: { boardType },
        });
      } else {
        await axiosInstance.post("/api/post/favorites", {
          boardName: boardTitle,
          boardType,
        });
      }
      await fetchFavorites();
      window.dispatchEvent(new Event("favoritesUpdated"));
    } catch (e) {
      console.error("즐겨찾기 토글 실패", e);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const isProfessor = user?.roles?.includes("PROFESSOR"); // ✅ 역할 판별

  return (
    <div className="LectureCategoryBox">
      <div className="lecture-category-header" style={{ marginBottom: "10px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h1 className="lecture-category-title">{boardTitle}</h1>
          <button
            className="star-toggle-button"
            onClick={toggleFavorite}
            title="즐겨찾기 추가/제거"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              marginLeft: "8px",
            }}
          >
            <Star size={20} fill={isFavorited ? "#facc15" : "none"} stroke="#f59e0b" />
          </button>
        </div>
        <button className="back-button" onClick={onBack} style={{ marginTop: "10px" }}>
          ← 대시보드로 돌아가기
        </button>
      </div>

      {isProfessor && ( // ✅ 교수만 강의 생성 가능
        <div>
          <button className="create-btn" onClick={handleCreateLecture}>강의 생성</button>
        </div>
      )}

      <div className="lecture-card-grid">
        {visibleLectures.map((lecture) => (
          <Link
            to={`/main/lecture/${lecture.id}`}
            key={lecture.id}
            className="lecture-card"
            state={{ lecture }}
          >
            <div className="lecture-color-box" style={{ backgroundColor: lecture.color }} />
            <div className="lecture-info">
              <h3>{lecture.title}</h3>
              <p>{lecture.professor} 교수님</p>
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
