import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Customer");

  const validateForm = () => {
    if (!name || !email || !password || !role) {
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

  const signupUser = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", {
        name,
        email,
        password,
        role,
      });

      if (res.data.success) {
        alert("Signup successful");

        navigate("/");
      } else {
        alert(res.data.error);
      }
    } catch (err) {
      console.log(err);

      alert("SignUP Failed");
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        position: "relative",
      }}
    >
      <button
        onClick={() => navigate("/")}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          padding: "10px 20px",
          cursor: "pointer",
        }}
      >
        Login
      </button>

      <h1>Signup</h1>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{
          width: "95%",
          padding: "10px",
          marginBottom: "10px",
        }}
      />

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
          marginBottom: "10px",
        }}
      />

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        style={{
          width: "96.5%",
          padding: "10px",
          marginBottom: "20px",
        }}
      >
        <option value="Customer">Customer</option>

        <option value="Organizer">Organizer</option>

        <option value="Provider">Provider</option>

        <option value="Admin">Admin</option>
      </select>

      <button onClick={signupUser}>Signup</button>
    </div>
  );
}

export default Signup;
