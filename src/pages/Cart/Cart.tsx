import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Cart.module.css";
import { useCart, CartItem } from "../../context/CartContext";


export default function Cart() {
  const { cart, removeFromCart, addToCart, clearCart } = useCart();
  const navigate = useNavigate();

  const increaseQty = (item: CartItem) => {
    addToCart({ ...item, quantity: 1 });
  };

  const decreaseQty = (item: CartItem) => {
    if (item.quantity === 1) {
      removeFromCart(item.cartItemId);
    } else {
      addToCart({ ...item, quantity: -1 });
    }
  };

  if (cart.length === 0) return <div className={styles.container}>Your cart is empty.</div>;

  return (
    <div className={styles.container}>
      <h1>Your Cart</h1>
      {cart.map((item) => (
        <div key={item.cartItemId} className={styles.cartItem}>
          <div className={styles.header}>
            <div className={styles.dishName}>{item.dishName}</div>
            <div className={styles.quantitySelector}>
              <button className={styles.quantityBtn} onClick={() => decreaseQty(item)}>
                -
              </button>
              <div>{item.quantity}</div>
              <button className={styles.quantityBtn} onClick={() => increaseQty(item)}>
                +
              </button>
            </div>
          </div>

          {/* Show special instructions as read-only text */}
          {item.specialInstructions && (
            <div style={{ fontStyle: "italic", marginTop: 8, color: "#555" }}>
              Special instructions: {item.specialInstructions.length > 50 ? item.specialInstructions.slice(0, 50) + "..." : item.specialInstructions}
            </div>
          )}

          <button className={styles.removeBtn} onClick={() => removeFromCart(item.cartItemId)}>
            Remove
          </button>
        </div>
      ))}

      <div className={styles.actions}>
        <button className={styles.actionBtn} onClick={() => clearCart()}>
          Clear Cart
        </button>
        <button className={styles.actionBtn} onClick={() => navigate("/checkout")}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
