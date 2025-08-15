import React, { useEffect, useState } from "react";
import styles from "./Orders.module.css";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import type { OrderItem, OrderData } from "../../services/orderService";

interface Order extends Omit<OrderData, "createdAt"> {
  id: string;
  createdAt: any; // Firestore timestamp
}

export default function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const ordersRef = collection(db, "orders");
    const q = query(
      ordersRef,
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ordersData: Order[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Order, "id">),
      }));
      setOrders(ordersData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  if (!user) return null; // or a message to login

  if (loading) return <div className={styles.container}>Loading orders...</div>;

  if (orders.length === 0)
    return <div className={styles.container}>You have no orders yet.</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Your Orders</h1>
      {orders.map((order) => (
        <div key={order.id} className={styles.orderCard}>
          <div className={styles.orderHeader}>
            <div>Order ID: {order.id}</div>
            <div className={styles.orderStatus}>{order.status}</div>
          </div>
          <div>
            <strong>Name:</strong> {order.name} | <strong>Phone:</strong> {order.phone}
          </div>
          <div>
            <strong>Address:</strong> {order.address}
          </div>
          <div>
            <strong>Items:</strong>
            {order.items.map((item: OrderItem) => (
              <div key={item.orderItemId} className={styles.item}>
                <div className={styles.itemName}>
                  {item.dishName} x {item.quantity}
                </div>
                {item.specialInstructions && (
                  <div className={styles.instructions}>
                    Instructions: {item.specialInstructions}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
