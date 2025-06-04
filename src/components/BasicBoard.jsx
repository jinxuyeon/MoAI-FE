import "./BasicBoard.css";
import { Link } from "react-router-dom";

const BasicBoard = ({ type,  posts, title }) => {

  return (
    <section className="BasicBoard">
      <div className="container">
        <div className="title-line">
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
