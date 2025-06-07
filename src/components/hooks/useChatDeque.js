// ✅ useChatDeque.js
import { useState } from "react";

const useChatDeque = () => {
  const [messages, setMessages] = useState([]);

  // 메시지 초기화
  const resetMessages = (newMessages) => {
    setMessages(newMessages);
  };

  // 예전 메시지 추가 (위로 붙이기) + 중복 제거
  const addOldMessages = (oldMessages) => {
    setMessages((prev) => {
      const ids = new Set(prev.map((m) => m.id));
      const filtered = oldMessages.filter((m) => !ids.has(m.id));
      return [...filtered, ...prev];
    });
  };

  // 새 메시지 추가 (아래로 붙이기) + 중복 제거
  const addNewMessage = (newMessage) => {
    setMessages((prev) => {
      if (prev.some((m) => m.id === newMessage.id)) return prev;
      return [...prev, newMessage];
    });
  };

  return {
    messages,
    resetMessages,
    addOldMessages,
    addNewMessage,
  };
};

export default useChatDeque;
