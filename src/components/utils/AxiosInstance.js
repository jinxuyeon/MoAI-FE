import axios from "axios";
import refreshAccessToken from "./refreshAccessToken";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL + '/api',
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

axiosInstance.interceptors.response.use(
    (response) => {
        console.log(`응답 수신:👌${response.data.message}`, response.data);
        return response;
    },
    async (error) => {
        if (error.response?.status === 401 && error.response?.data?.error === "TOKEN_EXPIRED") {
            try {
                console.log("액세스 토큰 만료, 리프레시 시도");
                await refreshAccessToken(); 
                // 원래 요청 재시도
                error.config.headers.Authorization = `Bearer ${localStorage.getItem("accessToken")}`;
                return axiosInstance.request(error.config);
            } catch (refreshError) {
                console.error("리프레시 토큰 만료 또는 실패", refreshError);
                window.location.href = "/login";
                return Promise.reject(refreshError); // 에러를 상위로 던져서 호출한 곳에서 처리하도록 합니다.
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;



