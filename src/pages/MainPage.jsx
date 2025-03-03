import Header from "../components/Header"
import Panel from "../components/Panel"
import Dashboard from "../components/Dashboard"
import "./Mainpage.css"
const MainPage = () => {
    return (
        <div className="MainPage">
            <div className="Header">
                <Header />
            </div>
            <div className="Container">
                <Panel />
                <Dashboard />
            </div>
        </div>
    )
}

export default MainPage