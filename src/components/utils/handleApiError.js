const handleApiError = (error, navigate) => {
    if (error.response) {
        const { status, data } = error.response;
        if (status === 401) {
            if (data.error === "INVALID_TOKEN") {
                alert("유효하지 않은 토큰입니다. 다시 로그인해주세요.");
            } else {
                alert("인증에 실패했습니다. 다시 로그인해주세요.");
            }
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            navigate("/login");  // navigate 호출
        } else {
            alert(`에러 발생: ${data?.message || error.message}`);
            navigate("/login");
        }
    } else {
        alert(`에러 발생: ${error.message}`);
        navigate("/login");
    }
};

export default handleApiError;
