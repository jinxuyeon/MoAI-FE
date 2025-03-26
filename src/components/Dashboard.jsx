import "./Dashboard.css";
import NormalBoard from "./NormalBoard";
import JobInfoBoard from "./JobInfoBoard";
import BookMarketBoard from "./BookMarketBoard";
const Dashboard = () => {
    return (
        <div className="Dashboard">
            <div className="Content-container">
                <div className="main-container">

                    <section className="board-area">
                        
                        <NormalBoard />
                    </section>

                    <section className="div-container">
                        <div className="half-board-area">
                            <NormalBoard />
                        </div>
                        <div className="half-board-area">
                            <NormalBoard />
                        </div>
                    </section>

                    <section className="div-container">
                        <div className="half-board-area">
                            <NormalBoard />
                        </div>
                        <div className="half-board-area">
                            <NormalBoard />
                        </div>
                    </section>
                    <section className="board-area">
                        {/*장터터 게시판-세윤
                        section밖 코드는 건들 노노노*/}
                        <BookMarketBoard />
                    </section>
                </div>

                <div className="rightside-container">
                     {/*공지사항 게시판-윤주
                        section밖 코드는 건들 노노노*/}
                    <JobInfoBoard />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
