import { useEffect, useState, useContext } from "react";
import axiosInstance from "./utils/AxiosInstance";
import { UserContext } from "./utils/UserContext";
import "./MyActivities.css";

const MyActivities = () => {
  const [activeTab, setActiveTab] = useState("posts");
  const [myPosts, setMyPosts] = useState([]);
  const [myComments, setMyComments] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user) return;

    const fetchMyPosts = async () => {
      try {
        const res = await axiosInstance.get("/api/post/my-posts");
        setMyPosts(res.data);
      } catch (err) {
        console.error("내 작성글 불러오기 실패:", err);
      }
    };

    const fetchMyComments = async () => {
      try {
        const res = await axiosInstance.get("/api/comment/my-comments");
        setMyComments(res.data);
      } catch (err) {
        console.error("내 댓글 불러오기 실패:", err);
      }
    };

    fetchMyPosts();
    fetchMyComments();
  }, [user]);

  return (
    <div className="MyActivities">
      <section>
        <div className="activity-tabs">
          <button
            className={activeTab === "posts" ? "active" : ""}
            onClick={() => setActiveTab("posts")}
          >
            작성글
          </button>
          <button
            className={activeTab === "comments" ? "active" : ""}
            onClick={() => setActiveTab("comments")}
          >
            작성댓글
          </button>
        </div>

        <div className="activity-content">
          {activeTab === "posts" && (
            <div className="box checklist-box" style={{ minHeight: "100px" }}>
              {myPosts.length === 0 ? (
                <p>작성한 글이 없습니다.</p>
              ) : (
                <ul className="post-list-ul">
                  {myPosts.map((post) => (
                    <li key={post.id} className="post-list-item">
                      <strong>{post.title}</strong>
                      <p className="post-snippet">
                        {post.content?.replace(/<[^>]*>/g, '').slice(0, 50)}...
                      </p>
                      <span className="post-meta">
                        {new Date(post.createdAt).toLocaleString()}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {activeTab === "comments" && (
            <div className="box checklist-box" style={{ minHeight: "100px" }}>
              {myComments.length === 0 ? (
                <p>작성한 댓글이 없습니다.</p>
              ) : (
                <ul className="post-list-ul">
                  {myComments.map((comment) => (
                    <li key={comment.id} className="post-list-item">
                      <p className="post-snippet">
                        {comment.content?.replace(/<[^>]*>/g, "").slice(0, 50)}...
                      </p>
                      <span className="post-meta">
                        {new Date(comment.createdAt).toLocaleString()}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default MyActivities;
