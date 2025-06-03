import ProfileTemplate from "../ProfileTemplate";
import "./CommentBox.css";
import MenuButton from "./MenuButton";

const CommentBox = ({ comment, handleCommentLike, boardType }) => {
  const formattedDate = new Date(comment.createdDate).toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <div className={`CommentBox ${comment.isAuthor ? "my-comment" : ""}`}>
      <div className="comment-content-left">
        {boardType === "SECRET" ? (
          <div className="anonymous-nickname">익명</div>
        ) : (
          <ProfileTemplate
            profileImageUrl={comment.writerProfileImageUrl}
            name={comment.writerNickname}
            id={comment.writerId}
          />
        )}
      </div>

      <div className="comment-body-wrapper">
        <div className="comment-header-row">
          <p className="comment-date">{formattedDate}</p>

          {comment.isAuthor && (
            <MenuButton
              onEdit={() => console.log("✏️ 수정")}
              onDelete={() => console.log("🗑️ 삭제")}
            />
          )}
        </div>

        <div className="content-box">
          {comment.text || comment.content}
        </div>
      </div>
    </div>
  );
};

export default CommentBox;
