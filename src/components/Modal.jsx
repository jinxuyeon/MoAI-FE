import "./Modal.css";
import { useState } from "react";
import axiosInstance from "./utils/AxiosInstance";

const Modal = ({ openModal, setOpenModal }) => {
    const [studentId, setStudentId] = useState("");
    const [result, setResult] = useState("");
    const [activeTab, setActiveTab] = useState("send");
    const [requestMemberList, SetrquestMemberList] = useState([])

    const id = localStorage.getItem("id");
    const myUsername = localStorage.getItem("username");

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
            console.log("친구 추가 요청 실패:", error);
        }
    };

    const ReceivedFriendRequests = async () => {
        try {
            const response = await axiosInstance.get(`api/friend/${id}/request-friend-list`)
            if (response.status === 200) {
                console.log("친구요청 목록 불러오기 완료")
                SetrquestMemberList(response.data.requestMemberList)
            }

        } catch (error) {
            console.log("요청 목록 가져오기 실패:", error)
        }
    }

    const handleTabChange = (tab) => {
        setActiveTab(tab); // "search" or "requests"
    };

    return (
        <div className="Modal">
            <div className="Overlay">
                <div className="container">
                    <div className="header">
                        친구 추가
                        <button className="header-btn" onClick={() => handleTabChange("send")}>검색</button>
                        <button className="header-btn" onClick={() => {
                            handleTabChange("receive");
                            ReceivedFriendRequests()
                        }}>받은 요청</button>

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
                                                <button>수락</button>
                                                <button>거절</button>
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
