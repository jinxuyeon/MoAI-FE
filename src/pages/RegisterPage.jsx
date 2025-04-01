import RegisterForm from "../components/RegisterForm";
import IntroBox from "../components/IntroBox";
import "./Page.css";
const RegisterPage = () => {
    console.log("RegisterPage Loaded");
    console.log("logo path:", document.querySelector(".logo-img")?.src);
    return (
        <div className="Page">
            <div className="left-side">
                <IntroBox />
            </div>
            <div className="right-side">
                <img className="logo-img" src="/icons/logo.svg" alt="img" />
                <RegisterForm />
            </div>
        </div>
    );
};

export default RegisterPage;
