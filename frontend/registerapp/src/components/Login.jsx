import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:7002/api/auth/login", formData, { withCredentials: true });
      alert("Logged in successfully");
      navigate("/profile");
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
      <input type="password" placeholder="Password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
      <button type="submit">Login</button>
      <Link to={"/signup"}>Dont have an account ? signup</Link>
    </form>
  );
};

export default Login;