// import "./styles/Home.css";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/login");
    };

    const handleRegister = () => {
        navigate("/register");
    };

    return(
        <header className="home-header">
            <h1>Homepage</h1>
            <span className="buttons">
                <button id="login-button" onClick={handleLogin}>Login</button>
                <button id="register-button" onClick={handleRegister}>Register</button>
            </span>
        </header>
    )
}
export default Home;