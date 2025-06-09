import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "./LectureBoardPage.css";
import { useState, useEffect } from "react";
import axiosInstance from "../components/utils/AxiosInstance";
import ProfileTemplate from "../components/ProfileTemplate";
import PostPreviewBox from "../components/PostPreviewBox";

const tabList = ["질문", "후기", "자료실", "공지사항"];

const tabToTypeMap = {
  질문: "LECTURE_Q",
  후기: "LECTURE_R",
  자료실: "LECTURE_REF",
  공지사항: "LECTURE_N"
};
const postData = {
  currentPage: 0,
  totalPages: 2,
};

const LectureBoardPage = () => {
  const { lectureId } = useParams();
  const navigate = useNavigate();

  const [lecture, setLecture] = useState(null);
  const [selectedTab, setSelectedTab] = useState("질문");
  const [posts, setPosts] = useState([]);
  const [weeklyStats, setWeeklyStats] = useState({ 질문: 0, 후기: 0, 자료실: 0, 공지사항: 0 });
  const [cheerMessage, setCheerMessage] = useState("");
  const [fade, setFade] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLecture = async () => {
      try {
        const res = await axiosInstance.get(`/api/lecture-room/${lectureId}`);
        setLecture(res.data.data);
      } catch (err) {
        console.error("강의 정보 불러오기 실패", err);
        setError("강의 정보를 불러올 수 없습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchLecture();
  }, [lectureId]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postType = tabToTypeMap[selectedTab];
        const res = await axiosInstance.get("/api/lecture-room/posts", {
          params: { lectureId, type: postType },
        });
        setPosts(res.data.data);
      } catch (err) {
        console.error("게시글 불러오기 실패", err);
        setPosts([]);
      }
    };
    fetchPosts();
  }, [selectedTab, lectureId]);

  useEffect(() => {
    const quotes = [
      "성공은 작은 노력들이 반복될 때 이루어진다. – 로버트 콜리어",
      "지금 하는 일이 미래를 만든다. – 마하트마 간디",
      "할 수 있다고 믿으면 이미 반은 이룬 것이다. – 시어도어 루스벨트",
      "행동은 모든 성공의 기초다. – 파블로 피카소",
      "오늘 걷지 않으면 내일 뛰어야 한다. – 한국 속담",
    ];
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

  if (loading) {
    return (
      <div className="LectureBoardPage">
        <Header title="Community" />
        <div style={{ padding: "40px" }}>
          <h2>로딩 중...</h2>
        </div>
      </div>
    );
  }

  if (error || !lecture) {
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
              <h2 className="lecture-title">{lecture.title} </h2>
              <ProfileTemplate profileImageUrl={lecture.
                professorThumbnail
              } name={lecture.professorNickname} id={lecture.professorId} />
              <span className="lecture-professor">{lecture.professorName
              } 교수님</span>
            </div>
          </div>

          <div className="content-container">
            <section className="main-area">
              <div className="tab-and-write-row">
                <div className="tab-buttons">
                  {tabList.map((tab) => (
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
                    onClick={() => navigate(`/main/study-dashboard/${lectureId}/write`)}
                  >
                    글쓰기
                  </button>
                </div>
              </div>
              {posts.length === 0 ? (
                <p className="no-posts">게시글이 없습니다.</p>
              ) : (
                posts.map((post) => <PostPreviewBox key={post.id} post={post} />)
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