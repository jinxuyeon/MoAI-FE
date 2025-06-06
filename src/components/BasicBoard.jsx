import "./BasicBoard.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
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

  return (
    <section className="BasicBoard">
      <div className="container">
        <div className="title-line" style={{ display: "flex", alignItems: "center" }}>
          <Link to={`/main/community/${type.toLowerCase()}`} className="more-link">
            <h4 className="title">{title}</h4>
          </Link>
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
                {post.writerNickname} | {post.createdDate?.slice(0, 10)} | 댓글:{post.commentCount}
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
