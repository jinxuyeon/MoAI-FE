import { useState } from "react";
import "./MyActivities.css"





const MyActivities = () => {
    const [activeTab, setActiveTab] = useState("posts");

    return (
        <div className="MyActivities">
            <section>
                <div className="activity-tabs">
                    <button
                        className={
                            activeTab === "posts" ? "active" : ""
                        }
                        onClick={() => setActiveTab("posts")}
                    >
                        작성글
                    </button>
                    <button
                        className={
                            activeTab === "comments" ? "active" : ""
                        }
                        onClick={() => setActiveTab("comments")}
                    >
                        작성댓글
                    </button>
                </div>
                <div className="activity-content">
                    {activeTab === "posts" && (
                        <div
                            className="box checklist-box"
                            style={{ minHeight: "100px" }}
                        >
                            작성글 박스
                        </div>
                    )}
                    {activeTab === "comments" && (
                        <div
                            className="box checklist-box"
                            style={{ minHeight: "100px" }}
                        >
                            작성댓글 박스
                        </div>
                    )}
                </div>
            </section>

        </div>
    )

}


export default MyActivities