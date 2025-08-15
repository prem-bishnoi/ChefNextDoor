import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services/authService";
import AuthNavbar from "../../components/AuthNavbar/AuthNavbar";
import styles from "./Login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      alert("Login successful!");
      navigate("/home");
    } catch (err: any) {
      alert(err.message || "Login failed");
    }
  };

  return (
    <div className={styles.container}>
      <AuthNavbar />
      <form onSubmit={handleLogin} className={styles.loginCard}>
        <h1 className={styles.title}>ChefNextDoor</h1>
        <input
          id="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.inputField}
        />
        <input
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={styles.inputField}
        />
        <button type="submit" className={styles.loginButton}>
          Login
        </button>
        <div className={styles.links}>
          <Link to="/forgot-password" className={styles.link}>
            Forgot Password
          </Link>
          <span className={styles.separator}></span>
          <Link to="/signup" className={styles.link}>
            Signup
          </Link>
        </div>
        <p className={styles.disclaimer}>
          By proceeding, you consent to get calls, WhatsApp or SMS/RCS messages, including by automated means, from ChefNextDoor and its affiliates to the number provided.
        </p>
      </form>
    </div>
  );
};

export default Login;
