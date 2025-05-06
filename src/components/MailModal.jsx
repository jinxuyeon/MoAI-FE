import { useState } from "react";
import "./MailModal.css";
import axiosInstance from "./utils/AxiosInstance";
import InputBox from "./InputBox";

const MailModal = ({ setOpenModal }) => {
    const [studentId, setStudentId] = useState("");
    const [result, setResult] = useState("");
    const [activeTab, setActiveTab] = useState("send");
    const [friendList, setFriendList] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axiosInstance.get(`/api/friend/search?studentId=${studentId}`);
            setResult(response.data);
        } catch (error) {
            console.error("검색 실패:", error);
            setResult(error.response?.data?.message || "검색 중 오류 발생");
        }
    };

    const handleTabChange = async (tab) => {
        setActiveTab(tab);
        if (tab === "receive") {
            try {
                const response = await axiosInstance.get("/api/friend/my-friends");
                const { acceptMemberDtoList } = response.data;
                setFriendList(acceptMemberDtoList || []);
            } catch (error) {
                console.error("친구 목록 가져오기 실패:", error);
                setFriendList([]);
            }
        }
    };

    // ✅ 채팅방 생성 요청
    const createMailRoom = async (username) => {
        try {
            const response = await axiosInstance.post(`/api/mail/new?username=${username}`);
            alert("채팅방이 생성되었습니다.");
            setOpenModal(false);
        } catch (error) {
            console.error("채팅방 생성 실패:", error);
            alert("채팅방 생성에 실패했습니다.");
        }
    };

    return (
        <div className="Modal">
            <div className="Overlay">
                <div className="container">
                    <div className="header">
                        <h3>📝대화 추가</h3>
                        <button className="request-btn" onClick={() => handleTabChange("send")}>
                            검색
                        </button>
                        <button className="request-btn" onClick={() => handleTabChange("receive")}>
                            친구목록
                        </button>
                        <button
                            style={{ backgroundImage: "url('/icons/exit-image.svg')" }}
                            className="exit-btn"
                            type="button"
                            onClick={() => setOpenModal(false)}
                        ></button>
                    </div>

                    {activeTab === "send" ? (
                        <section>
                            <div className="search-box">
                                <InputBox
                                    state={studentId}
                                    setStateFunction={setStudentId}
                                    onClickFunction={handleSearch}
                                    placeholder={"학번으로 친구를 찾아보세요"}
                                />
                            </div>
                            <div className="request-container">
                                {result && result.username ? (
                                    <>
                                        <div className="search-result-profile">
                                            <img
                                                src={result.profileImageUrl || "/default-profile.png"}
                                                alt="프로필"
                                                className="profile-img"
                                            />
                                            <p>{result.name} ({result.username})</p>
                                        </div>
                                        <button className="request-btn" onClick={() => createMailRoom(result.username)}>
                                            +채팅방 생성
                                        </button>
                                    </>
                                ) : (
                                    <p>{result}</p>
                                )}
                            </div>
                        </section>
                    ) : (
                        <div className="requests-box">
                            {friendList.length > 0 ? (
                                friendList.map((friend, index) => (
                                    <div className="request-container" key={index}>
                                        <div className="search-result-profile">
                                            <img
                                                src={friend.profileImageUrl || "/default-profile.png"}
                                                alt="프로필"
                                                className="profile-img"
                                            />
                                            <span>{friend.name} ({friend.username})</span>
                                        </div>
                                        <button className="request-btn" onClick={() => createMailRoom(friend.username)}>
                                            +채팅방 생성
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p>친구가 없습니다.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MailModal;
