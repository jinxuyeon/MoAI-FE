import "./Dashboard.css"
import NormalBoard from "./NormalBoard"
import BookMarketBoard from "./BookMarketBoard"

const Dashboard = () => {

    return (
        <div className="Dashboard">
            <div className="Content-Content">
              <NormalBoard/>
              <NormalBoard/>
            </div>
        </div>
    )
}


export default Dashboard