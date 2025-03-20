import Header from "../components/Header"
import Panel from "../components/Panel"
import Dashboard from "../components/Dashboard"
import "./Mainpage.css"
const MainPage = () => {


    return (
        <div className="MainPage">
            <Header title={"Dashborad"} />
            <div className="Panel-Dashboard-Container">
                    <Panel />
                    <Dashboard />
            </div>
        </div>
    )
}

export default MainPage