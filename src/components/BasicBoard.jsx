import "./BasicBoard.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
const BasicBoard = ({ type, posts, title }) => {

  useEffect(() => {
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
            <div className="title-area">
              <Link
                className="post-link"
                to={`/main/community/${post.boardType.toLowerCase()}/post/${post.id}`}
              >
                <strong>{post.title}</strong>
              </Link>
            </div>
            <div className="meta">
              <div className="meta-content">
                {post.writerNickname} | {post.createdDate?.slice(0, 10)} | 댓글:{post.commentCount}
              </div>
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
