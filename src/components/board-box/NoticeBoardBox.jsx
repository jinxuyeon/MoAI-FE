import "./NoticeBoardBox.css";

const NoticeBoardBox = () => {
    // 테스트용 공지사항 데이터
    const dummyNotices = [
        { id: 1, title: "공지사항 1", date: "2025-04-01" },
        { id: 2, title: "시스템 점검 안내", date: "2025-04-05" },
        { id: 3, title: "신규 기능 추가", date: "2025-04-07" },
        { id: 4, title: "휴무 안내", date: "2025-04-10" },
    ];

    return (
        <div className="NoticeBoardBox">
            <h2 className="notice-title">공지사항</h2>
            <ul className="notice-list">
                {dummyNotices.map((notice) => (
                    <li key={notice.id} className="notice-item">
                        <span className="notice-item-title">{notice.title}</span>
                        <span className="notice-item-date">{notice.date}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NoticeBoardBox;
