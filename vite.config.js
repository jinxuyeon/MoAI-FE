import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

// .env 파일 로드
dotenv.config();

const baseURL = process.env.VITE_API_BASE_URL;

export default defineConfig({
    plugins: [react()],
    // 프로덕션이든 개발이든 항상 base는 '/'로 고정
    base: "/",
    server: {
        host: true,
        proxy: {
            "/api": {
                target: baseURL,
                changeOrigin: true,
                secure: false,
                credentials: true,
            },
        },
    },
});
