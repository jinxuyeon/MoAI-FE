import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/AxiosInstance";
import "./PostDetail.css";

const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axiosInstance.get(`/api/post/${postId}`);
        setPost(res.data);
        setComments(res.data.comments || []);
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
    setComments(prev =>
      prev.map(c =>
        c.id === commentId
          ? { ...c, liked: !c.liked, likes: (c.likes || 0) + (c.liked ? -1 : 1) }
          : c
      )
    );
  };


  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;
  
    try {
      await axiosInstance.post(`/api/post/${postId}/comments`, {
        content: newComment
      });
  
      // ✅ 댓글 목록 다시 불러오기
      const res = await axiosInstance.get(`/api/post/${postId}`);
      setPost(res.data);
      setComments(res.data.comments || []);
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
        <button className="like-toggle-button" onClick={handleLike}>
          {liked ? "❤️" : "🤍"}
        </button>
      </div>

      <div className="post-meta">
        {post.author} | {post.created_date?.slice(0, 10)} | 조회 {post.view_count}
      </div>

      {post.image_urls && (
        <img src={post.image_urls} alt="썸네일" className="post-image" />
      )}

      <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content }}></div> 

      <div className="comment-header-line">
        <span className="comment-header">💬 댓글 {comments.length}</span>
      </div>


      <div className="comment-form">
        <input
          type="text"
          placeholder="댓글을 입력하세요"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={handleCommentSubmit}>작성</button>
      </div>

      <ul className="comment-list">
        {comments.map((c) => (
          <li key={c.id} className="comment-item">
            <div className="comment-info">
              <strong>{c.author || c.writerNickname}</strong>: {c.text || c.content}
            </div>
            <button
              className="comment-like-button"
              onClick={() => handleCommentLike(c.id)}
            >
              {c.liked ? "❤️" : "🤍"}
            </button>
          </li>
        ))}
      </ul>

    </div>
  );
};

export default PostDetail;
