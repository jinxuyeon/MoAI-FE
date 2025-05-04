// src/context/UserContext.js
import { createContext, useState, useEffect } from "react";
import axiosInstance from "./AxiosInstance";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

  
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const dummyUser = {
    id: 1,
    username: "2023123456",
    name: "홍길동",
    email: "hong@example.com",
    nickname: "길동이",
    roles: ["ROLE_USER", "ROLE_STUDENT"],
    intro: "안녕하세요, 컴공과 23학번 홍길동입니다.",
    profileImageUrl: "https://2025-capstone-moai-bucket.s3.ap-northeast-2.amazonaws.com/profile-images/05a52959-749d-488f-9f6a-ce8d79aa21a4-profile-base.jpeg", // 또는 실제 이미지 URL
  };
  useEffect(() => {
    axiosInstance.get("/api/member/me")
      .then(res => {
        console.log("me 가져오기 성공")
        setUser(res.data)
      })
      .catch(err => {
        console.log("me 정보 가져오기 실패:", err);
        setUser(null);
        setUser(dummyUser) //테스트용 임시 더미
      })
      .finally(() => setIsLoading(false)
      );
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

