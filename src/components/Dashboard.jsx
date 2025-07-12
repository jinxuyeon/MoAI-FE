import "./Dashboard.css";
import BookMarketBoard from "./BookMarketBoard";
import InfoBox from "./InfoBox";
import LectureRoomCard from "./cards-widget/LectureRoomCard";
import MyPageCard from "./cards-widget/MyPageCard";

const Dashboard = () => {
  return (
    <div className="Dashboard">
      <div className="Content-container">
        <div className="main-container">
          <div className="div-area info-area">
            <section className="inner-container">
              <InfoBox boardTypes={["NOTICE", "NOTICE_C"]} title="공지사항" />
            </section>
            <section className="inner-container">
              <InfoBox
                boardTypes={["FREE", "SECRET", "REVIEW"]}
                title="커뮤니티"
              />
            </section>
          </div>

          <div className="div-area">
            <div className="left-half">
              <section className="inner-container">
                <MyPageCard />
              </section>
              <section className="inner-container">
                <LectureRoomCard />
              </section>
            </div>
            <div className="right-half">
              <section className="inner-container">
                <BookMarketBoard title="장터" boardType="MARKET" />
              </section>
            </div>
          </div>

        </div>
        <aside>
          <ul><div>
            <li>첫 번째 메뉴<br />sdfsdfsdsdfsd</li>
          </div>
          <div>
            <li>두 번째 메뉴</li>

          </div>
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default Dashboard;
