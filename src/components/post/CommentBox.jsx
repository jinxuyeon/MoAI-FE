import ProfileTemplate from "../ProfileTemplate";
import "./CommentBox.css";
import MenuButton from "./MenuButton";
import axiosInstance from "../utils/AxiosInstance";

const CommentBox = ({ comment, handleCommentLike, boardType, onDeleteSuccess }) => {
  const formattedDate = new Date(comment.createdDate).toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const handleDelete = async () => {
    const confirmed = window.confirm("정말로 이 댓글을 삭제하시겠습니까?");
    if (!confirmed) return;

    try {
      await axiosInstance.delete(`/api/comment/${comment.id}`);
      if (onDeleteSuccess) {
        onDeleteSuccess(comment.id); // 상위 컴포넌트에서 댓글 리스트 갱신
      }
    } catch (error) {
      console.error("❌ 댓글 삭제 실패:", error);
      alert("댓글 삭제 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className={`CommentBox ${comment.isAuthor ? "my-comment" : ""}`}>
      <div className="comment-content-left">
        {boardType === "SECRET" ? (
          <div className="anonymous-nickname">익명</div>
        ) : (
          <ProfileTemplate
            profileImageUrl={comment.writerProfileThumbnails}
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
              onDelete={handleDelete}
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
