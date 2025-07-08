import "./InfoBox.css";
import { useState } from "react";
import { Link } from "react-router-dom";

const InfoBox = ({ data }) => {
  const boardTitles = {
    자유게시판: "자유게시판",
    비밀게시판: "비밀게시판",
    조교가말한다: "조교가 말한다",
    후기: "취업, 면접 후기",
  };

  const [selectedBoard, setSelectedBoard] = useState("자유게시판");
  const selectedPosts = data[selectedBoard] || [];

  return (
    <div className="InfoBox">
      <div className="inner">
        <div className="top">
          <h1>커뮤니티</h1>
          <div className="filter-area">
            {Object.keys(boardTitles).map((key) => (
              <button
                key={key}
                onClick={() => setSelectedBoard(key)}
                className={selectedBoard === key ? "active" : ""}
              >
                {boardTitles[key]}
              </button>
            ))}
          </div>
        </div>

        <div className="list-area">
          <ul className="list">
            {selectedPosts.length === 0 ? (
              <li className="item">게시글이 없습니다.</li>
            ) : (
              selectedPosts.map((post) => (
                <li key={post.id} className="item">
                  <Link
                    className="post-link"
                    to={`/main/community/${post.boardType.toLowerCase()}/post/${post.id}`}
                  >
                    <strong>{post.title}</strong>
                  </Link>
                  <div className="meta">
                    {post.writerNickname} | {post.createdDate?.slice(0, 10)} | 댓글: {post.commentCount}
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InfoBox;
