import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";
import styles from "./ForgotPassword.module.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent. Check your inbox.");
    } catch (error: any) {
      setMessage(error.message || "Failed to send reset email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleReset}>
      <h2 className={styles.heading}>Forgot Password</h2>
      <input
        className={styles.input}
        type="email"
        placeholder="Enter your email"
        required
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
      />
      <button className={styles.button} type="submit" disabled={loading}>
        {loading ? "Sending..." : "Send Reset Email"}
      </button>
      {message && <p className={styles.message}>{message}</p>}
    </form>
  );
}
