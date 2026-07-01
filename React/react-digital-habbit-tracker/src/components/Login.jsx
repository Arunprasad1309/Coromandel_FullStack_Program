import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext.jsx";
import "../styles/login.css";

function Login() {
    const [name, setName] = useState("");
    const {setUser} = useContext(UserContext);

    const handleLogin = () => {
        if (name.trim() !== "") {
            setUser(name);
        }
};

return (
        <div className="login">
            <h2>Login</h2>
            <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default Login;