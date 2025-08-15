import React, { useState } from "react";
import styles from "./FoodCard.module.css";
import { useCart } from "../../context/CartContext";

interface FoodCardProps {
  id: string;
  imageUrl: string;
  dishName: string;
  cookName: string;
  tags: string[];
  calories: number;
  rating: number;
  allergens?: string[];
  description?: string;
}

export default function FoodCard({
  id,
  imageUrl,
  dishName,
  cookName,
  tags,
  calories,
  rating,
  allergens = [],
  description = "",
}: FoodCardProps) {
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [showSpecialInstructions, setShowSpecialInstructions] = useState(false);
  const [instructions, setInstructions] = useState("");

  const stars = Array.from({ length: 5 }, (_, i) =>
    i < Math.floor(rating) ? "★" : "☆"
  ).join("");

  const increaseQty = () => setQuantity((q) => Math.min(q + 1, 20));
  const decreaseQty = () => setQuantity((q) => Math.max(q - 1, 1));

  const handleAddClick = () => setShowSpecialInstructions(true);
  const handleCancelClick = () => {
    setShowSpecialInstructions(false);
    setInstructions("");
    setQuantity(1);
  };
  const handleConfirmClick = () => {
    addToCart({ id, dishName, quantity, specialInstructions: instructions });
    alert(`${dishName} (${quantity}) added to cart!`);
    setShowSpecialInstructions(false);
    setInstructions("");
    setQuantity(1);
  };

  return (
    <div className={styles.card}>
      <img src={imageUrl} alt={dishName} className={styles.image} />
      <div className={styles.title}>{dishName}</div>
      <div className={styles.cookName}>By {cookName}</div>
      <div className={styles.tags}>
        {tags.map((tag) => (
          <div key={tag} className={styles.tag}>
            {tag}
          </div>
        ))}
      </div>
      <div className={styles.infoRow}>
        <div>{calories} kcal</div>
        <div className={styles.rating}>{stars}</div>
      </div>

      {/* Quantity selector always visible */}
      <div style={{ display: "flex", alignItems: "center", marginTop: 10, gap: 10 }}>
        <button onClick={decreaseQty} style={{ padding: "4px 10px" }}>-</button>
        <div>{quantity}</div>
        <button onClick={increaseQty} style={{ padding: "4px 10px" }}>+</button>
      </div>

      {/* Show Add to Cart or expanded special instructions */}
      {!showSpecialInstructions && (
        <button
          onClick={handleAddClick}
          style={{ marginTop: 10, width: "100%", padding: 8 }}
        >
          Add to Cart
        </button>
      )}

      {showSpecialInstructions && (
        <div style={{ marginTop: 10 }}>
          {description && (
            <p style={{ fontSize: 14, color: "#555" }}>{description}</p>
          )}

          {allergens.length > 0 && (
            <p style={{ fontSize: 12, color: "#a00" }}>
              <strong>Allergens:</strong> {allergens.join(", ")}
            </p>
          )}

          <textarea
            placeholder="Special instructions (optional)"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            style={{
              width: "100%",
              resize: "vertical",
              minHeight: 60,
              borderRadius: 6,
              padding: 8,
              fontSize: 14,
              fontFamily: "Arial, sans-serif",
              marginTop: 8,
            }}
          />

          <div style={{ marginTop: 8, display: "flex", gap: 10 }}>
            <button onClick={handleConfirmClick} style={{ flex: 1, padding: 8 }}>
              Confirm
            </button>
            <button
              onClick={handleCancelClick}
              style={{
                flex: 1,
                padding: 8,
                backgroundColor: "#ccc",
                color: "#333",
                borderRadius: 4,
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
