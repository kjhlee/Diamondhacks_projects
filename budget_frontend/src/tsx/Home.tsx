import "../css/Home.css"
import userImg1 from "../static/userIMG.png"
import userImg2 from "../static/userIMG.png"
import userImg3 from "../static/userIMG.png"
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
        <div className="body">
            <header className="home-header">
                <h1>BAPP</h1>
                <span className="buttons">
                    <button id="login-button" onClick={handleLogin}>Login</button>
                    <button id="register-button" onClick={handleRegister}>Register</button>
                </span>
            </header>
            <div className="homepage">
                <div className="project-container">
                    <h2 className="project-header">BAPP - The Future of Budgeting</h2>
                    <p className="project-description">
                        Short description of project
                    </p>
                </div>

                <div className="team-container">
                    <h2 className="team-header">Meet the team!</h2>
                    <div className="team-description">
                        <span className="member-container">
                            <img src={userImg1} alt=""></img>
                            <p className="member-description">Ethan's Description</p>
                        </span>
                        <span className="member-container">
                            <img src={userImg2} alt=""></img>
                            <p className="member-description">Jonathan's Description</p>
                        </span>
                        <span className="member-container">
                            <img src={userImg3} alt=""></img>
                            <p className="member-description">KJ's Description</p>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Home;