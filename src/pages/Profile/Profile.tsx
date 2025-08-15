import React, { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import { useAuth } from "../../context/AuthContext";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function Profile() {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProfile() {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setName(data.name || "");
          setPhone(data.phone || "");
          setAddress(data.address || "");
        }
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!user) {
      alert("User not logged in");
      return;
    }

    if (!name || !phone || !address) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const docRef = doc(db, "users", user.uid);
      await setDoc(docRef, { name, phone, address });
      alert("Profile saved successfully.");
    } catch (err) {
      setError("Failed to save profile.");
      console.error(err);
    }
  };

  if (!user) return <div>Please login to edit profile.</div>;

  if (loading) return <div>Loading profile...</div>;

  return (
    <div className={styles.container}>
      <h1>Your Profile</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Name
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Phone
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </label>
        <label>
          Address
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </label>
        {error && <div style={{ color: "red" }}>{error}</div>}
        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
}
