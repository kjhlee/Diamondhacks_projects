import "../css/Login.css"
import backgroundImg from "../static/background-image.jpg"
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login(){
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async(e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });
            const data = await response.json();
            localStorage.setItem("token", data.token);
            console.log(localStorage.getItem("token"));
            if(response.ok) {
                navigate("/dashboard");
            } else {
                alert(`Error: ${data}`);
            }
        } catch(error) {
            alert("Failed to log in. Please try again.");
            console.error("Login error: ", error);
        }
    }
    return(
        <div className="login">
            <img src={backgroundImg} alt=""></img>
            <form onSubmit={handleLogin} className="login-form">
                <h1>Log In</h1>
                <div className="login-inputs">
                    <div className="input-field">
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            value={email}
                            placeholder="Email" 
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-field">
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            value={password}
                            placeholder="Password" 
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button id="submit" type="submit">Log In</button>
                    <p>Don't have an account?</p>
                    <p><a href="http://localhost:3000/register">Click here to register!</a></p>
                </div>
            </form>
        </div>
    )
}

export default Login;
