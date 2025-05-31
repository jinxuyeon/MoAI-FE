import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./MarketBox.css";

const MarketBox = ({ data, onPageChange }) => {
    const [currentPage, setCurrentPage] = useState(data.currentPage || 0);
    const itemsPerPage = data.pageSize || 12;
    const posts = data.posts || [];
    const totalPages = data.totalPages || 0;

    useEffect(() => {
        setCurrentPage(data.currentPage || 0);
    }, [data.currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        onPageChange(page); // 외부에서 API 호출 트리거
    };

    return (
        <div className="MarketBox">
            <div className="market-header">
                <h2 className="market-title">장터 게시판</h2>
            </div>
            <div className="market-grid">
                {posts.map((post) => (
                    <div key={post.id} className="market-item">
                        <Link to={`/main/community/market/post/${post.id}`}>
                            <img
                                src={post.imageUrls || "https://placehold.co/200x200?text=No+Image"}
                                alt="썸네일"
                                className="market-thumbnail"
                            />
                            <div className="market-info">
                                <h3>{post.title}</h3>
                                <p className="price">
                                    {post.price?.toLocaleString() ?? "가격 미정"}원
                                </p>
                                <p className="description">
                                    {post.description || "설명 없음"}
                                </p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>

            {totalPages > 1 && (
                <div className="pagination">
                    {currentPage > 0 && (
                        <button onClick={() => handlePageChange(currentPage - 1)}>
                            &lt; 이전
                        </button>
                    )}
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(index)}
                            className={currentPage === index ? "active-page" : ""}
                        >
                            {index + 1}
                        </button>
                    ))}
                    {currentPage < totalPages - 1 && (
                        <button onClick={() => handlePageChange(currentPage + 1)}>
                            다음 &gt;
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default MarketBox;
