import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from "dotenv";

// .env 파일 로드
dotenv.config();

const baseURL = process.env.VITE_API_BASE_URL

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // 개발 서버 설정
    server: {
        proxy: {
            // CORS 문제 해결을 위한 프록시 설정
            "/api": {
                target: baseURL,
                changeOrigin: true, // 요청 헤더의 origin을 target URL로 변경
                secure: false, // HTTP도 허용 (배포 환경에서는 true로 설정하여 HTTPS 사용)
                credentials: true, // 쿠키 등 인증 정보 포함한 요청 허용
            },
        },
    },
})
