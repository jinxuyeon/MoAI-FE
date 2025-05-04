import { useState, useEffect } from "react";
import "./Friends.css";
import FriendModal from "./FriendModal";
import axiosInstance from "./utils/AxiosInstance";
import Reddot from "./Reddot";
import { UserRoundPlus } from "lucide-react";

const Friends = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [hasFriendRequest, setHasFriendrequest] = useState(false);
    const [requestMemberList, setRequestMemberList] = useState([]);
    const [myFriendList, setMyFriendList] = useState([]);
    const id = localStorage.getItem("id");


    const fetchRequestFriendInfo = async () => {
        try {
            const { data } = await axiosInstance.get("/api/friend/request-friend-list");
            if (Array.isArray(data.requestMemberList)) {
                console.log("친구요청 목록 불러오기 완료");
                setRequestMemberList(data.requestMemberList);
                setHasFriendrequest(data.requestMemberList.length > 0);
            } else {
                console.warn("데이터 형식 오류", data);
                setHasFriendrequest(false);
            }
        } catch (error) {
            setHasFriendrequest(false);
            console.error("요청 목록 가져오기 실패:", error);
        }
    };


    const fetchMyFriendInfo = async () => {
        try {
            const { data } = await axiosInstance.get("/api/friend/my-friends");
            if (Array.isArray(data.acceptMemberDtoList)) {
                console.log("친구목록 불러오기 완료");
                setMyFriendList(data.acceptMemberDtoList);
            } else {
                console.warn("친구 목록 응답 형식 오류", data);
            }
        } catch (error) {
            console.error("친구 목록 가져오기 실패", error);
        }
    };

    useEffect(() => {
        fetchRequestFriendInfo();
        fetchMyFriendInfo();
    }, []); //빈 배열을 넣으면 처음 마운트될 때만 실행됨

    return (
        <div className="Friends-Container">
            <div className="header">
                <button
                    className="Friends-btn"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <h4>친구</h4>
                </button>
                <button
                    className="add-friend-btn"
                    onClick={() => {
                        setOpenModal(true);
                        console.log("openModal 상태:", openModal);
                    }}
                >
                    <UserRoundPlus />
                    <Reddot count={requestMemberList.length} />
                </button>
                {openModal ? (
                    <FriendModal
                        setOpenModal={setOpenModal}
                        hasFriendRequest={hasFriendRequest}
                        setHasFriendrequest={setHasFriendrequest}
                        requestMemberList={requestMemberList}
                        setRequestMemberList={setRequestMemberList}
                        setMyFriendList={setMyFriendList}
                        fetchMyFriendInfo={fetchMyFriendInfo}
                        count={requestMemberList.length}
                    />
                ) : null}
            </div>
            {isOpen && (
                <ul className="Friends-List">
                    {myFriendList.length > 0 ? (
                        myFriendList.map((friend, index) => (
                            <li key={index} className="Friends-Item">
                                <button>{friend.name}</button>
                            </li>
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
