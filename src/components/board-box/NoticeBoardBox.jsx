import { Link } from "react-router-dom";
import { useState } from "react";
import "./NoticeBoardBox.css";

const NoticeBoardBox = () => {
  const dummyNotices = [
    { id: 15, title: "5월 휴무 안내", author: "관리자", date: "2025-05-01", views: 12, isPinned: true, imgUrl: "https://png.pngtree.com/png-vector/20231023/ourmid/pngtree-announcement-message-information-png-image_10314003.png" },
    { id: 14, title: "서버 점검 예정 공지", author: "운영팀", date: "2025-04-30", views: 20, isPinned: true },
    { id: 13, title: "신입생 환영회 안내", author: "학생처", date: "2025-04-29", views: 45, isPinned: false, imgUrl: "https://png.pngtree.com/png-vector/20231023/ourmid/pngtree-announcement-message-information-png-image_10314003.png" },
    { id: 12, title: "동아리 모집 공고", author: "학생회", date: "2025-04-28", views: 25, isPinned: false },
    { id: 11, title: "캡스톤 디자인 설명회", author: "공학대학", date: "2025-04-27", views: 33, isPinned: false, imgUrl: "https://png.pngtree.com/png-vector/20231023/ourmid/pngtree-announcement-message-information-png-image_10314003.png" },
    { id: 10, title: "장학금 신청 안내", author: "학생지원팀", date: "2025-04-26", views: 50, isPinned: false },
    { id: 9, title: "도서관 이용시간 변경", author: "도서관", date: "2025-04-25", views: 18, isPinned: false },
    { id: 8, title: "교내 백신 접종 안내", author: "보건소", date: "2025-04-24", views: 27, isPinned: false }
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const pinnedNotices = dummyNotices.filter(n => n.isPinned);
  const normalNotices = dummyNotices.filter(n => !n.isPinned);
  const sortedNotices = [...pinnedNotices, ...normalNotices];

  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleNotices = sortedNotices.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(sortedNotices.length / itemsPerPage);

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div className="NoticeBoardBox">
      <div className="notice-header">
        <h2 className="notice-title">공지사항</h2>
      </div>

      <div className="notice-list">
        {visibleNotices.map((notice) => (
          <div key={notice.id} className="notice-list-item">
            {notice.imgUrl && (
              <img src={notice.imgUrl} alt="썸네일" className="notice-thumbnail" />
            )}
            <div className="notice-list-content">
              <Link to={`/main/notice/${notice.id}`} className="notice-title-link">
                {notice.title}
                {notice.isPinned && <span className="notice-badge">공지</span>}
              </Link>
              <div className="notice-meta">
                {notice.author} | {notice.date} | 조회 {notice.views}
              </div>
            </div>
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

export default NoticeBoardBox;
