import { useState } from "react"
import "./Friends.css"

const Friends = () =>{

    const [isOpen, setIsOpen] = useState(false)
    
        const sampleFriends = [
            "진수연",
            "김태희",
            "최경철",
            "구찌",
            "이영찬"
        ]


    return(
        <div className="Friends-Container">

        <button className="Friends-Button" onClick={() => setIsOpen(!isOpen)}>
            😊 팔로워{isOpen ? "🔺" : "🔻"}
        </button>
        {isOpen && (
            <ul className="Friends-List">
            {sampleFriends.map((friend, index) => (
                <li key={index} className="Friends-Item">{friend}</li>
            ))}
        </ul>
        )}
    </div>
    )
}


export default Friends