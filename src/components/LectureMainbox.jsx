import { useState } from "react";
import "./LectureMainbox.css";

const LectureMainbox = ({ posts }) => {
    const pageSize = 8;
    const [currentPage, setCurrentPage] = useState(0);

    const totalPages = Math.ceil(posts.length / pageSize);
    const currentPosts = posts.slice(currentPage * pageSize, (currentPage + 1) * pageSize);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="lecture-main-box">
            {posts.length > 0 ? (
                <>
                    <table className="lecture-table">
                        <thead>
                            <tr>
                                <th style={{ width: "10%" }}>첨부</th> {/* 추가 */}
                                <th style={{ width: "50%" }}>제목</th>
                                <th>작성자</th>
                                <th>작성일</th>
                                <th>조회수</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentPosts.map((post, index) => (
                                <tr key={index}>
                                    <td>
                                        {post.thumbnailUrl ? (
                                            <img
                                                src={post.thumbnailUrl}
                                                alt="thumbnail"
                                                style={{ width: "40px", height: "auto", borderRadius: "4px" }}
                                            />
                                        ) : (
                                            <span style={{ color: "#bbb" }}>없음</span>
                                        )}
                                    </td>
                                    <td>{post.title}</td>
                                    <td>{post.writerNickname}</td>
                                    <td>{post.createdDate}</td>
                                    <td>{post.viewCount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>


                    {/* ✅ 페이지네이션은 게시글 8개 이상일 때만 표시 */}

                    <div className="pagination">
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i}
                                onClick={() => handlePageChange(i)}
                                className={i === currentPage ? "active-page" : ""}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>

                </>
            ) : (
                <p className="placeholder-text">게시글이 없습니다.</p>
            )}
        </div>
    );
};

export default LectureMainbox;
