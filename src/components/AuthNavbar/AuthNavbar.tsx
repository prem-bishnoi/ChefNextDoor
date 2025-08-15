import React from "react";
import styles from "./AuthNavbar.module.css";

const AuthNavbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.brand}>ChefNextDoor</div>
    </nav>
  );
};

export default AuthNavbar;
