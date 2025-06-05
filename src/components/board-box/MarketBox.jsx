import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import axiosInstance from "../utils/AxiosInstance";
import "./MarketBox.css";

const MarketBox = ({ data, onPageChange, setShowUploadModal }) => {
  const [currentPage, setCurrentPage] = useState(data.currentPage || 0);
  const posts = data.posts || [];
  const totalPages = data.totalPages || 0;

  const boardTitle = "장터 게시판";
  const boardType = "market";

  const [favorites, setFavorites] = useState([]);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    setCurrentPage(data.currentPage || 0);
  }, [data.currentPage]);

  // 즐겨찾기 데이터 가져오기 + isFavorited 상태 업데이트
  const fetchFavorites = async () => {
    try {
      const response = await axiosInstance.get("/api/favorites");
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
      // matchedFavorite을 찾아서 id를 넘김
      const matchedFavorite = favorites.find(fav => fav.boardName === boardTitle);
      if (!matchedFavorite) {
        console.warn("삭제할 즐겨찾기 항목을 찾을 수 없습니다.");
        return;
      }
      await axiosInstance.delete("/api/post/favorites", {
        params: { favoriteId: matchedFavorite.id },
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


  const handlePageChange = (page) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <div className="MarketBox">
      <div
        className="market-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <h2 className="market-title" style={{ margin: 0 }}>
            {boardTitle}
          </h2>
          <button
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
            <Star
              size={20}
              fill={isFavorited ? "#facc15" : "none"}
              stroke="#f59e0b"
            />
          </button>
        </div>
      </div>

      <div className="market-grid">
        {posts.map((post) => (
          <div key={post.id} className="market-item">
            <Link to={`/main/community/market/post/${post.id}`}>
              <img
                src={post.imageUrls || "https://placehold.co/200x200?text=No+Image"}
                alt="썸네일"
                className="market-thumbnail"
              />
              <div className="market-info">
                <h3>{post.title}</h3>
                <p className="price">
                  {post.price?.toLocaleString() ?? "가격 미정"}원
                </p>
                <p className="description">{post.description || "설명 없음"}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          {currentPage > 0 && (
            <button onClick={() => handlePageChange(currentPage - 1)}>
              &lt; 이전
            </button>
          )}
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index)}
              className={currentPage === index ? "active-page" : ""}
            >
              {index + 1}
            </button>
          ))}
          {currentPage < totalPages - 1 && (
            <button onClick={() => handlePageChange(currentPage + 1)}>
              다음 &gt;
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default MarketBox;
