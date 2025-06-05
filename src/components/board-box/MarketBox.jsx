import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import axiosInstance from "../utils/AxiosInstance";
import "./MarketBox.css";

const MarketBox = ({ boardType = "market", setShowUploadModal }) => {
  const boardTitle = "장터 게시판";

  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);

  // ✅ 게시글 불러오기
  const fetchPosts = async (page = 0) => {
    try {
      const res = await axiosInstance.get("/api/post", {
        params: { boardType, page, size: 10 },
      });

      const { pageResponse, isMarked } = res.data;
      setPosts(pageResponse?.posts || []);
      setCurrentPage(pageResponse?.currentPage || 0);
      setTotalPages(pageResponse?.totalPages || 0);
      setIsFavorited(isMarked);
    } catch (err) {
      console.error("❌ 게시글 로딩 실패:", err);
    }
  };

  const handlePageChange = (page) => {
    fetchPosts(page);
  };

  const toggleFavorite = async () => {
    try {
      if (isFavorited) {
        await axiosInstance.delete("/api/post/favorites", {
          params: { boardType },
        });
      } else {
        await axiosInstance.post("/api/post/favorites", {
          boardName: boardTitle,
          boardType,
        });
      }

      setIsFavorited(!isFavorited);
      window.dispatchEvent(new Event("favoritesUpdated"));
    } catch (e) {
      console.error("❌ 즐겨찾기 토글 실패", e);
    }
  };

  useEffect(() => {
    fetchPosts(0);
  }, [boardType]);

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
        {posts.length === 0 ? (
          <p className="empty-message">등록된 물품이 없습니다.</p>
        ) : (
          posts.map((post) => (
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
                    {post.price != null
                      ? `${post.price.toLocaleString()}원`
                      : "가격 미정"}
                  </p>
                  <p className="description">
                    {post.description || "설명 없음"}
                  </p>
                </div>
              </Link>
            </div>
          ))
        )}
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
