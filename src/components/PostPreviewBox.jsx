import { Link } from "react-router-dom";
import "./PostPreviewBox.css";

// HTML에서 이미지 제거하고 텍스트만 추출
const stripHtmlContent = (html) => {
    const withoutMedia = html.replace(/<img[^>]*>|<video[^>]*>.*?<\/video>/gi, "");
    const tmp = document.createElement("div");
    tmp.innerHTML = withoutMedia;
    return tmp.textContent || tmp.innerText || "";
};

const PostPreviewBox = ({ post }) => {
    const previewText = stripHtmlContent(post.content).slice(0, 50) + "...";

    return (
        <div className="PostPreviewBox">
            <Link to={`/main/study-dashboard/${post.lectureRoomId}/post/${post.id}`} className="link">
                <div className="layout-box">
                    <section className="content-box">
                        <div className="inner-box">
                            <div>
                                <p>미해결</p>
                            </div>
                            <div>
                                <p className="title">{post.title}</p>
                                <p className="preview-text">{previewText}</p>
                            </div>
                        </div>
                    </section>
                    <div className="meta-box">
                        <p className="meta-info">
                            {post.writerNickname} · {new Date(post.createdDate).toLocaleDateString("ko-KR")}
                        </p>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default PostPreviewBox;
