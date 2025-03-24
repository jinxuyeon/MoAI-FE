import LoginForm from "../components/LoginForm";
import "./LoginPage.css"
const LoginPage = ({setIsAuthenticated}) => {

    return (
        <div className="Page">
            <LoginForm setIsAuthenticated={setIsAuthenticated} />
        </div>
    );
};

export default LoginPage;
