import "./FriendModal.css";
import { useState } from "react";
import axiosInstance from "./utils/AxiosInstance";
import InputBox from "./InputBox";
import Reddot from "./Reddot";

const FriendModal = ({
    setOpenModal,
    hasFriendRequest,
    requestMemberList,
    fetchMyFriendInfo,
    setHasFriendrequest,
    setRequestMemberList,
    count
}) => {
    const [studentId, setStudentId] = useState("");
    const [result, setResult] = useState("");
    const [activeTab, setActiveTab] = useState("send");
    const myUsername = localStorage.getItem("username");
    const id = localStorage.getItem("id");

    const handleSearch = async () => {
        try {
            const response = await axiosInstance.get(
                `/api/friend/search?studentId=${studentId}`
            );
            setResult(response.data);
            if (response.status === 200) {
                setResult(response.data); // 정상적인 데이터 처리
            }
        } catch (error) {
            console.error("검색 실패:", error);
            setResult(error.response.data.message);
        }
    };

    const HandleAddFriend = async () => {
        try {
            const response = await axiosInstance.post(
                "/api/friend/add-friend",  // ⬅️ id 제거된 URL
                { studentId: studentId }   // 요청 바디만 전달
            );
            if (response.status === 200) {
                setResult("친구 추가 요청이 전송되었습니다.");
            }
        } catch (error) {
            console.error("친구 요청 실패:", error);
            setResult(error.response?.data?.message || "요청 실패");
        }
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab); // "search" or "requests"
    };

    const handleDecline = async (idToDecline) => {
        try {
            const response = await axiosInstance.post(
                `/api/friend/decline-friend`,
                { idToDecline }
            );
            if (response.status === 200) {
                console.log(`${idToDecline} 친구요청 거절 완료`);
                setRequestMemberList(prev =>
                    prev.filter(request => request.id !== idToDecline)
                );
            }
        } catch (error) {
            console.error("친구 요청 거절 실패:", error);
        }
    };

    const handleAccept = async (idToAccept) => {
        try {
            const response = await axiosInstance.post(
                `/api/friend/accept-friend`, // ✅ id 제거
                { idToAccept } // 또는 { idToAccept: idToAccept }
            );
            if (response.status === 200) {
                console.log(`${idToAccept} 친구요청 수락 완료`);
                setRequestMemberList(
                    requestMemberList.filter(
                        (request) => request.id !== idToAccept
                    )
                );
                fetchMyFriendInfo();
            }
        } catch (error) {
            console.log("친구 수락 실패", error);
        }
    };
    

    return (
        <div className="Modal">
            <div className="Overlay">
                <div className="container">
                    <div className="header">
                        <h3>🖐️친구 추가</h3>
                        <button
                            className="request-btn"
                            onClick={() => handleTabChange("send")}
                        >
                            검색
                        </button>
                        <button
                            className="request-btn"
                            onClick={() => {
                                handleTabChange("receive");
                                setHasFriendrequest(false);
                            }}
                        >
                            받은요청
                            <Reddot count={requestMemberList.length}/>
                        </button>
                        <button
                            style={{
                                backgroundImage: "url('/icons/exit-image.svg')",
                            }}
                            className="exit-btn"
                            type="button"
                            onClick={() => {
                                setOpenModal(false); // 클릭 이벤트로 모달창 닫히게 하기
                            }}
                        ></button>
                    </div>

                    {/* 조건부 렌더링 */}
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
                                        <p>
                                            {" "}
                                            {result.name} ({result.username})
                                        </p>
                                        <button
                                            className="request-btn"
                                            onClick={HandleAddFriend}
                                        >
                                            +요청
                                        </button>
                                    </>
                                ) : (
                                    <p>{result}</p>
                                )}
                            </div>
                        </section>
                    ) : (
                        <div className="requests-box">
                            {requestMemberList.length > 0 ? (
                                requestMemberList.map((request, index) => (
                                    <div
                                        className="request-container"
                                        key={index}
                                    >
                                        <span>
                                            {" "}
                                            {request.name} ({request.username})
                                        </span>
                                        <div>
                                            <button
                                                className="request-btn"
                                                onClick={() =>
                                                    handleAccept(request.id)
                                                }
                                            >
                                                수락
                                            </button>
                                            /
                                            <button
                                                className="request-btn"
                                                onClick={() =>
                                                    handleDecline(request.id)
                                                }
                                            >
                                                거절
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>친구가 없군요.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FriendModal;
