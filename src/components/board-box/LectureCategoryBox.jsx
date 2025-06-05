import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import axiosInstance from "../utils/AxiosInstance";
import "./LectureCategoryBox.css";

const LectureCategoryBox = () => {
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

  const [favorites, setFavorites] = useState([]);
  const [isFavorited, setIsFavorited] = useState(false);

  const fetchFavorites = async () => {
    try {
      const response = await axiosInstance.get("/api/post/favorites");
      if (Array.isArray(response.data.favorites)) {
        setFavorites(response.data.favorites);
        const matched = response.data.favorites.find(fav => fav.boardName === boardTitle);
        setIsFavorited(Boolean(matched));
      } else {
        setFavorites([]);
        setIsFavorited(false);
      }
    } catch (e) {
      console.error("즐겨찾기 불러오기 실패", e);
      setIsFavorited(false);
    }
  };

   const toggleFavorite = async () => {
  try {
    if (isFavorited) {
      // 삭제 요청: favoriteId 대신 boardType을 params로 넘김
      await axiosInstance.delete("/api/post/favorite", {
        params: { boardType: boardType },
      });
    } else {
      await axiosInstance.post("/api/post/favorites", {
        boardName: boardTitle,
        boardType: boardType,
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

  return (
    <div className="LectureCategoryBox">
      <div
        className="lecture-category-header"
        style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
      >
        <h2 className="lecture-category-title">{boardTitle}</h2>
        <button
          className="star-toggle-button"
          onClick={toggleFavorite}
          title="즐겨찾기 추가/제거"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            marginLeft: "8px",
            padding: 0,
          }}
        >
          <Star size={20} fill={isFavorited ? "#facc15" : "none"} stroke="#f59e0b" />
        </button>
      </div>

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
