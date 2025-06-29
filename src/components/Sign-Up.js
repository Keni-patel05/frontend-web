import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");  // Add error state
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem("user");
        if (auth) {
            navigate("/");
        }
    }, [navigate]);

    const collectData = async () => {
        if (!name || !email || !password) {
            setError("All fields are required");
            return;
        }

        let result = await fetch(`${process.env.REACT_APP_API_URL}/register`, {
            method: "POST",
            body: JSON.stringify({ name, email, password }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        result = await result.json();

        if (result.error) {
            setError(result.error);  // Show error if API response has error
        } else {
            localStorage.setItem("user", JSON.stringify(result.user));
            localStorage.setItem("token", JSON.stringify(result.auth));
            navigate("/");
        }
    };

    return (
        <div className="register">
            <h1>Register</h1>
            {error && <p className="invalid">{error}</p>} {/* Show error if any */}
            <input
                className="inputbox"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                className="inputbox"
                type="text"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                className="inputbox"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={collectData} className="appButton" type="button">
                Sign Up
            </button>
        </div>
    );
};


export default SignUp;
