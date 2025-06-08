import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "./LectureBoardPage.css";
import { useState, useEffect } from "react";
import LectureMainbox from "../components/LectureMainbox";
import { findLectureById } from "../components/utils/lectureUtils";
import ProfileTemplate from "../components/ProfileTemplate";

const dummyData = {
  질문: [
    {
      title: "질문입니다",
      writerNickname: "학생A",
      createdDate: "2025-06-01",
      viewCount: 5,
      thumbnailUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSREALx6wkLmmRB8XmM59g-lUM2JATWOw2Qag&s",
    },
    {
      title: "이 부분이 헷갈려요",
      writerNickname: "학생B",
      createdDate: "2025-06-02",
      viewCount: 10,
    },
  ],
  후기: [
    {
      title: "좋은 강의였습니다",
      writerNickname: "학생C",
      createdDate: "2025-06-01",
      viewCount: 20,
      thumbnailUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSREALx6wkLmmRB8XmM59g-lUM2JATWOw2Qag&s",
    },
  ],
  자료실: [
    {
      title: "강의자료 공유합니다",
      writerNickname: "학생D",
      createdDate: "2025-06-03",
      viewCount: 7,
      thumbnailUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSREALx6wkLmmRB8XmM59g-lUM2JATWOw2Qag&s",
    },
  ],
  공지사항: [
    {
      title: "다음 주 시험 일정 안내",
      writerNickname: "조교",
      createdDate: "2025-06-04",
      viewCount: 100,
      thumbnailUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSREALx6wkLmmRB8XmM59g-lUM2JATWOw2Qag&s",
    },
  ],
};

const quotes = [
  "성공은 작은 노력들이 반복될 때 이루어진다. – 로버트 콜리어",
  "지금 하는 일이 미래를 만든다. – 마하트마 간디",
  "할 수 있다고 믿으면 이미 반은 이룬 것이다. – 시어도어 루스벨트",
  "행동은 모든 성공의 기초다. – 파블로 피카소",
  "오늘 걷지 않으면 내일 뛰어야 한다. – 한국 속담",
  "남들과 비교하지 말고 어제의 나와 비교하라. – 조던 피터슨",
  "무엇이든 믿으면 이루어진다. – 나폴레온 힐",
  "노력은 배신하지 않는다. – 이나모리 가즈오",
  "실패는 성공의 어머니다. – 고사성어",
  "꿈을 크게 가져라. 그 꿈이 너를 이끈다. – 노먼 빈센트 필",
  "삶이란 자전거 타기와 같다. 균형을 잡으려면 움직여야 한다. – 아인슈타인",
  "가장 어두운 밤도 결국 끝나고 해는 떠오른다. – 빅터 위고",
  "변화는 고통을 동반하지만, 성장은 그 안에 있다.",
  "늦었다고 생각할 때가 진짜 시작할 때다. – 속담",
  "작은 성취에 감사할 줄 아는 사람은 큰 성공도 얻는다."
];

const postData = {
  currentPage: 0,
  totalPages: 2,
};

const LectureBoardPage = () => {
  const { lectureId } = useParams();
  const navigate = useNavigate();
  const lecture = findLectureById(Number(lectureId));

  const [selectedTab, setSelectedTab] = useState("질문");
  const [posts, setPosts] = useState([]);
  const [weeklyStats] = useState({ 질문: 2, 후기: 1, 자료실: 1, 공지사항: 1 });

  const [cheerMessage, setCheerMessage] = useState("");
  const [fade, setFade] = useState(false);

  useEffect(() => {
    setPosts(dummyData[selectedTab] || []);
  }, [selectedTab]);

  useEffect(() => {
    const changeQuote = () => {
      setFade(false);
      setTimeout(() => {
        const random = quotes[Math.floor(Math.random() * quotes.length)];
        setCheerMessage(random);
        setFade(true);
      }, 300);
    };
    changeQuote();
    const interval = setInterval(changeQuote, 6000);
    return () => clearInterval(interval);
  }, []);

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
      <div className="lecture-board-container">
        <div className="lecture-main-content">
          <div className="lecture-header">
            <div className="lecture-title-wrapper">
              <h2 className="lecture-title">{lecture.title} 강의게시판</h2>
              <span className="lecture-professor">{lecture.professor} 교수님</span>
            </div>
          </div>

          <div className="content-container">
            <section className="main-area">
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
                  <button
                    className="lecture-write-button"
                    onClick={() => navigate(`/main/lecture/${lectureId}/write`)}
                  >
                    글쓰기
                  </button>
                </div>
              </div>
              {posts.length === 0 ? (
              <p className="no-posts">게시글이 없습니다.</p>
            ) : (
              <LectureMainbox
                posts={posts}
                postData={postData}
                handlePageChange={(newPage) => console.log("페이지 이동:", newPage)}
              />
            )}
            </section>

            <aside className="lecture-sidebar">
              <div className="dday-box">
                <div className="dday-header">
                  <div className="dday-left">
                    <div className="dday-name">오늘의 명언</div>
                    <div className={`dday-message ${fade ? "fade-in" : "fade-out"}`}>
                      {cheerMessage}
                    </div>
                  </div>
                </div>
              </div>

              <div className="activity-box">
                <h4>이번주 활동</h4>
                <ul>
                  <li>질문 {weeklyStats["질문"]}건</li>
                  <li>후기 {weeklyStats["후기"]}건</li>
                  <li>자료실 {weeklyStats["자료실"]}건</li>
                  <li>공지사항 {weeklyStats["공지사항"]}건</li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LectureBoardPage;
