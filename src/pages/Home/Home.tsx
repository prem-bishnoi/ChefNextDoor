import React from "react";
import FoodCard from "../../components/FoodCard/FoodCard";
import styles from "./Home.module.css";

const sampleDishes = [
  {
    id: "dish1",
    imageUrl: "https://images.unsplash.com/photo-1604908177521-6af7e7a2c5b4?auto=format&fit=crop&w=800&q=80",
    dishName: "Paneer Tikka",
    cookName: "Anita Sharma",
    tags: ["Low Oil", "Vegetarian"],
    calories: 320,
    rating: 4.5,
  },
  {
    id: "dish2",
    imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
    dishName: "Mixed Veg Curry",
    cookName: "Rajesh Kumar",
    tags: ["Vegan", "Gluten-Free"],
    calories: 280,
    rating: 4.0,
  },
  {
    id: "dish3",
    imageUrl: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=800&q=80",
    dishName: "Masala Dosa",
    cookName: "Meena Patel",
    tags: ["Low Oil", "Vegetarian"],
    calories: 350,
    rating: 5.0,
  },
];

export default function Home() {
  return (
    <div className={styles.container}>
      <h1>Welcome to HomeKitchen</h1>
      <p>Explore delicious home-cooked meals from talented cooks near you.</p>
      <div className={styles.grid}>
        {sampleDishes.map((dish, idx) => (
          <FoodCard key={idx} {...dish} />
        ))}
      </div>
    </div>
  );
}
