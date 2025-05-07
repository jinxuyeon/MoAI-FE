import { useState } from "react";
import { Link } from "react-router-dom";
import "./FreeBoardBox.css";

const FreeBoardBox = () => {
    const dummyFrees = [
        { id: 15, title: "오늘 날씨 진짜 좋네요 ☀️", author: "서예빈", date: "2025-05-01", views: 12 },
        { id: 14, title: "프론트엔드 공부 어떻게 시작했어요?", author: "익명", date: "2025-04-30", views: 55 },
        { id: 13, title: "컴공 시험 범위 아시는 분?", author: "최윤주", date: "2025-04-29", views: 45 },
        { id: 12, title: "자취 꿀템 추천좀 해주세요", author: "홍길동", date: "2025-04-28", views: 25 },
        { id: 10, title: "헬스장 같이 다니실 분 구해요", author: "익명", date: "2025-04-26", views: 50 },
        { id: 9, title: "친해져요!", author: "익명", date: "2025-04-25", views: 18 },
        { id: 8, title: "상담 후기 ㅠ", author: "김민수", date: "2025-04-24", views: 27 },
        { id: 7, title: "다들 꿈이 뭐양?", author: "이민지", date: "2025-04-23", views: 41 },
        { id: 6, title: "반팔 언제 입을꺼야??", author: "익명", date: "2025-04-22", views: 38 },
        { id: 5, title: "친구 문제 해결 좀 ㅜ", author: "익명", date: "2025-04-21", views: 22 },
        { id: 4, title: "나 좀 도와줘ㅓㅓㅓ", author: "익명", date: "2025-04-20", views: 31 },
        { id: 3, title: "반갑습니다", author: "이지민", date: "2025-04-19", views: 14 },
        { id: 2, title: "헤헤", author: "익명", date: "2025-04-18", views: 29 },
        { id: 1, title: "해외 여행지 추천 좀", author: "익명", date: "2025-04-17", views: 35 },
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // 인기글 정렬 (조회수 내림차순)
    const popularFrees = dummyFrees
        .filter(free => free.views >= 40)
        .sort((a, b) => b.views - a.views);

    const normalFrees = dummyFrees
        .filter(free => free.views < 40)
        .sort((a, b) => b.id - a.id); // 최신순

    const sortedFrees = [...popularFrees, ...normalFrees];

    // 페이지 계산
    const startIndex = (currentPage - 1) * itemsPerPage;
    const visibleFrees = sortedFrees.slice(startIndex, startIndex + itemsPerPage);
    const totalPages = Math.ceil(sortedFrees.length / itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="FreeBoardBox">
            <div className="free-header">
                <h2 className="free-title">자유 게시판</h2>
                <Link to="/main/free/write" className="write-button">글쓰기</Link>
            </div>

            <table className="free-table">
                <thead>
                    <tr>
                        <th style={{ width: "10%" }}>번호</th>
                        <th style={{ width: "45%" }}>제목</th>
                        <th style={{ width: "15%" }}>글쓴이</th>
                        <th style={{ width: "20%" }}>날짜</th>
                        <th style={{ width: "10%" }}>조회수</th>
                    </tr>
                </thead>
                <tbody>
                    {visibleFrees.map((free, index) => (
                        <tr key={free.id}>
                            <td>{sortedFrees.length - (startIndex + index)}</td>
                            <td className="free-title-cell">
                                {free.views >= 40 && (
                                    <span className="pinned-label">인기</span>
                                )}
                                <Link to={`/main/free/${free.id}`} className="free-link">
                                    {free.title}
                                </Link>
                            </td>
                            <td>{free.author}</td>
                            <td>{free.date}</td>
                            <td>{free.views}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

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

export default FreeBoardBox;
