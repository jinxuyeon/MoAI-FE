import BookMarketBoard from "./BookMarketBoard";
import DailyMenu from "./DailyMenu";
import "./Dashboard.css";
import InfoBox from "./InfoBox";
import QuickLinks from "./QuickLinks";
import { BookOpenCheck } from "lucide-react";
import { useState } from "react";
import StudentCouncilBanner from "./StudentCouncilBanner";
const Dashboard = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    return (
        <div className="Dashboard">
            <div className="Content-container">
                <div className="main-container">
                    <QuickLinks />
                    <div className="div-area info-area">
                        <section className="inner-container">
                            <InfoBox
                                boardTypes={[
                                    "NOTICE",
                                    "NOTICE_SC",
                                    "NOTICE_UNIV",
                                    "NOTICE_DEPT",
                                ]}
                                title="공지사항"
                            />
                        </section>
                        <section className="inner-container">
                            <InfoBox
                                boardTypes={["FREE", "SECRET", "REVIEW"]}
                                title="커뮤니티"
                            />
                        </section>
                    </div>

                    <section className="div-area">
                        <div className="benu">
                            <StudentCouncilBanner
                                title="학생회 이벤트"
                                description="이번 주 금요일 학생회에서 진행하는 간식 나눔 행사! 도서관 앞 광장에서 오후 2시부터 시작합니다 🎉"
                            />
                        </div>

                        <div className="benu">
                            <StudentCouncilBanner
                                title="안전교육 안내"
                                description="학우 여러분, 반드시 학교에서 진행하는 안전교육에 참여하세요. 미참여 시 불이익이 있을 수 있습니다."
                                link={"https://search.naver.com/search.naver?sm=tab_hty.top&where=nexearch&ssc=tab.nx.all&query=%EC%9D%B4%EA%B2%83%EC%9D%80+%EC%95%84%EC%A7%81+%EA%B5%AC%EB%9D%BC%EC%9E%85%EB%8B%88%EB%8B%A4&oquery=%ED%85%8C%EC%8A%A4%ED%8A%B8%EC%9A%A9&tqi=jKEHTdqX5mNssQg5GlossssssmZ-481318&ackey=exxyrxz4"}
                            />
                        </div>

                        <div className="benu">
                            <StudentCouncilBanner
                                title="설문조사 참여"
                                description="학교 설문조사 참여를 독촉합니다! 빠른 시일 내에 설문에 응답해주세요 📝"
                                link={"https://search.naver.com/search.naver?sm=tab_hty.top&where=nexearch&ssc=tab.nx.all&query=%EC%9D%B4%EA%B2%83%EC%9D%80+%EC%95%84%EC%A7%81+%EA%B5%AC%EB%9D%BC%EC%9E%85%EB%8B%88%EB%8B%A4&oquery=%ED%85%8C%EC%8A%A4%ED%8A%B8%EC%9A%A9&tqi=jKEHTdqX5mNssQg5GlossssssmZ-481318&ackey=exxyrxz4"}

                            />
                        </div>
                    </section>


                    <section className="div-area marketplace">
                        <header className="header-area">
                            <h1 className="title">
                                <BookOpenCheck /> 중고책 사고팔기
                            </h1>
                        </header>
                        <section className="content-area">
                            <BookMarketBoard title="장터" boardType="MARKET" />
                        </section>
                    </section>
                    <div className="daily-area desktop-only">
                        <DailyMenu selectedDate={selectedDate} />
                    </div>


                </div>
                {/* <aside>
          <ul>
            <li>
              <div>첫 번째 메뉴sdfㄴㅇㄴㅇㅇㅇㅇㅇㅇㄹㅇㄴsdfsdsdfsd</div>
            </li>
            <li>
              <div>두 번째
                <br />
                <br /> 메ㄹㅇㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴ뉴</div>
            </li>
          </ul>
        </aside> */}
            </div>
        </div>
    );
};

export default Dashboard;
