import React, { useState } from "react";
import styles from "./Checkout.module.css";
import { useCart, CartItem } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { saveOrder, NewOrderItem } from "../../services/orderService";
import { useAuth } from "../../context/AuthContext";

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!name || !phone || !address) {
    alert("Please fill in all fields.");
    return;
  }
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }
  try {
    // Convert cart items to NewOrderItem[] (exclude orderItemId)
    const orderItems: NewOrderItem[] = cart.map(({ id, dishName, quantity, specialInstructions }) => ({
      id,
      dishName,
      quantity,
      specialInstructions,
    }));

    await saveOrder({
      userId: user?.uid || "anonymous",
      name,
      phone,
      address,
      items: orderItems,
    });

    alert(`Thank you, ${name}! Your order has been placed.`);
    clearCart();
    navigate("/home");
    } catch (error) {
      alert("Failed to place order. Please try again.");
      console.error(error);
    }
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Checkout</h1>

      <div className={styles.itemList}>
        {cart.length === 0 && <p>Your cart is empty.</p>}
        {cart.map((item: CartItem) => (
          <div key={item.cartItemId} className={styles.item}>
            <div className={styles.itemName}>
              {item.dishName} x {item.quantity}
            </div>
          
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Name</label>
          <input
            type="text"
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Phone Number</label>
          <input
            type="tel"
            className={styles.input}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Delivery Address</label>
          <textarea
            className={styles.textarea}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>

        <button type="submit" className={styles.submitBtn}>
          Place Order
        </button>
      </form>
    </div>
  );
}
