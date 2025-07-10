import "./Dashboard.css";
import JobInfoBoard from "./JobInfoBoard";
import BookMarketBoard from "./BookMarketBoard";
import BasicBoard from "./BasicBoard";
import { House, Volume2, ShoppingCart, BookOpen, LayoutList } from "lucide-react";
import axiosInstance from "./utils/AxiosInstance";
import { useEffect, useState } from "react";
import LectureRoomCard from "./LectureRoomCard";
import InfoBox from "./InfoBox";

const Dashboard = () => {
  const [postsSummary, setPostsSummary] = useState(null);

  const handleInitPosts = async () => {
    try {
      const res = await axiosInstance.get("/post/summary-multiple");
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
            <section className="inner-container">
              <InfoBox
                boardTypes={["NOTICE", "NOTICE_C"]} // 공지사항 관련 타입들
                title="공지사항"
              />
            </section>
          </div>

          <div className="div-area">
            <section className="inner-container">
              <LectureRoomCard />
            </section>

            <div className="inner-container">
              <BookMarketBoard title="장터" posts={postsSummary.Posts_market} type={"MARKET"} />
            </div>
          </div>

          <div>
            <section className="inner-container">
              <InfoBox
                boardTypes={["FREE", "SECRET", "REVIEW"]} // 커뮤니티 게시판 타입들
                title="커뮤니티"
              />
            </section>
          </div>
        </div>

        {/* 오른쪽 사이드바 */}
        <div className="rightside-container">
          <JobInfoBoard />

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
