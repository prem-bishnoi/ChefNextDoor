import React, { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { sendEmailVerification } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

const VerifyEmail = () => {
  const { user, reloadUser, resendCooldown, startResendCooldown } = useAuth();
  const navigate = useNavigate();

  // Auto-check if user is verified
  useEffect(() => {
    const checkVerified = async () => {
      if (user) {
        await reloadUser();
        if (user.emailVerified) {
          navigate("/profile"); // redirect to profile when verified
        }
      }
    };

    const interval = setInterval(checkVerified, 2000); // check every 2s
    return () => clearInterval(interval);
  }, [user, reloadUser, navigate]);

  const handleResend = async () => {
    if (user && resendCooldown === 0) {
      try {
        await sendEmailVerification(user);
        startResendCooldown();
      } catch (err: any) {
        console.error("Error sending verification email:", err.code);
        if (err.code === "auth/too-many-requests") {
          alert("You are clicking too fast. Please wait before trying again.");
        }
      }
    }
  };

  const handleVerifiedClick = async () => {
    if (user) {
      await reloadUser();
      if (user.emailVerified) {
        navigate("/profile");
      } else {
        alert("Email not verified yet. Please click the link in your inbox.");
      }
    }
  };

  return (
    <div className="verify-email-page">
      <h2>Verify Your Email</h2>
      <p>
        A verification email has been sent to <strong>{user?.email}</strong>.
        Please check your inbox and click the link to verify your account.
      </p>

      <button onClick={handleResend} disabled={resendCooldown > 0}>
        {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend Email"}
      </button>

      <button onClick={handleVerifiedClick} style={{ marginLeft: "10px" }}>
        I have verified
      </button>

      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
      <p>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
};

export default VerifyEmail;
