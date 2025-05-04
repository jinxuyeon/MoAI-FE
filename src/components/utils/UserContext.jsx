// src/context/UserContext.js
import { createContext, useState, useEffect } from "react";
import axiosInstance from "./AxiosInstance";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axiosInstance.get("/api/users/me")
      .then(res => setUser(res.data))
      .catch(err => {
        console.log("사용자 정보 가져오기 실패:", err);
        setUser(null);
      });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
