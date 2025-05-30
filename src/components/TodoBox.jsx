import "./TodoBox.css";
import { useState, useEffect } from "react";
import axiosInstance from "./utils/AxiosInstance";
import dayjs from "dayjs";

const TodoBox = () => {
    const [todolist, setTodolist] = useState([]);
    const [newItem, setNewItem] = useState("");
    const [dueDate, setDueDate] = useState(dayjs().format("YYYY-MM-DD")); // 기본값: 오늘

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const res = await axiosInstance.get("/api/member/todo/my");
                setTodolist(res.data.todos);
            } catch (error) {
                console.error("❌ 투두 목록 불러오기 실패:", error);
                alert("투두 리스트 불러오기 실패");
            }
        };
        fetchTodos();
    }, []);

    const handleAddItem = async () => {
        if (newItem.trim() === "") return;
        if (todolist.length >= 10) {
            alert("최대 10개의 항목만 등록할 수 있습니다.");
            return;
        }

        const newTodo = {
            content: newItem,
            status: "PENDING",
            dueDate: dueDate,
        };

        try {
            const res = await axiosInstance.post("/api/member/todo/add", newTodo);
            const savedTodo = res.data;
            setTodolist([...todolist, savedTodo]);
            setNewItem("");
        } catch (error) {
            console.error("❌ 투두 항목 추가 실패:", error);
            alert("서버에 항목을 추가하는 데 실패했습니다.");
        }
    };

    const toggleItem = async (index) => {
        const target = todolist[index];
        const newStatus = target.status === "PENDING" ? "DONE" : "PENDING";

        try {
            await axiosInstance.post(`/api/member/todo/${target.id}/status`, {
                status: newStatus,
            });

            const updated = [...todolist];
            updated[index] = { ...target, status: newStatus };
            const pending = updated.filter((item) => item.status === "PENDING");
            const done = updated.filter((item) => item.status === "DONE");
            setTodolist([...pending, ...done]);
        } catch (error) {
            console.error("❌ 상태 변경 실패:", error);
            alert("상태 변경 실패");
        }
    };

    const deleteItem = async (index) => {
        const target = todolist[index];
        try {
            await axiosInstance.delete(`/api/member/todo/${target.id}`);
            const updated = [...todolist];
            updated.splice(index, 1);
            setTodolist(updated);
        } catch (error) {
            console.error("❌ 삭제 실패:", error);
            alert("항목 삭제에 실패했습니다.");
        }
    };

    const getDday = (dueDateStr) => {
        const today = dayjs();
        const target = dayjs(dueDateStr);
        const diff = target.diff(today, "day");
        return diff === 0 ? "D-Day" : diff > 0 ? `D-${diff}` : `D+${-diff}`;
    };

    const pendingItems = todolist.filter((item) => item.status === "PENDING");
    const doneItems = todolist.filter((item) => item.status === "DONE");

    return (
        <section>
            <label className="section-title small">투두리스트</label>


            <div className="box todolist-box">
                <div className="todolist-input-row">
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />
                    <input
                        type="text"
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)}
                        placeholder="새 항목 입력"
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                handleAddItem();
                            }
                        }}
                    />
                    
                    <button onClick={handleAddItem}>추가</button>
                </div>

                <ul className="todolist-items">
                    {pendingItems.map((item, index) => (
                        <li key={`pending-${index}`} className="incomplete">
                            <div className="item-left" onClick={() => toggleItem(todolist.indexOf(item))}>
                                <span className="circle">○</span>
                                <span className="item-text">{item.content}</span>
                                <span className="dday">({getDday(item.dueDate)})</span>
                            </div>
                            <button onClick={() => deleteItem(todolist.indexOf(item))}>x</button>
                        </li>
                    ))}
                </ul>

                <ul className="todolist-items">
                    {doneItems.map((item, index) => (
                        <li key={`done-${index}`} className="checked">
                            <div className="item-left" onClick={() => toggleItem(todolist.indexOf(item))}>
                                <span className="circle">●</span>
                                <span className="item-text">{item.content}</span>
                                <span className="checkmark">✔️</span>
                                <span className="dday">({getDday(item.dueDate)})</span>
                            </div>
                            <button onClick={() => deleteItem(todolist.indexOf(item))}>x</button>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default TodoBox;
