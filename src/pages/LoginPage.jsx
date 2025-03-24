import LoginForm from "../components/LoginForm";
import "./Page.css"
import RegisterForm from "../components/RegisterForm";

const LoginPage = ({ setIsAuthenticated }) => {

    return (
        <div className="Page">
            <div className="left-side"> </div>
            <div className="right-side">
                <LoginForm setIsAuthenticated={setIsAuthenticated} />
            </div>
        </div>
    );
};

export default LoginPage;
