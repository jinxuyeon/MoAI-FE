import "./Dashboard.css";
import JobInfoBoard from "./JobInfoBoard";
import BookMarketBoard from "./BookMarketBoard";
import BasicBoard from "./BasicBoard";
import { House, Volume2 } from "lucide-react";
import { ShoppingCart } from "lucide-react";
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
                            <Volume2 size={20} color="var(--normal-text-color)" />
                            <h3>From the Office</h3>
                        </div>
                        <BasicBoard type={"NOTICE_C"} title={"학과사무실에서 알려드립니다"} />
                    </section>
                    <section className="inner-container">
                        <h3>Join the Conversation</h3>
                        <section className="div-container">
                            <div className="half-board-area">
                                <BasicBoard type={"FREE"} title={"자유게시판"} />
                            </div>
                            <div className="half-board-area">
                                <BasicBoard type={"SECRET"} title={"비밀게시판"} />
                            </div>
                        </section>

                        <section className="div-container">
                            <div className="half-board-area">
                                <BasicBoard type={"FREE"} title={"선배님 고민있어으예 ~"} />
                            </div>
                            <div className="half-board-area">
                                <BasicBoard type={"FREE"} title={"취업, 면접 후기"} />
                            </div>
                        </section>
                    </section>
                </div>

                <div className="rightside-container">
                    <JobInfoBoard />
                    <div className="inner-container">
                        <div className="title-container">
                            <ShoppingCart size={20} color="var(--normal-text-color)" />
                            <h3>Find the items you need</h3>
                        </div>
                        <BookMarketBoard type={"MARKET"} title={"장터"} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
