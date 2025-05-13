import { useState } from "react";
import { Link } from "react-router-dom";
import "./SecretBoardBox.css";

const SecretBoardBox = () => {
    const dummySecrets = [
        { id: 8, title: "이거 진짜 비밀인데요...", content: "들키면 안 되는 이야기입니다.", author: "익명", date: "2025-05-10", views: 48, thumbnail: "/thumb1.jpg" },
        { id: 7, title: "고민 있습니다", content: "누구한테도 말 못한 고민이에요.", author: "익명", date: "2025-05-09", views: 35, thumbnail: "/thumb2.jpg" },
        { id: 6, title: "진로 고민 중이에요", content: "진로를 어떻게 정해야 할지...", author: "익명", date: "2025-05-08", views: 27, thumbnail: "/thumb3.jpg" },
        { id: 5, title: "속상한 일 있었어요", content: "오늘 정말 안 좋은 일이 있었는데...", author: "익명", date: "2025-05-07", views: 39, thumbnail: "/thumb4.jpg" },
        // ...더미 데이터 추가 가능
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const visibleSecrets = dummySecrets.slice(startIndex, startIndex + itemsPerPage);
    const totalPages = Math.ceil(dummySecrets.length / itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="SecretBoardBox">
            <div className="secret-header">
                <h2 className="secret-title">비밀 게시판</h2>
                {/* <Link to="/main/secret/write" className="write-button">글쓰기</Link> */}
            </div>

            <ul className="secret-list">
                {visibleSecrets.map(secret => (
                    <li key={secret.id} className="secret-item">
                        <Link to={`/main/secret/${secret.id}`} className="secret-link">
                            <div className="secret-text">
                                <h3 className="secret-item-title">{secret.title}</h3>
                                <p className="secret-item-content">{secret.content}</p>
                                <div className="secret-meta">
                                    <span>{secret.author}</span> · <span>{secret.date}</span> · <span>{secret.views} 조회</span>
                                </div>
                            </div>
                            <img src={secret.thumbnail} alt="썸네일" className="secret-thumbnail" />
                        </Link>
                    </li>
                ))}
            </ul>

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

export default SecretBoardBox;
