import "./Dashboard.css";
import NoticeBoard from "./NoticeBoard";
import JobInfoBoard from "./JobInfoBoard";
import BookMarketBoard from "./BookMarketBoard";
import FreeBoard from "./FreeBoard";
import { House, Volume2 } from "lucide-react";
const Dashboard = () => {
    return (
        <div className="Dashboard">
            <div className="Content-container">
                <div className="main-container">
                    <div className="title-container">
                        <House size={32} />
                        <h1>Home</h1>
                    </div>
                    
                    <section className="inner-container">
                        <div className="title-container">
                            <Volume2 size={20} color="var(--normal-text-color)"/>
                        <h3>From the Office</h3>
                        </div>
                        <NoticeBoard />
                    </section>
                    <section className="inner-container">
                        <h3>Join the Conversation</h3>
                        <section className="div-container">
                            <div className="half-board-area">
                                <FreeBoard />
                            </div>
                            <div className="half-board-area">
                                <FreeBoard />
                            </div>
                        </section>

                        <section className="div-container">
                            <div className="half-board-area">
                                <FreeBoard />
                            </div>
                            <div className="half-board-area">
                                <FreeBoard />
                            </div>
                        </section>
                    </section>
                    <section className="inner-container">
                        <h3>Additional Resources</h3>
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
