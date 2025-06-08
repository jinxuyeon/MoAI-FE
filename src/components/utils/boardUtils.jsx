
// 여기만고치면돼 게시판 개설
const boardTypeMap = {
    NOTICE_C: "학과 공지사항",
    NOTICE: "조교 전달사항",
    FREE: "자유게시판",
    SECRET: "비밀게시판",
    REVIEW: "취업,면접 후기",
    MARKET: "책장터",
};


export const getBoardLabel = (type = "") => {
    return boardTypeMap[type.toUpperCase()] || "게시판";
};

export const boardTypeList = Object.keys(boardTypeMap);