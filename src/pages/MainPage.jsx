import Header from "../components/Header";
import Panel from "../components/Panel";
import Dashboard from "../components/Dashboard";
import "./Mainpage.css";
const MainPage = () => {

    return (
        <div className="MainPage">
            <Header title={"Dashborad"} />
            <div className="Panel-Dashboard-Container">
                <div className="Panel-container">
                    <Panel />
                </div>
                <div className="Dashboard-container">
                    <Dashboard />
                </div>
            </div>
        </div>
    );
};

export default MainPage;
