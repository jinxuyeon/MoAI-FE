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

          {/* 학과 공지 */}
          <div>
            <div className="title-container">
              <Volume2 size={20} color="var(--normal-text-color)" />
              <h3>From the Office</h3>
            </div>
            <section className="inner-container">
              <BasicBoard title="학과 사무실에서 알려드립니다" posts={postsSummary.Posts_notice_c} type={"NOTICE_C"} />
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

          {/* ✅ 커뮤니티 영역 InfoBox로 대체 */}
          <div>
            <section className="inner-container">
              <InfoBox
                data={{
                  자유게시판: postsSummary.Posts_free,
                  비밀게시판: postsSummary.Posts_secret,
                  조교가말한다: postsSummary.Posts_notice,
                  후기: postsSummary.Posts_review,
                }}
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
