import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api/api";
import "./login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show,setShow]=useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("auth/login", { email, password });
      console.log(res.data);

      localStorage.setItem("token", res.data.token);

      alert("Login Successful");

      setEmail("");
      setPassword("");

      // Navigate to employees page
      navigate("/employees");
    } catch (err) {
      console.log(err);
      alert("Login Failed");
    }
  };

  return (

    <div className="container">
      <h2 style={{color: "rgb(113,113,236"}}>Employee System</h2>
      <h2 style={{color: "rgb(113, 113, 236)"}}>Login</h2>
      <form onSubmit={handleLogin} className="login-form">
        <input 
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br></br>
        <input
          type={show? "text":"password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <br></br>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
