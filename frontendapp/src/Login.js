import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // VALIDATION
  const validateForm = () => {
    if (!email || !password) {
      alert("All fields are required");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      alert("Invalid email format");
      return false;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return false;
    }

    return true;
  };

  // LOGIN USER
  const loginUser = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      if (res.data.success) {
        localStorage.setItem("user", JSON.stringify(res.data.user));

        alert("Login successful");

        navigate("/dashboard");
      } else {
        alert(res.data.error);
      }
    } catch (err) {
      console.log(err);

      alert("Login Failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Login</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          width: "95%",
          padding: "10px",
          marginBottom: "10px",
        }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          width: "95%",
          padding: "10px",
          marginBottom: "20px",
        }}
      />

      <button
        onClick={loginUser}
        style={{
          marginRight: "10px",
        }}
      >
        Login
      </button>

      <button onClick={() => navigate("/signup")}>Sign Up</button>
    </div>
  );
}

export default Login;
