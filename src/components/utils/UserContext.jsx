// src/context/UserContext.js
import { createContext, useState, useEffect } from "react";
import axiosInstance from "./AxiosInstance";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get("/api/member/me")
      .then(res => {
        console.log("me 가져오기 성공")
        setUser(res.data)
      })
      .catch(err => {
        console.log("me 정보 가져오기 실패:", err);
        setUser(null);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

