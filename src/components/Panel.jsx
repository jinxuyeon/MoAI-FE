
import "./Panel.css"
import Favorites from "./Favorites"
import Friends from "./Friends"
const Panel = ({ username }) => {


    return (
        <div className="Panel-Container">

            
            <button className="profile-button">프사</button>

            <h2>{username}</h2>

            <Favorites />
            <hr />
            <Friends />
            <hr />
            <div>캘린더</div>
        </div>
    )

}


export default Panel