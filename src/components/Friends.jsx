import { useState, useEffect } from "react";
import "./Friends.css";
import FriendModal from "./FriendModal";
import Reddot from "./Reddot";
import { UserRoundPlus } from "lucide-react";
import ProfileTemplate from "./ProfileTemplate";
import {
  getRequestFriendList,
  getMyFriends,
} from "./utils/friendApi"; // 모듈화한 API 사용

const Friends = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [hasFriendRequest, setHasFriendrequest] = useState(false);
  const [requestMemberList, setRequestMemberList] = useState([]);
  const [myFriendList, setMyFriendList] = useState([]);

  // 요청 친구 목록 불러오기
  const fetchRequestFriendInfo = async () => {
    try {
      const data = await getRequestFriendList();
      setRequestMemberList(data || []);
      setHasFriendrequest(data.length > 0);
    } catch (error) {
      console.error("요청 목록 가져오기 실패:", error);
      setHasFriendrequest(false);
    }
  };

  // 내 친구 목록 불러오기
  const fetchMyFriendInfo = async () => {
    try {
      const data = await getMyFriends();
      setMyFriendList(data || []);
    } catch (error) {
      console.error("친구 목록 가져오기 실패:", error);
    }
  };

  // 초기 실행
  useEffect(() => {
    fetchRequestFriendInfo();
    fetchMyFriendInfo();
  }, []);

  return (
    <div className="Friends-Container">
      <div className="header">
        <button className="Friends-btn" onClick={() => setIsOpen(!isOpen)}>
          <h4>친구</h4>
        </button>
        <button
          className="add-friend-btn"
          onClick={() => setOpenModal(true)}
        >
          <UserRoundPlus />
          <Reddot count={requestMemberList.length} />
        </button>

        {openModal && (
          <FriendModal
            setOpenModal={setOpenModal}
            hasFriendRequest={hasFriendRequest}
            setHasFriendrequest={setHasFriendrequest}
            requestMemberList={requestMemberList}
            setRequestMemberList={setRequestMemberList}
            fetchMyFriendInfo={fetchMyFriendInfo}
          />
        )}
      </div>

      {isOpen && (
        <ul className="Friends-List">
          {myFriendList.length > 0 ? (
            myFriendList.map((friend) => (
              <li key={friend.id} className="Friends-Item">
                <ProfileTemplate
                  profileImageUrl={friend.profileThumbnails}
                  name={friend.nickName}
                  id={friend.id}
                />
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
