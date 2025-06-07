import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axiosInstance from "../utils/AxiosInstance";
import "./PostDetail.css";
import CommentBox from "./CommentBox";
import ProfileTemplate from "../ProfileTemplate";
import MenuButton from "./MenuButton";

const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axiosInstance.get(`/api/post/${postId}`);
        setPost(res.data);

        const sortedComments = [...(res.data.comments || [])].sort(
          (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
        );
        setComments(sortedComments);
      } catch (err) {
        console.error("❌ 게시글 상세 불러오기 실패:", err);
      }
    };
    fetchPost();
  }, [postId]);

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleCommentLike = (commentId) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === commentId
          ? { ...c, liked: !c.liked, likes: (c.likes || 0) + (c.liked ? -1 : 1) }
          : c
      )
    );
  };

  const handlePostDelete = async () => {
    const confirmed = window.confirm("정말로 이 게시글을 삭제하시겠습니까?");
    if (!confirmed) return;

    try {
      await axiosInstance.delete(`/api/post/${postId}`);
      navigate(`/main/community/${post.boardType.toLowerCase()}`);
    } catch (err) {
      console.error("❌ 게시글 삭제 실패:", err);
      alert("게시글 삭제 중 오류가 발생했습니다.");
    }
  };

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;

    try {
      await axiosInstance.post(`/api/post/${postId}/comments`, {
        content: newComment,
      });

      const res = await axiosInstance.get(`/api/post/${postId}`);
      setPost(res.data);

      const latestComments = res.data.comments || [];
      setComments(latestComments.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate)));

      setNewComment("");
    } catch (err) {
      console.error("❌ 댓글 등록 실패:", err);
      alert("댓글 등록 실패");
    }
  };

  if (!post) return <div className="post-detail-container">게시글을 찾을 수 없습니다.</div>;

  return (
    <div className="post-detail-container">
      <div className="post-title-with-like">
        <h2 className="post-title">{post.title}</h2>
        {post.isAuthor && (
          <MenuButton onEdit={() => { }} onDelete={handlePostDelete} />
        )}
      </div>

      <div className="post-meta">
        {post.boardType === "SECRET" ? (
          <div className="anonymous-writer">익명</div>
        ) : (
          <ProfileTemplate
            profileImageUrl={post.writerProfileThumbnails}
            name={post.writerNickname}
            id={post.writerId}
          />
        )}
        {post.createdDate?.slice(0, 10)} | 조회 {post.viewCount}
      </div>

      {/* ✅ 게시판 타입이 MARKET이면 예외적으로 수평 배치 */}
      {post.boardType === "MARKET" ? (
        <div className="market-horizontal-layout">
          <div className="market-image-box">
            <img
              src={post.imageUrls || "/icons/no-img-text.png"}
              alt="상품 이미지"
              className="market-main-image"
            />

          </div>
          <div className="market-info-box">
            <h3 className="market-title">{post.title}</h3>
            <p className="market-price">
              {post.price != null ? `${post.price.toLocaleString()}원` : "가격 미정"}
            </p>
            <div
              className="market-description"
              dangerouslySetInnerHTML={{ __html: post.content }}
            ></div>
          </div>
        </div>
      ) : (
        // 기본 게시판 본문
        <>
          {post.image_urls && (
            <img src={post.image_urls} alt="썸네일" className="post-image" />
          )}
          <section className="post-content-box">
            <div
              className="post-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            ></div>
          </section>
        </>
      )}

      <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "8px", marginTop: "20px" }}>
        <div className="like-container">
          <button className="like-toggle-button" onClick={handleLike}>
            {liked ? "❤️" : "🤍"}
          </button>
        </div>
        <Link
          to={`/main/community/${post.boardType.toLowerCase()}`}
          className="back-to-list-button"
        >
          목록으로
        </Link>
      </div>


      <div className="comment-header-line">
        <span className="comment-header">💬 댓글 {comments.length}</span>
      </div>

      <div className="comment-form">
        <input
          type="text"
          placeholder="댓글을 입력하세요"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleCommentSubmit();
            }
          }}
        />
        <button onClick={handleCommentSubmit}>작성</button>
      </div>

      <ul className="comment-list">
        {comments.map((c) => (
          <li key={c.id} className="comment-item">
            <CommentBox
              comment={c}
              handleCommentLike={handleCommentLike}
              boardType={post.boardType}
              onDeleteSuccess={(deletedId) =>
                setComments((prev) => prev.filter((comment) => comment.id !== deletedId))
              }
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostDetail;
