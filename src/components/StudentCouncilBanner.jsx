import "./StudentCouncilBanner.css";

const StudentCouncilBanner = () => {
  return (
    <div className="student-council-banner">
      {/* 왼쪽: 포스터 */}
      <div className="banner-poster">
        {/* 더미 이미지 */}
        <img
          src="https://via.placeholder.com/150x200.png?text=Poster"
          alt="학생회 포스터"
        />
      </div>

      {/* 오른쪽: 내용 */}
      <div className="banner-content">
        <h2 className="banner-title">학생회 이벤트</h2>
        <p className="banner-description">
          이번 주 금요일 학생회에서 진행하는 간식 나눔 행사! <br />
          도서관 앞 광장에서 오후 2시부터 시작합니다 🎉
        </p>
      </div>
    </div>
  );
};

export default StudentCouncilBanner;
