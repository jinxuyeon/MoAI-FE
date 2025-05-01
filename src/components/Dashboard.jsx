import "./Dashboard.css";
import NoticeBoard from "./NoticeBoard";
import JobInfoBoard from "./JobInfoBoard";
import BookMarketBoard from "./BookMarketBoard";
import FreeBoard from "./FreeBoard";
const Dashboard = () => {
    return (
        <div className="Dashboard">
            <div className="Content-container">
                <div className="main-container">

                    <section className="board-area">
                        <NoticeBoard />
                    </section>
                    <section className="div-container">
                        <div className="half-board-area">
                            <FreeBoard />
                        </div>
                        <div className="half-board-area">
                            <NoticeBoard />
                        </div>
                    </section>
                    <section className="board-area">
                        <NoticeBoard />
                    </section>
                    <section className="board-area">
                        <NoticeBoard />
                    </section>
                    <section className="board-area">
                        <NoticeBoard />
                    </section>
                    <section className="board-area">
                        <NoticeBoard />
                    </section>
                </div>

                <div className="rightside-container">
                    <JobInfoBoard />
                    <BookMarketBoard />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
