import "./ChatBox.css";
import ChatBubble from "./ChatBubble";
import { useCallback, useEffect, useRef } from "react";
import throttle from "lodash/throttle";

const ChatBox = ({ selectedRoom, chatMessages, onLoadMore, hasMore }) => {
    const containerRef = useRef(null);
    const bottomRef = useRef(null);
    const observer = useRef(null);
    const isInitialLoadRef = useRef(true);
    const prevMessageCountRef = useRef(0);
    const scrollRestoreTargetIdRef = useRef(null);

    const saveTopVisibleMessage = () => {
        const container = containerRef.current;
        if (!container) return;
        const children = [...container.children];
        for (let child of children) {
            const rect = child.getBoundingClientRect();
            if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
                scrollRestoreTargetIdRef.current = child.id;
                break;
            }
        }
    };

    const throttledLoadMore = useRef(
        throttle(() => {
            if (!hasMore) return;
            saveTopVisibleMessage();

            const container = containerRef.current;
            if (!container) return;

            const firstVisible = [...container.children].find((child) => {
                const rect = child.getBoundingClientRect();
                return rect.top >= 0 && rect.bottom <= window.innerHeight;
            });

            const idAttr = firstVisible?.getAttribute("id");
            const id = idAttr?.replace("msg-", "");

            if (id) {
                const numericId = Number(id);
                const oldestId = Math.min(...chatMessages.map((m) => m.id));
                if (numericId <= oldestId) {
                    onLoadMore(numericId - 1);
                }
            }
        }, 1000)
    );

    const firstMessageRef = useCallback(
        (node) => {
            if (!node || !hasMore) return;

            if (observer.current) {
                try {
                    observer.current.disconnect();
                } catch (e) {
                    console.warn("❗ observer disconnect error:", e);
                }
            }

            observer.current = new IntersectionObserver((entries) => {
                const first = entries[0];
                if (first.isIntersecting) {
                    throttledLoadMore.current();
                }
            });

            observer.current.observe(node);
        },
        [hasMore, chatMessages.length]
    );

    useEffect(() => {
        if (!chatMessages || chatMessages.length === 0) return;

        const container = containerRef.current;
        if (!container) return;

        const isNewMessage = chatMessages.length > prevMessageCountRef.current;
        const isPrepend = scrollRestoreTargetIdRef.current !== null;
        prevMessageCountRef.current = chatMessages.length;

        if (isInitialLoadRef.current) {
            bottomRef.current?.scrollIntoView({ behavior: "auto" });
            isInitialLoadRef.current = false;
        } else if (isPrepend) {
            requestAnimationFrame(() => {
                const el = document.getElementById(scrollRestoreTargetIdRef.current);
                if (el) el.scrollIntoView({ block: "start" });
                scrollRestoreTargetIdRef.current = null;
            });
        } else if (isNewMessage) {
            bottomRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [chatMessages]);

    useEffect(() => {
        isInitialLoadRef.current = true;
        scrollRestoreTargetIdRef.current = null;
        prevMessageCountRef.current = 0;
        if (observer.current) {
            try {
                observer.current.disconnect();
            } catch (e) {
                console.warn("❗ observer cleanup error:", e);
            }
        }
        observer.current = null;
    }, [selectedRoom?.roomId]);

    return (
        <section className="chat-box chat-content">
            <div className="chat-message-list" ref={containerRef}>
                {chatMessages.map((msg, index) => {
                    const isFirst = index === 0;
                    return (
                        <div
                            key={msg.id}
                            id={`msg-${msg.id}`}
                            ref={isFirst && chatMessages.length > 0 ? firstMessageRef : null}
                            className={`chat-bubble ${msg.senderId === selectedRoom.partner.id ? "received" : "sent"}`}
                        >
                            <ChatBubble msg={msg} />
                        </div>
                    );
                })}
                <div ref={bottomRef} />
            </div>
        </section>
    );
};

export default ChatBox;
