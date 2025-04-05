// import "./styles/Register.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Register(){
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cPassword, setCpassword] = useState("");

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        if(password !== cPassword) {
            alert("Passwords don't match!");
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/auth/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                    confirmPassword: cPassword
                })
            });

            const data = await response.text();
            if(response.ok) {
                navigate("/login");
            } else {
                alert(`Error: ${data}`);
            }
        } catch(error) {
            alert("Failed to register account. Please try again.");
            console.error("Login error: ", error);
        }
    }

    return(
        <div className="register-form">
            <form onSubmit={handleRegister}>
                <h1>Register</h1>
                <div className="register-inputs">
                    <div className="input-field">
                        <input 
                            type = "text" 
                            id = "name" 
                            name = "name" 
                            value = {name}
                            placeholder = "Name" 
                            onChange = {(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-field">
                        <input 
                            type = "email" 
                            id = "email" 
                            name = "email" 
                            value = {email} 
                            placeholder = "Email" 
                            onChange = {(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-field">
                        <input 
                            type = "password" 
                            id = "password" 
                            name = "password" 
                            value = {password} 
                            placeholder = "Password" 
                            onChange = {(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-field">
                        <input 
                            type = "password" 
                            id = "cPassword" 
                            name = "cPassword" 
                            value = {cPassword} 
                            placeholder = "Confirm Password" 
                            onChange = {(e) => setCpassword(e.target.value)}
                            required
                        />
                    </div>
                    <button id="submit" type="submit">Register</button>
                </div>
            </form>
            <p>Already have an account?</p>
            <p><a href="http://localhost:3000/login">Click here to log in!</a></p>
        </div>
    )
}

export default Register;