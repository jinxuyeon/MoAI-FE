import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import axios from "axios";

import "./BasicBoardBox.css";

const BasicBoardBox = ({ data, onPageChange }) => {
  const { posts, currentPage, totalPages } = data;

  const [favorites, setFavorites] = useState([]);
  const boardTitle = posts[0]?.boardTypeName || "게시판";
  const boardType = posts[0]?.boardType || "unknown";

  const matchedFavorite = favorites.find(f => f.boardName === boardTitle);
  const isFavorited = Boolean(matchedFavorite);

  const fetchFavorites = async () => {
    try {
      const { data } = await axios.get("/api/favorites");
      if (Array.isArray(data)) setFavorites(data);
    } catch (e) {
      console.error("즐겨찾기 불러오기 실패", e);
    }
  };

 const toggleFavorite = async () => {
  try {
    const boardName = posts[0]?.boardTypeName;
    const boardType = posts[0]?.boardType;

    if (!boardName || !boardType) return;

    const existing = favorites.find(fav => fav.boardName === boardName);

    if (existing) {
      await axios.delete(`/api/favorites/${existing.id}`);
    } else {
      await axios.post("/api/post/favorite", {
        boardName,
        boardType
      });
    }

    fetchFavorites();
    window.dispatchEvent(new Event("favoritesUpdated"));
  } catch (e) {
    console.error("즐겨찾기 토글 실패", e);
  }
};


  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <div className="FreeBoardBox">
      <div
        className="free-header"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        {/* 제목 + 즐겨찾기 */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <h2 className="Free-title">{boardTitle}</h2>
          <button
            onClick={toggleFavorite}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              marginLeft: "8px",
              padding: 0,
            }}
            title="즐겨찾기 추가/제거"
          >
            <Star size={20} fill={isFavorited ? "#facc15" : "none"} stroke="#f59e0b" />
          </button>
        </div>
      </div>

      <div className="free-list">
        {posts.map((post) => (
          <div key={post.id} className="free-list-item">
            <div className="free-list-content">
              <Link
                to={`/main/community/${post.boardType.toLowerCase()}/post/${post.id}`}
                className="free-link"
              >
                <div className="free-title-line">
                  <div className="free-title-wrapper">
                    <h3 className="free-title">{post.title}</h3>
                  </div>
                  <div className="free-author-date">
                    {post.boardType === "SECRET" ? "익명" : post.writerNickname} |{" "}
                    {post.createdDate?.slice(0, 10)}
                  </div>
                </div>
              </Link>
              <div className="free-meta-line">
                조회수 : {post.viewCount} | ❤️ {post.likeCount} | 댓글 {post.commentCount}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        {currentPage > 0 && (
          <button onClick={() => onPageChange(currentPage - 1)}>&lt; 이전</button>
        )}
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => onPageChange(index)}
            className={currentPage === index ? "active-page" : ""}
          >
            {index + 1}
          </button>
        ))}
        {currentPage < totalPages - 1 && (
          <button onClick={() => onPageChange(currentPage + 1)}>다음 &gt;</button>
        )}
      </div>
    </div>
  );
};

export default BasicBoardBox;
