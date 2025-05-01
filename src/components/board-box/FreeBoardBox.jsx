import "./FreeBoardBox.css";

const FreeBoardBox = () => {
    // 테스트용 자유게시판 데이터
    const dummyPosts = [
        { id: 1, title: "오늘 날씨 진짜 좋네요 ☀️", date: "2025-05-01" },
        { id: 2, title: "프론트엔드 공부 어떻게 시작했어요?", date: "2025-04-30" },
        { id: 3, title: "컴공 시험 범위 아시는 분?", date: "2025-04-29" },
        { id: 4, title: "자취 꿀템 추천좀 해주세요", date: "2025-04-28" },
        { id: 5, title: "헬스장 같이 다니실 분 구해요", date: "2025-04-27" }
    ];

    return (
        <div className="FreeBoardBox">
            <h2 className="notice-title">자유게시판</h2>
            <ul className="notice-list">
                {dummyPosts.map((post) => (
                    <li key={post.id} className="notice-item">
                        <span className="notice-item-title">{post.title}</span>
                        <span className="notice-item-date">{post.date}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FreeBoardBox;
