import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const location = useLocation();

  // Pages with minimal navbar
  const minimalNavbarPages = ["/login", "/signup", "/verify-email"];

  if (minimalNavbarPages.includes(location.pathname)) {
    return (
      <nav className={styles.minimalNav}>
        <Link to="/" className={styles.logo}>
          ChefNextDoor
        </Link>
      </nav>
    );
  }

  // Full navbar for other pages
  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.logo}>
        ChefNextDoor
      </Link>
      <div className={styles.links}>
        <Link to="/home">Home</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/profile">Profile</Link>
      </div>
    </nav>
  );
};

export default Navbar;
