import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebase";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  reloadUser: () => Promise<void>;
  resendCooldown: number; // seconds remaining for resend
  startResendCooldownFromSignup: () => void; // start cooldown immediately after signup
  startResendCooldown: () => void; // start cooldown from VerifyEmail page
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

let globalCooldownTimer: NodeJS.Timeout | null = null; // global timer to prevent multiple timers

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [resendCooldown, setResendCooldown] = useState(0);

  // Reload user to refresh emailVerified status etc
  const reloadUser = async () => {
    if (user) {
      await user.reload();
      setUser(auth.currentUser); // update with latest data
    }
  };

  // Starts a cooldown timer for resending verification email
  const startResendCooldown = () => {
    if (globalCooldownTimer) return; // prevent multiple timers

    setResendCooldown(60); // 60 seconds cooldown
    globalCooldownTimer = setInterval(() => {
      setResendCooldown(prev => {
        if (prev <= 1) {
          if (globalCooldownTimer) clearInterval(globalCooldownTimer);
          globalCooldownTimer = null;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Starts cooldown immediately after signup
  const startResendCooldownFromSignup = () => {
    startResendCooldown();
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
      if (globalCooldownTimer) clearInterval(globalCooldownTimer);
    };
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      reloadUser,
      resendCooldown,
      startResendCooldown,
      startResendCooldownFromSignup
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
