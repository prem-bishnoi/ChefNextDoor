import { db } from "../firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

// This interface represents an item **before** it has a unique orderItemId (e.g., from cart)
export interface NewOrderItem {
  id: string;
  dishName: string;
  quantity: number;
  specialInstructions?: string;
}

// This interface represents an item **after** unique ID is assigned
export interface OrderItem extends NewOrderItem {
  orderItemId: string;
}

export interface OrderData {
  userId: string;
  name: string;
  phone: string;
  address: string;
  items: OrderItem[];  // must include orderItemId here
  status: "Pending" | "Preparing" | "Ready" | "Delivered";
  createdAt: Timestamp;
}

// Accept order input without orderItemId, assign unique IDs internally
export async function saveOrder(order: Omit<OrderData, "createdAt" | "status" | "items"> & { items: NewOrderItem[] }) {
  const ordersRef = collection(db, "orders");

  const itemsWithIds: OrderItem[] = order.items.map(item => ({
    ...item,
    orderItemId: uuidv4(),
  }));

  const docRef = await addDoc(ordersRef, {
    ...order,
    items: itemsWithIds,
    status: "Pending",
    createdAt: serverTimestamp(),
  });

  return docRef.id;
}
