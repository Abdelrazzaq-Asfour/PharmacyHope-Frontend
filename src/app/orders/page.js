"use client";

import "../medicines/medicinesGlobals.css";
import { useEffect, useState } from "react";

export default function OrdersPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const currentOrderId = 1;

  useEffect(() => {
    loadItems();
  }, []);

  async function loadItems() {
    try {
      const res = await fetch("http://localhost:8080/api/order-items");
      const data = await res.json();

      const filtered = data.filter(
        (item) => item.order && item.order.id === currentOrderId
      );

      setItems(filtered);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function deleteItem(id) {
    try {
      const res = await fetch(`http://localhost:8080/api/order-items/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete item");
      }

      loadItems();
    } catch (err) {
      console.error(err);
      alert("Error deleting item");
    }
  }

  const total = items.reduce(
    (sum, item) => sum + Number(item.subtotal || 0),
    0
  );

  if (loading) return <div style={{ padding: "20px" }}>Loading order...</div>;
  if (error) return <div style={{ padding: "20px", color: "red" }}>Error: {error}</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Order #{currentOrderId} Items</h1>

      <table
        className="styled-table"
        border="1"
        cellPadding="8"
        cellSpacing="0"
        style={{ marginTop: "20px" }}
      >
        <thead>
          <tr>
            <th>Medicine Name</th>
            <th>Quantity</th>
            <th>Unit Price (JOD)</th>
            <th>Subtotal (JOD)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.medicine?.name}</td>
              <td>{item.quantity}</td>
              <td>{item.unit_price}</td>
              <td>{item.subtotal}</td>
              <td>
                <button
                  onClick={() => deleteItem(item.id)}
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "red",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ marginTop: "15px" }}>Total: {total} JOD</h3>
    </div>
  );
}
