import { Link } from "react-router-dom";
import { useState } from "react";
import "./NoticeBoardBox.css";

const NoticeBoardBox = () => {
    const dummyNotices = [
        { id: 15, title: "5월 휴무 안내", author: "관리자", date: "2025-05-01", views: 12, isPinned: true },
        { id: 14, title: "서버 점검 예정 공지", author: "운영팀", date: "2025-04-30", views: 20, isPinned: true },
        { id: 13, title: "신입생 환영회 안내", author: "학생처", date: "2025-04-29", views: 45, isPinned: false },
        { id: 12, title: "동아리 모집 공고", author: "학생회", date: "2025-04-28", views: 25, isPinned: false },
        { id: 11, title: "캡스톤 디자인 설명회", author: "공학대학", date: "2025-04-27", views: 33, isPinned: false },
        { id: 10, title: "장학금 신청 안내", author: "학생지원팀", date: "2025-04-26", views: 50, isPinned: false },
        { id: 9, title: "도서관 이용시간 변경", author: "도서관", date: "2025-04-25", views: 18, isPinned: false },
        { id: 8, title: "교내 백신 접종 안내", author: "보건소", date: "2025-04-24", views: 27, isPinned: false },
        { id: 7, title: "2025년 학사일정 공지", author: "학사팀", date: "2025-04-23", views: 41, isPinned: true },
        { id: 6, title: "수강신청 유의사항", author: "교무처", date: "2025-04-22", views: 38, isPinned: false },
        { id: 5, title: "졸업앨범 촬영 일정", author: "홍보팀", date: "2025-04-21", views: 22, isPinned: false },
        { id: 4, title: "제2기 해외연수 프로그램 안내", author: "국제교류팀", date: "2025-04-20", views: 31, isPinned: false },
        { id: 3, title: "2025년 1학기 추가등록 안내", author: "재무팀", date: "2025-04-19", views: 14, isPinned: false },
        { id: 2, title: "기숙사 입사 안내", author: "생활관", date: "2025-04-18", views: 29, isPinned: false },
        { id: 1, title: "학과 오리엔테이션 일정", author: "학과사무실", date: "2025-04-17", views: 35, isPinned: false },
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // 고정공지 우선 정렬
    const pinnedNotices = dummyNotices.filter(notice => notice.isPinned);
    const normalNotices = dummyNotices.filter(notice => !notice.isPinned);
    const sortedNotices = [...pinnedNotices, ...normalNotices];

    // 현재 페이지에 보여줄 공지
    const startIndex = (currentPage - 1) * itemsPerPage;
    const visibleNotices = sortedNotices.slice(startIndex, startIndex + itemsPerPage);

    const totalPages = Math.ceil(sortedNotices.length / itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="NoticeBoardBox">
            <div className="notice-header">
                <h2 className="notice-title">공지사항</h2>
                <Link to="/main/notice/write" className="write-button">
                    글쓰기
                </Link>
            </div>

            <table className="notice-table">
                <thead>
                    <tr>
                        <th style={{ width: "10%" }}>번호</th>
                        <th style={{ width: "55%" }}>제목</th>
                        <th style={{ width: "10%" }}>글쓴이</th>
                        <th style={{ width: "15%" }}>날짜</th>
                        <th style={{ width: "10%" }}>조회수</th>
                    </tr>
                </thead>
                <tbody>
                    {visibleNotices.map((notice, index) => (
                        <tr key={notice.id}>
                            <td>{sortedNotices.length - (startIndex + index)}</td>
                            <td className="notice-title-cell">
                                {notice.isPinned && <span className="pinned-label">공지</span>}
                                <Link to={`/main/notice/${notice.id}`} className="notice-link">
                                    {notice.title}
                                </Link>
                            </td>
                            <td>{notice.author}</td>
                            <td>{notice.date}</td>
                            <td>{notice.views}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="pagination">
                {currentPage > 1 && (
                    <button onClick={() => handlePageChange(currentPage - 1)}>
                        &lt; 이전
                    </button>
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
                    <button onClick={() => handlePageChange(currentPage + 1)}>
                        다음 &gt;
                    </button>
                )}
            </div>
        </div>
    );
};

export default NoticeBoardBox;
