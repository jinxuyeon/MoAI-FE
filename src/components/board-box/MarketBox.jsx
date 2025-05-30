import { useState } from "react";
import { Link } from "react-router-dom";
import "./MarketBox.css";

const MarketBox = () => {
    const dummyMarkets = [
        { id: 1, title: "자료구조 책 팝니다", price: 15000, description: "깨끗하게 사용했습니다.", imgUrl: "https://image.yes24.com/goods/69750539/XL" },
        { id: 2, title: "알고리즘 책 판매", price: 18000, description: "거의 새책 상태입니다.", imgUrl: "https://www.hanbit.co.kr/data/books/B7707942187_l.jpg" },
        { id: 3, title: "컴퓨터 구조 교재", price: 12000, description: "필기 조금 있습니다.", imgUrl: "https://www.hanbit.co.kr/data/books/B9011295374_l.jpg" },
        { id: 4, title: "C++ 프로그래밍 책", price: 17000, description: "사용감 적음.", imgUrl: "https://contents.kyobobook.co.kr/sih/fit-in/400x0/pdt/9791156643647.jpg" }
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const visibleMarkets = dummyMarkets.slice(startIndex, startIndex + itemsPerPage);
    const totalPages = Math.ceil(dummyMarkets.length / itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="MarketBox">
            <div className="market-header">
                <h2 className="market-title">장터 게시판</h2>
                {/* <Link to="/main/market/write" className="write-button">글쓰기</Link> */}
            </div>

            <div className="market-grid">
                {visibleMarkets.map((post) => (
                    <div key={post.id} className="market-item">
                        <Link to={`/main/community/market/post/${post.id}`}>
                                          
                            <img src={post.imgUrl} alt="썸네일" className="market-thumbnail" />
                            <div className="market-info">
                                <h3>{post.title}</h3>
                                <p className="price">{post.price.toLocaleString()}원</p>
                                <p className="description">{post.description}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>

            <div className="pagination">
                {currentPage > 1 && (
                    <button onClick={() => handlePageChange(currentPage - 1)}>&lt; 이전</button>
                )}
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={currentPage === index + 1 ? "active-page" : ""}
                    >
                        {index + 1}
                    </button>
                ))}
                {currentPage < totalPages && (
                    <button onClick={() => handlePageChange(currentPage + 1)}>다음 &gt;</button>
                )}
            </div>
        </div>
    );
};

export default MarketBox;
