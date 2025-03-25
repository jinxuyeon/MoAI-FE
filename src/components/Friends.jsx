import { useState, useEffect } from "react";
import "./Friends.css";
import Modal from "./Modal";
import axiosInstance from "./utils/AxiosInstance";

const Friends = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false)
    const [hasFriendRequest, setHasFriendrequest] = useState(false);
    const [requestMemberList, setRequestMemberList] = useState([])
    const [myFriendList, setMyFriendList] = useState([])
    const id = localStorage.getItem("id");

    const fetchRequstFriendInfo = async () => {
        console.log("fetchFriendInfo 호출")
        try {
            const response = await axiosInstance.get(`api/friend/${id}/request-friend-list`)
            if (response.status === 200) {
                console.log("친구요청 목록 불러오기 완료")
                setRequestMemberList(response.data.requestMemberList)
                setHasFriendrequest(response.data.requestMemberList.length > 0);
            }
        } catch (error) {
            setHasFriendrequest(false);
            console.log("요청 목록 가져오기 실패:", error)
        }
    };

    const fetchMyFriendInfo = async () => {
        try {
            const response = await axiosInstance.get(`api/friend/${id}/accept-friend-list`)
            if (response.status === 200) {
                console.log("친구목록 불러오기 완료")
                setMyFriendList(response.data.acceptMemberDtoList)
            }
        } catch (error) {
            console.log("친구 목록 가져오기 실패", error)
        }
    }
    useEffect(() => {
        fetchRequstFriendInfo();
        fetchMyFriendInfo()
    }, []); //빈 배열을 넣으면 처음 마운트될 때만 실행됨


    return (
        <div className="Friends-Container">
            <div style={{ display: "flex", gap: "2px", width: "100%", alignItems: "center" }}>
                <button className="Friends-btn" onClick={() => setIsOpen(!isOpen)}>
                    😊 팔로워{isOpen ? "🔺" : "🔻"}
                </button>
                <button
                    className="add-friend-btn"
                    style={{
                        backgroundImage: hasFriendRequest
                            ? "url('/icons/add-friend-icon-with-reddot.svg')" // 요청이 있을 때
                            : "url('/icons/add-friend-icon.svg')" // 요청이 없을 때
                    }}
                    onClick={() => { setOpenModal(true); console.log("openModal 상태:", openModal); }}
                ></button>
                {openModal ? <Modal
                    setOpenModal={setOpenModal}
                    hasFriendRequest={hasFriendRequest}
                    setHasFriendrequest={setHasFriendrequest}
                    requestMemberList={requestMemberList}
                    setRequestMemberList={setRequestMemberList}
                    setMyFriendList={setMyFriendList}
                    fetchMyFriendInfo={fetchMyFriendInfo}
                /> : null}
            </div>
            {isOpen && (
                <ul className="Friends-List">
                    {myFriendList.length > 0 ? (
                        myFriendList.map((friend, index) => (
                            <li key={index} className="Friends-Item">{friend.name}</li>
                        ))
                    ) : (
                        <li className="Friends-Item">친구가 없습니다.</li>
                    )}
                </ul>
            )}
        </div>
    );
};

export default Friends;
