import { useState } from "react";
import { Link } from "react-router-dom";
import "./FreeBoardBox.css";

const FreeBoardBox = () => {
  const dummyFrees = [
    { id: 15, title: "오늘 날씨 진짜 좋네요 ☀️", author: "서예빈", date: "2025-05-01", views: 12, like: 25, ment: 2, imgUrl: "https://mblogthumb-phinf.pstatic.net/MjAyMjAyMDdfMjEy/MDAxNjQ0MTk0Mzk2MzY3.WAeeVCu2V3vqEz_98aWMOjK2RUKI_yHYbuZxrokf-0Ug.sV3LNWlROCJTkeS14PMu2UBl5zTkwK70aKX8B1w2oKQg.JPEG.41minit/1643900851960.jpg?type=w800" },
    { id: 14, title: "프론트엔드 공부 어떻게 시작했어요?", author: "익명", date: "2025-04-30", views: 55, like: 25, ment: 2 },
    { id: 13, title: "캡공 시험 범위 아시는 분?", author: "최윤주", date: "2025-04-29", views: 45, like: 25, ment: 2, imgUrl: "https://mblogthumb-phinf.pstatic.net/MjAyMTEyMTJfMjg2/MDAxNjM5MjQ5ODI1NTU3.bEgs_j_ZaQgWAgAnjJ2daUIQlUzKuAud4l6KRXgqiw0g.qt0LjkvDb9WRPR1j_WEOjwZS642aXaI36iWDxvsqW2Ug.JPEG.41minit/1639153272211%EF%BC%8D4.jpg?type=w800" },
    { id: 12, title: "자취템 추천좀 해주세요", author: "홍길동", date: "2025-04-28", views: 25, like: 25, ment: 2 },
    { id: 11, title: "친해져요!", author: "익명", date: "2025-04-27", views: 18, like: 25, ment: 2 },
    { id: 10, title: "헬스장 같이 다니실 분 구해요", author: "익명", date: "2025-04-26", views: 50, like: 25, ment: 2, imgUrl: "https://mblogthumb-phinf.pstatic.net/MjAyMTEyMTJfODcg/MDAxNjM5MjQ5ODI4MDUz.RK_Ci32uWkgzv4sTTrlLowPU0bLil6qVMF1jTLKJHEAg.ra83ge0ifH7-tyv7mwa-3WOJL8sgOcSk3qQ80YUMvC0g.JPEG.41minit/1639153272211%EF%BC%8D7.jpg?type=w800" },
    { id: 9, title: "상담 후기", author: "김민수", date: "2025-04-25", views: 27, like: 25, ment: 2 },
    { id: 8, title: "다들 꿈이 뭐야?", author: "이민지", date: "2025-04-23", views: 41, like: 25, ment: 2, imgUrl: "https://mblogthumb-phinf.pstatic.net/MjAyMTEyMjJfMTA5/MDAxNjQwMTUwOTUwNTE3.X_5x1TPHLfj7aQpP7xxk3o8M85B8AhUFuB7C7Z8WFPEg.7fAWNV1H5ITpZVUPuYG9o38x6shm3llnDAO_Xtqs-U4g.JPEG.41minit/1640148412116.jpg?type=w800" },
    { id: 7, title: "반팔 언제 입을꺼야??", author: "익명", date: "2025-04-22", views: 38, like: 25, ment: 2 },
    { id: 6, title: "친구 문제 해결 좀 ", author: "익명", date: "2025-04-21", views: 22, like: 25, ment: 2 }
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const popularFrees = dummyFrees.filter(free => free.views >= 40).sort((a, b) => b.views - a.views);
  const normalFrees = dummyFrees.filter(free => free.views < 40).sort((a, b) => b.id - a.id);
  const sortedFrees = [...popularFrees, ...normalFrees];

  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleFrees = sortedFrees.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(sortedFrees.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="FreeBoardBox">
      <div className="free-header">
        <h2 className="Free-title">자유게시판</h2>
      </div>

      <div className="free-list">
        {visibleFrees.map((free) => (
          <div key={free.id} className="free-list-item">
            {free.imgUrl && (
              <img src={free.imgUrl} alt="썸네일" className="free-thumbnail" />
            )}
            <div className="free-list-content">
              <Link to={`/main/free/${free.id}`} className="free-link">
                <div className="free-title-line">
                  <div className="free-title-wrapper">
                    <h3 className="free-title">{free.title}</h3>
                    {free.views >= 40 && (
                      <span className="hot-badge">인기</span>
                    )}
                  </div>
                  <div className="free-author-date">
                    {free.author} | {free.date}
                  </div>
                </div>
              </Link>
              <div className="free-meta-line">
                조회 {free.views} | ❤️ {free.like} | 댓글 {free.ment}
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

export default FreeBoardBox;
