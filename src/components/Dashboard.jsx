import "./Dashboard.css";
import JobInfoBoard from "./JobInfoBoard";
import BookMarketBoard from "./BookMarketBoard";
import BasicBoard from "./BasicBoard";
import { House, Volume2, ShoppingCart, BookOpen, LayoutList } from "lucide-react";
import axiosInstance from "./utils/AxiosInstance";
import { useEffect, useState } from "react";
import LectureRoomCard from "./LectureRoomCard";

const Dashboard = () => {
  const [postsSummary, setPostsSummary] = useState(null);

  const handleInitPosts = async () => {
    try {
      const res = await axiosInstance.get("/api/post/summary-multiple");
      setPostsSummary(res.data);
    } catch (err) {
      console.error("❌ 게시판 요약 데이터 요청 실패:", err);
    }
  };

  useEffect(() => {
    handleInitPosts();
  }, []);

  if (!postsSummary) return <div className="Dashboard">로딩 중...</div>;

  return (
    <div className="Dashboard">
      <div className="Content-container">
        <div className="main-container">
          <div className="title-container">
            <House size={32} />
            <h1>Home</h1>
          </div>

          <div>
            <div className="title-container">
              <Volume2 size={20} color="var(--normal-text-color)" />
              <h3>From the Office</h3>
            </div>
            <section className="inner-container">
              <BasicBoard title="학과 사무실에서 알려드립니다" posts={postsSummary.Posts_notice_c} type={"NOTICE_C"} />
            </section>
          </div>
          <div>

            <div className="lectureCard-container">
            <div className="title-container">
              <BookOpen size={20} color="var(--normal-text-color)" />
              <h3>Start Learning</h3>
            </div>
            <section className="inner-container">
              <LectureRoomCard />
            </section>
          </div>

          </div>
          

          <div>
            <div className="title-container">
              <LayoutList size={20} color="var(--normal-text-color)" />
              <h3>Share and Discover Ideas</h3>
            </div>
            <section className="inner-container">
              <section className="div-container">
                <div className="half-board-area">
                  <BasicBoard title="조교가 말한다" posts={postsSummary.Posts_notice} type={"NOTICE"} />
                </div>
                <div className="half-board-area">
                  <BasicBoard title="비밀게시판" posts={postsSummary.Posts_secret} type={"SECRET"} />
                </div>
              </section>

              <section className="div-container">
                <div className="half-board-area">
                  <BasicBoard title="자유게시판" posts={postsSummary.Posts_free} type={"FREE"} />
                </div>
                <div className="half-board-area">
                  <BasicBoard title="취업, 면접 후기" posts={postsSummary.Posts_review} type={"REVIEW"} />
                </div>
              </section>
            </section>
          </div>
        </div>

        <div className="rightside-container">
          <JobInfoBoard />
           <div>
            <div className="title-container">
              <ShoppingCart size={20} color="var(--normal-text-color)" />
              <h3>Find the items you need</h3>
            </div>
            <div className="inner-container">
              <BookMarketBoard title="장터" posts={postsSummary.Posts_market} type={"MARKET"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
