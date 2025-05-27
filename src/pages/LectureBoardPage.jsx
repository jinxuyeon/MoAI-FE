import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import "./LectureBoardPage.css";
import { useState, useEffect } from "react";
import { Book } from "lucide-react";
import { useNavigate } from "react-router-dom"; 

const calculateDday = (targetDateStr) => {
    const today = new Date();
    const target = new Date(targetDateStr);
    const diffTime = target - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 ? `D-${diffDays}` : `D+${Math.abs(diffDays)}`;
};

// 임시 사용자 ID (로그인 연동 시 수정 필요)
const userId = "user123";

const lectureList = [
    { id: 1, title: "운영체제", professor: "김운영" },
    { id: 2, title: "자료구조", professor: "이자료" },
    { id: 3, title: "데이터베이스", professor: "박데이터" },
    { id: 4, title: "캡스톤디자인", professor: "최캡스톤" },
    { id: 5, title: "영상처리", professor: "김영상" },
    { id: 6, title: "데이터 처리", professor: "김데이터" },
    { id: 7, title: "신호처리", professor: "최캡스톤" },
    { id: 8, title: "보안체제", professor: "최캡스톤" },
    { id: 9, title: "해양데이터통신", professor: "최캡스톤" },
    { id: 10, title: "c언어", professor: "최캡스톤" },
    { id: 11, title: "네트워크 구조", professor: "최캡스톤" },
    { id: 12, title: "알고리즘 설계", professor: "최캡스톤" },
    { id: 13, title: "선형대수학", professor: "최캡스톤" },
];

const dummyPosts = {
    질문: ["운영체제 질문입니다", "디스크 스케줄링이 뭐죠?"],
    후기: ["좋은 강의였어요!", "교수님 설명이 명확해요"],
    자료실: ["수업 PPT 자료", "과제 예시 코드"],
    공지사항: ["중간고사 공지", "과제 제출 안내"],
};

const LectureBoardPage = () => {
    const { lectureId } = useParams();
    const navigate = useNavigate();
    const lecture = lectureList.find((lec) => String(lec.id) === String(lectureId));
    const [selectedTab, setSelectedTab] = useState("질문");

    const [showInputForm, setShowInputForm] = useState(false);
    const [eventName, setEventName] = useState("중간고사");
    const [eventDate, setEventDate] = useState(() => {
        const d = new Date();
        d.setDate(d.getDate() + 14);
        return d.toISOString().split("T")[0];
    });

    useEffect(() => {
        const fetchDday = async () => {
            try {
                const res = await fetch(`/api/dday/${userId}/${lectureId}`);
                const data = await res.json();
                if (data) {
                    setEventName(data.name);
                    setEventDate(data.date);
                }
            } catch (error) {
                console.error("D-Day 불러오기 오류:", error);
            }
        };

        fetchDday();
    }, [lectureId]);

    const handleSave = async () => {
        const payload = {
            userId,
            lectureId,
            name: eventName,
            date: eventDate,
        };

        try {
            const res = await fetch("/api/dday", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const result = await res.json();
            if (result.success) {
                alert("D-Day가 저장되었습니다!");
                setShowInputForm(false);
            }
        } catch (error) {
            console.error("D-Day 저장 오류:", error);
        }
    };

    if (!lecture) {
        return (
            <div className="LectureBoardPage">
                <Header title="Community" />
                <div style={{ padding: "40px" }}>
                    <h2>❌ 강의 정보를 불러올 수 없습니다.</h2>
                    <p>lectureId: {lectureId}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="LectureBoardPage">
            <Header title="Community" />

            <div className="lecture-board-container">
                <div className="lecture-sidebar-left">
                    <h3 className="sidebar-title">
                        <Link to="/main/community/lecture" className="lecture-sidebar-link">
                            <Book size={18} style={{ marginRight: "6px", verticalAlign: "middle" }} />
                            내 강의 목록
                        </Link>
                    </h3>

                    <ul className="lecture-list">
                        {lectureList.map((lec) => (
                            <li key={lec.id}>
                                <Link to={`/main/lecture/${lec.id}`} className="lecture-link">
                                    {lec.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="lecture-main-content">
                    <div className="lecture-header">
                        <div className="lecture-title-wrapper">
                            <h2 className="lecture-title">{lecture.title} 강의게시판</h2>
                            <span className="lecture-professor">{lecture.professor} 교수님</span>
                        </div>
                    </div>

                    <div className="tab-and-write-row">
                        <div className="tab-buttons">
                            {["질문", "후기", "자료실", "공지사항"].map((tab) => (
                                <button
                                    key={tab}
                                    className={`tab-button ${selectedTab === tab ? "active-tab" : ""}`}
                                    onClick={() => setSelectedTab(tab)}
                                >
                                    {tab}
                                </button>
                            ))}
                            <button className="lecture-write-button"
                            onClick={() => navigate(`/main/lecture/${lectureId}/write`)}
                            >
                                글쓰기</button>
                        </div>
                    </div>

                    <div className="lecture-content-wrapper">
                        <div className="lecture-main-box">
                            {dummyPosts[selectedTab]?.length > 0 ? (
                                <ul>
                                    {dummyPosts[selectedTab].map((post, index) => (
                                        <li key={index} style={{ marginBottom: "12px" }}>
                                            📌 {post}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="placeholder-text">게시글이 없습니다.</p>
                            )}
                        </div>

                        <div className="lecture-sidebar">
                            <div className="dday-box">
                                <div className="dday-header">
                                    <div className="dday-left">
                                        <div className="dday-name">{eventName}</div>
                                        <div className="dday-message">오늘도 화이팅 🍀</div>
                                    </div>
                                    <div className="dday-right">
                                        <div className="dday-number">{calculateDday(eventDate)}</div>
                                        <button
                                            className="dday-add-button"
                                            onClick={() => setShowInputForm(!showInputForm)}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                {showInputForm && (
                                    <div className="dday-input-form">
                                        <input
                                            type="text"
                                            placeholder="일정 이름"
                                            value={eventName}
                                            onChange={(e) => setEventName(e.target.value)}
                                        />
                                        <input
                                            type="date"
                                            value={eventDate}
                                            onChange={(e) => setEventDate(e.target.value)}
                                        />
                                        <button className="dday-save-button" onClick={handleSave}>
                                            저장
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="activity-box">
                                <h4>이번주 활동</h4>
                                <ul>
                                    <li>질문 5건</li>
                                    <li>후기 2건</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LectureBoardPage;
