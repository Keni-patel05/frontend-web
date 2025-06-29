import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");  // Add error state
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem("user");
        if (auth) {
            navigate("/");
        }

        console.log("API URL:", process.env.REACT_APP_API_URL);
    }, [navigate]);

    const handleLogin = async () => {
        if (!email || !password) {
            alert("Please enter email and password");
            return;
        }

        let result = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
            method: "POST",
            body: JSON.stringify({ email: email.trim(), password: password.trim() }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        result = await result.json();

        if (result.auth) {
            localStorage.setItem("user", JSON.stringify(result.user));
            localStorage.setItem("token", JSON.stringify(result.auth));
            navigate("/");
        } else {
            setError("Invalid email or password");
        }
    };

    return (
        <div className="login">
            <h1>Login</h1>
            {error && <p className="invalid">{error}</p>} {/* Show error if any */}
            <input
                type="text"
                className="inputbox"
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <input
                type="password"
                className="inputbox"
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <button onClick={handleLogin} className="appButton" type="button">
                Login
            </button>
        </div>
    );
};


export default Login;
