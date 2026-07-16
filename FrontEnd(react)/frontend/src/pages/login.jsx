import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleLogin = async () => {

        try {

            const response = await api.post(
                "/auth/login",
                {
                    email,
                    password
                }
            );

            const token = response.data.data.token;

            localStorage.setItem("token", token);

            console.log("Stored Token:", token);

            alert("Login Successful");

            navigate("/dashboard");
        } catch (error) {

            console.error(error);

            alert("Login Failed");
        }
    };

    return (
        <div
            style={{
                width: "350px",
                margin: "100px auto",
                padding: "20px",
                border: "1px solid #ccc",
                borderRadius: "10px",
                boxShadow: "0px 0px 10px rgba(0,0,0,0.1)"
            }}
        >
            <h2
                style={{
                    textAlign: "center"
                }}
            >
                Online Banking Login
            </h2>

            <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) =>
                    setEmail(e.target.value)
                }
                style={{
                    width: "100%",
                    padding: "10px",
                    marginBottom: "10px"
                }}
            />

            <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) =>
                    setPassword(e.target.value)
                }
                style={{
                    width: "100%",
                    padding: "10px",
                    marginBottom: "15px"
                }}
            />

            <button
                onClick={handleLogin}
                style={{
                    width: "100%",
                    padding: "10px",
                    cursor: "pointer"
                }}
            >
                Login
            </button>
        </div>
    );
}

export default Login;