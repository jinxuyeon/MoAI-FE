import { useState } from "react";
import { Link } from "react-router-dom";
import "./SecretBoardBox.css";

const SecretBoardBox = () => {
    const dummySecrets = [
        { id: 15, title: "혼밥 너무 외로워요", author: "익명", date: "2025-05-15", views: 16, imgUrl: "https://i.namu.wiki/i/9aUQQ4YjU9vmKuHT_cZAL61VKpKsLolynnI46BhOZQuKxGJygZ6BJK2zTHoX3pcNQmmcfzcVEZQcythY1lRXBQ.webp" },
        { id: 14, title: "좋아하는 사람 생겼는데 말 못해요", author: "익명", date: "2025-05-14", views: 34 },
        { id: 13, title: "부모님께 진로 거짓말했어요", author: "익명", date: "2025-05-13", views: 20 },
        { id: 12, title: "공허한 느낌 벗어나고 싶어요", author: "익명", date: "2025-05-12", views: 45, imgUrl: "https://i.namu.wiki/i/Va3Dy_3qFHvGQS4qwv0oCvFySbT1DXJkK0zfMosd2UK6Jun8Zucb796VLJzLL4A40e5P4dgbBPT4da2Bv_S50Q.webp" },
        { id: 11, title: "친구한테 질투하는 내가 싫어요", author: "익명", date: "2025-05-11", views: 30 },
        { id: 10, title: "누군가 계속 쳐다보는 것 같아요", author: "익명", date: "2025-05-10", views: 26, imgUrl: "https://mblogthumb-phinf.pstatic.net/MjAyMjExMTZfMTQz/MDAxNjY4NjAxNTQzNDYw.dZzc1TIxWmITM_5uildryLFGXFwgjx0ahbrf9DXCEZ0g.xTwwfY8Je-4zuVM3FbIm2WDtEY0b9YSimgX4RM6MCsEg.JPEG.gngnt2002/%EF%BB%BF%EC%9A%B0%EB%8A%94_%EA%B3%A0%EC%96%91%EC%9D%B4_%EC%A7%A4_%EB%AA%A8%EC%9D%8C_(4).jpg?type=w800" },
        { id: 9, title: "그냥 사라지고 싶다는 생각이 자주 들어요", author: "익명", date: "2025-05-09", views: 47 },
        { id: 8, title: "미래가 너무 막막해서 무서워요", author: "익명", date: "2025-05-08", views: 33, imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIJ2B3kX3bAh4NYcgHmuDVHDjt3AxpQJjvKw&s" },
        { id: 7, title: "누군가에게 의미 있는 사람이 되고 싶어요", author: "익명", date: "2025-05-07", views: 28 },
        { id: 6, title: "SNS 속 나는 가짜 같아요", author: "익명", date: "2025-05-06", views: 39 },
        { id: 5, title: "자존감이 점점 낮아져요", author: "익명", date: "2025-05-05", views: 32, imgUrl: "https://mblogthumb-phinf.pstatic.net/MjAyMjExMTZfMjYx/MDAxNjY4NjAxNTQzODcz.tRQa3wRkWURAgSonPag7uhSW36336w6o4zKdvQiFOFUg.Mf2SuR42X0IOV8biEh-tFgC_6YE8reIF8YDohv5Ar3Mg.JPEG.gngnt2002/%EF%BB%BF%EC%9A%B0%EB%8A%94_%EA%B3%A0%EC%96%91%EC%9D%B4_%EC%A7%A4_%EB%AA%A8%EC%9D%8C_(8).jpg?type=w800" },
        { id: 4, title: "밤마다 걱정이 많아져서 잠이 안 와요", author: "익명", date: "2025-05-04", views: 36 },
        { id: 3, title: "무리 속에서도 혼자인 느낌 들어요", author: "익명", date: "2025-05-03", views: 19 },
        { id: 2, title: "나도 남들처럼 살고 싶어요", author: "익명", date: "2025-05-02", views: 25 },
        { id: 1, title: "익명이라 말해요, 저 지금 우울해요", author: "익명", date: "2025-05-01", views: 51, imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPqC-w86RQ5lEBg29R9dBdxYdzmdqVULlKMw&s" }
      ];
      
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const popularSecrets = dummySecrets.filter(secret => secret.views >= 40).sort((a, b) => b.views - a.views);
  const normalSecrets = dummySecrets.filter(secret => secret.views < 40).sort((a, b) => b.id - a.id);
  const sortedSecrets = [...popularSecrets, ...normalSecrets];

  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleSecrets = sortedSecrets.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(sortedSecrets.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="SecretBoardBox">
      <div className="secret-header">
        <h2 className="secret-title">비밀게시판</h2>
        {/* <Link to="/main/secret/write" className="write-button">글쓰기</Link> */}
      </div>

      <div className="secret-list">
        {visibleSecrets.map((secret) => (
          <div key={secret.id} className="secret-list-item">
            {secret.imgUrl && (
              <img
                src={secret.imgUrl}
                alt="썸네일"
                className="secret-thumbnail"
              />
            )}
            <div className="secret-list-content">
              <Link to={`/main/secret/${secret.id}`} className="secret-title-link">
                {secret.title}
                {secret.views >= 40 && (
                  <span className="hot-badge">인기</span>
                )}
              </Link>
              <div className="secret-meta">
                {secret.author} | {secret.date} | 조회 {secret.views}
              </div>
            </div>
          </div>
        ))}
      </div>

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

export default SecretBoardBox;
