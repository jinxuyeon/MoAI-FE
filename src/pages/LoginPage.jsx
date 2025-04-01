import LoginForm from "../components/LoginForm";
import "./Page.css";
import IntroBox from "../components/IntroBox";

const LoginPage = ({ setIsAuthenticated }) => {
    return (
        <div className="Page">
            <div className="left-side">
                <IntroBox/>
            </div>
            <div className="right-side">
                <img className="logo-img" src="/icons/logo.svg" alt="logo_img" />
                <LoginForm setIsAuthenticated={setIsAuthenticated} />
            </div>
        </div>
    );
};

export default LoginPage;
