import "./Modal.css";
import { useState } from "react";
import axiosInstance from "./utils/AxiosInstance";

const Modal = ({ setOpenModal, hasFriendRequest, requestMemberList, fetchMyFriendInfo,setHasFriendrequest, setRequestMemberList }) => {
    const [studentId, setStudentId] = useState("");
    const [result, setResult] = useState("");
    const [activeTab, setActiveTab] = useState("send");
    const myUsername = localStorage.getItem("username");
    const id = localStorage.getItem("id");

    const handleSearch = async () => {
        try {
            if (studentId === myUsername) {
                return;
            }
            const response = await axiosInstance.get(`/api/member/search?studentId=${studentId}`);
            setResult(response.data);
            if (response.status === 200) {
                setResult(response.data); // 정상적인 데이터 처리
            } else if (response.status === 400) {
                setResult("검색 결과가 없습니다.");
            }
        } catch (error) {
            console.error("검색 실패:", error);
            setResult("에러 발생");
        }
    };

    const HandleAddFriend = async () => {
        try {
            const response = await axiosInstance.post(`/api/friend/${id}/add-friend`, { studentId: studentId });
            if (response.status === 200) {
                setResult("친구 추가 요청이 전송되었습니다.");
            }
        } catch (error) {
           console.log(error.response.data.message) //이렇게하자자
        }
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab); // "search" or "requests"
    };

    const handleDecline = async (idToDecline) => {
        try {
            const response = await axiosInstance.post(`api/friend/${id}/decline-friend`, { idToDecline: idToDecline })
            if (response.status === 200) {
                console.log(`${idToDecline}친구요청 거절 완료`)
                setRequestMemberList(requestMemberList.filter(request => request.id !== idToDecline));
            }
        } catch (error) {
            console.log("친구 요청 거절 실패:", error)
        }
    }

    const handleAccept = async (idToAccept) => {
        try {
            const response = await axiosInstance.post(`api/friend/${id}/accept-friend`, { idToAccept: idToAccept })
            if (response.status === 200) {
                console.log(`${idToAccept}친구요청 수락 완료`)
                setRequestMemberList(requestMemberList.filter(request => request.id !== idToAccept));
                fetchMyFriendInfo()
            }
        } catch (error) {
            console.log("친구 수락 실패",error)
        }

    }

    return (
        <div className="Modal">
            <div className="Overlay">
                <div className="container">
                    <div className="header">
                        친구 추가
                        <button className="header-btn" onClick={() => handleTabChange("send")}>검색</button>
                        <button className="header-btn" onClick={() => {
                            handleTabChange("receive");
                            setHasFriendrequest(false)
                        }}> {hasFriendRequest ? "받은 요청🔴" : "받은 요청"}</button>

                        <button
                            className="cancel"
                            type="button"
                            onClick={() => {
                                setOpenModal(false); // 클릭 이벤트로 모달창 닫히게 하기
                            }}
                        >❌</button>
                    </div>

                    {/* 조건부 렌더링 */}
                    {activeTab === "send" ? (
                        <section>
                            <div className="search-box">
                                <input
                                    onChange={(event) => {
                                        setStudentId(event.target.value);
                                    }}
                                    type="text"
                                    className="search-input"
                                    value={studentId}
                                    placeholder="학번"
                                />
                                <button className="search-button" onClick={handleSearch}>검색</button>
                            </div>
                            <div className="search-results">
                                {result && result.username ? (
                                    <>
                                        <p>{result.username} : {result.name}</p>
                                        <button className="add-btn" onClick={HandleAddFriend}>+친구</button>
                                    </>
                                ) : (
                                    <p>{result}</p>
                                )}
                            </div>
                        </section>
                    ) : (
                        <section>
                            <div className="requests-box">
                                <p>받은 친구 요청</p>
                                <ul>
                                    {requestMemberList.length > 0 ? (
                                        requestMemberList.map((request, index) => (
                                            <li key={index}>
                                                {request.username} ({request.name})
                                                <button onClick={() => handleAccept(request.id)}>수락</button>
                                                <button onClick={() => handleDecline(request.id)}>거절</button>
                                            </li>
                                        ))
                                    ) : (
                                        <p>받은 친구 요청이 없습니다.</p>
                                    )}

                                </ul>
                            </div>
                        </section>
                    )}


                </div>
            </div>
        </div>
    );
};

export default Modal;
