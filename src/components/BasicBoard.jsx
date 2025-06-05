import "./BasicBoard.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import axios from "axios";

const BasicBoard = ({ type, posts, title }) => {
  const [favorites, setFavorites] = useState([]);
  const isFavorited = favorites.includes(title);

  const fetchFavorites = async () => {
    try {
      const { data } = await axios.get("/api/favorites");
      if (Array.isArray(data)) setFavorites(data);
    } catch (e) {
      console.error("즐겨찾기 불러오기 실패", e);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const toggleFavorite = async () => {
    try {
      if (isFavorited) {
        await axios.delete("/api/favorites", { data: { boardName: title } });
      } else {
        await axios.post("/api/favorites", { boardName: title });
      }
      fetchFavorites(); // 상태 최신화
      window.dispatchEvent(new Event("favoritesUpdated")); // 다른 컴포넌트 갱신
    } catch (e) {
      console.error("즐겨찾기 토글 실패", e);
    }
  };

  return (
    <section className="BasicBoard">
      <div className="container">
        <div className="title-line" style={{ display: "flex", alignItems: "center" }}>
          <Link to={`/main/community/${type.toLowerCase()}`} className="more-link">
            <h4 className="title">{title}</h4>
          </Link>
          <button className="star-button" onClick={toggleFavorite} title="즐겨찾기 추가/제거">
            <Star size={18} fill={isFavorited ? "#fcd34d" : "none"} stroke="#f59e0b" />
          </button>
        </div>
      </div>

      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id} className="basic-post-item">
            <Link
              className="post-link"
              to={`/main/community/${post.boardType.toLowerCase()}/post/${post.id}`}
            >
              <strong>{post.title}</strong>
            </Link>
            <div className="meta">
              <p className="meta-content">
                {post.writerNickname} | {post.createdDate?.slice(0, 10)}
              </p>
            </div>
          </div>
        ))
      ) : (
        <div>게시글이 없습니다.</div>
      )}
    </section>
  );
};

export default BasicBoard;
