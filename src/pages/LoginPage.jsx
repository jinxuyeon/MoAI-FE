import { useState , useEffect} from "react";
import LoginForm from "../components/LoginForm";

const LoginPage = ({setIsAuthenticated}) => {

    useEffect(() => {
        document.body.style.fontFamily = 'Arial, sans-serif';
        document.body.style.background = 'linear-gradient(130deg, #90d3f7 20%, #ffffff 60%)';
        document.body.style.display = 'flex';
        document.body.style.margin = '0';
        document.body.style.padding = '0';
        document.body.style.alignItems = 'center';
        document.body.style.justifyContent = 'center';
        document.body.style.overflow = 'hidden';

        // 컴포넌트가 언마운트될 때 원래 스타일로 복원
        return () => {
            document.body.style.fontFamily = '';
            document.body.style.background = '';
            document.body.style.display = '';
            document.body.style.margin = '';
            document.body.style.padding = '';
            document.body.style.alignItems = '';
            document.body.style.justifyContent = '';
            document.body.style.overflow = '';
        };
    }, []);

    return (
        <div>
            <LoginForm setIsAuthenticated={setIsAuthenticated} />
        </div>
    );
};

export default LoginPage;
