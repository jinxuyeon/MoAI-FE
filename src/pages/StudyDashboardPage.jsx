import Header from "../components/Header"
import Panel from "../components/Panel"
import StudyDashboard from "../components/StudyDashboard"
import "./StudyDashboardPage.css"

const StudyDashboardPage = () => {

    return (
    <div className="StudyDashboardPage">
        <Header title={"Dashbard-study"} />
        <div className="Panel-Dashboard-Container">
            <div className="Panel-container">
                <Panel mode="study" />
            </div>
            <div className="Dashboard-container">
                <StudyDashboard/>
            </div>
        </div>

    </div>

    )
}


export default StudyDashboardPage