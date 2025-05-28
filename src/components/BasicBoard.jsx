import "./BasicBoard.css";
import { Link } from "react-router-dom";
import axiosInstance from "./utils/AxiosInstance";
import { useEffect, useState } from "react";
const BasicBoard = ({type, title}) => {
    const [posts, setPosts] = useState([]);

    const handleSearch = async () => {
        try {
            const res = await axiosInstance.get("api/post", {
                params: {
                    boardType: type,
                    page: 0,
                    size: 3,
                },
            });

            console.log("✅ 게시글 응답:", res.data);
            const postData = res.data.content;
            setPosts(postData);
        } catch (err) {
            console.error("❌ 게시글 불러오기 실패:", err);
        }
    };

    useEffect(() => {
        handleSearch();
    }, []);

    return (
        <section className="BasicBoard">
            <h4 className="title">{title}</h4>
            {posts.length > 0 ? (
                posts.map((post) => (
                    <div key={post.id}>
                        <strong>{post.title}</strong>
                    </div>
                ))
            ) : (
                <div>게시글이 없습니다.</div>
            )}
            <Link to={`/main/community/${type.toLowerCase()}`}>게시글 더보기</Link>
        </section>
    );
};

export default BasicBoard;
