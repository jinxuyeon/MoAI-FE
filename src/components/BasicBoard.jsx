import "./BasicBoard.css";
import { Link } from "react-router-dom";
import axiosInstance from "./utils/AxiosInstance";
import { useEffect, useState } from "react";

const BasicBoard = ({ type, title }) => {
  const [posts, setPosts] = useState([]);

  const handleSearch = async () => {
    try {
      const res = await axiosInstance.get("/api/post", {
        params: {
          boardType: type,
          page: 0,
          size: 3,
        },
      });
      const postData = res.data?.pageResponse?.posts || [];
setPosts(postData);
    } catch (err) {
      console.error("❌ 게시글 불러오기 실패:", err);
      setPosts([]);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <section className="BasicBoard">
      <div className = "container">
        <div className="title-line">
          <h4 className="title">{title}</h4>
          <Link to={`/main/community/${type.toLowerCase()}`} className="more-link">
          게시글 더보기 ⇀</Link>
        </div>
      </div>

      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id} className="basic-post-item">
            <Link to={`/main/community/${type.toLowerCase()}/post/${post.id}`}>
              <strong>{post.title}</strong>
            </Link>
            <p className="meta">
              {post.writerNickname} | {post.createdDate?.slice(0, 10)} | ❤️ {post.likeCount} | 💬 {post.commentCount}
            </p>
          </div>
        ))
      ) : (
        <div>게시글이 없습니다.</div>
      )}
      
    </section>
  );
};

export default BasicBoard;
