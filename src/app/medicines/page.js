"use client";
import "./medicinesGlobals.css";
import { useEffect, useState } from "react";
import { getAuth } from "../utils/auth"; 

export default function MedicinesPage() {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [addingId, setAddingId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

 
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newQty, setNewQty] = useState("");
  const [newExpiry, setNewExpiry] = useState("");


  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    quantity: "",
    expiry_date: "",
  });


  async function fetchMedicines() {
    const response = await fetch("http://localhost:8080/api/medicines");
    if (!response.ok) {
      throw new Error("Failed to fetch medicines");
    }
    const medicines = await response.json();
    setData(medicines);
    setFiltered(medicines);
  }

  useEffect(() => {
    async function loadData() {
      try {
        await fetchMedicines();
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadData();


    const user = getAuth();
    if (user && user.role === "ADMIN") {
      setIsAdmin(true);
    }
  }, []);


  function handleSearch(value) {
    setQuery(value);
    const result = data.filter((med) =>
      med.name.toLowerCase().includes(value.toLowerCase())
    );
    setFiltered(result);
  }


  async function handleAddToOrder(med) {
    try {
      setMessage("");
      setAddingId(med.id);

      const quantity = 1;

      const res = await fetch("http://localhost:8080/api/order-items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order: { id: 1 },
          medicine: { id: med.id },
          quantity: quantity,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to add medicine to order");
      }

      await fetchMedicines(); 
      setMessage(`added  ${med.name} to the request

 ✅`);
    } catch (err) {
      console.error(err);
      setMessage("An error occurred while adding the medication to the order ❌");
    } finally {
      setAddingId(null);
    }
  }


  async function handleCreateMedicine(e) {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("http://localhost:8080/api/medicines", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newName,
          description: newDesc,
          price: Number(newPrice),
          quantity: Number(newQty),
          expiry_date: newExpiry,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to create medicine");
      }

      setNewName("");
      setNewDesc("");
      setNewPrice("");
      setNewQty("");
      setNewExpiry("");

      await fetchMedicines();
      setMessage("Done ✅");
    } catch (err) {
      console.error(err);
      setMessage("Failed ❌");
    }
  }

  function startEdit(med) {
    setEditMode(true);
    setEditData({
      id: med.id,
      name: med.name,
      description: med.description,
      price: med.price,
      quantity: med.quantity,
      expiry_date: med.expiry_date,
    });
  }

  async function saveEdit(e) {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch(
        `http://localhost:8080/api/medicines/${editData.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editData),
        }
      );

      if (!res.ok) throw new Error("Failed to update");

      await fetchMedicines();
      setMessage("  The drug has been successfully modified ✅");
      setEditMode(false);
      setEditData({
        id: "",
        name: "",
        description: "",
        price: "",
        quantity: "",
        expiry_date: "",
      });
    } catch (err) {
      console.error(err);
      setMessage("Error while editing ❌");
    }
  }


  function cancelEdit() {
    setEditMode(false);
    setEditData({
      id: "",
      name: "",
      description: "",
      price: "",
      quantity: "",
      expiry_date: "",
    });
  }

   // (Admin) Delete medication

  async function handleDeleteMedicine(med) {
    if (!window.confirm(`Are you sure about deleting      ${med.name} ؟`)) return;

    try {
      setMessage("");

      const res = await fetch(
        `http://localhost:8080/api/medicines/${med.id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to delete medicine");
      }

      await fetchMedicines();
      setMessage("Medicine deleted successfully ✅");
    } catch (err) {
      console.error(err);
      setMessage("Failed to delete medication ❌");
    }
  }

  if (loading)
    return <div style={{ padding: "20px" }}>Loading medicines...</div>;
  if (error)
    return (
      <div style={{ padding: "20px", color: "red" }}>Error: {error}</div>
    );

  return (
    <div style={{ padding: "20px" }}>
      <h1>Pharmacy Medicines</h1>

         {/* Form of adding a new drug (addict only) */}

      {isAdmin && (
        <form
          onSubmit={handleCreateMedicine}
          style={{
            marginBottom: "20px",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "8px",
          }}
        >
          <h3>Add New Medicine (Admin)</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            <input
              placeholder="Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              required
            />
            <input
              placeholder="Description"
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              required
            />
            <input
              type="number"
              step="0.01"
              placeholder="Price"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Quantity"
              value={newQty}
              onChange={(e) => setNewQty(e.target.value)}
              required
            />
            <input
              type="date"
              placeholder="Expiry Date"
              value={newExpiry}
              onChange={(e) => setNewExpiry(e.target.value)}
              required
            />
            <button type="submit" style={{ padding: "5px 10px" }}>
              Save
            </button>
          </div>
        </form>
      )}

           {/* Medication modification form (shows only when Edit) */}

      {isAdmin && editMode && (
        <form
          onSubmit={saveEdit}
          style={{
            background: "#f5f5f5",
            padding: "15px",
            borderRadius: "10px",
            marginBottom: "20px",
            border: "1px solid #ddd",
          }}
        >
          <h3>Edit Medicine (ID: {editData.id})</h3>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            <input
              type="text"
              value={editData.name}
              onChange={(e) =>
                setEditData({ ...editData, name: e.target.value })
              }
              placeholder="Name"
              required
            />

            <input
              type="text"
              value={editData.description}
              onChange={(e) =>
                setEditData({ ...editData, description: e.target.value })
              }
              placeholder="Description"
              required
            />

            <input
              type="number"
              step="0.01"
              value={editData.price}
              onChange={(e) =>
                setEditData({ ...editData, price: e.target.value })
              }
              placeholder="Price"
              required
            />

            <input
              type="number"
              value={editData.quantity}
              onChange={(e) =>
                setEditData({ ...editData, quantity: e.target.value })
              }
              placeholder="Quantity"
              required
            />

            <input
              type="date"
              value={editData.expiry_date}
              onChange={(e) =>
                setEditData({ ...editData, expiry_date: e.target.value })
              }
              placeholder="Expiry Date"
              required
            />
          </div>

          <div style={{ marginTop: "10px" }}>
            <button
              type="submit"
              style={{ padding: "8px 15px", marginRight: "10px" }}
            >
              Save
            </button>

            <button
              type="button"
              onClick={cancelEdit}
              style={{
                padding: "8px 15px",
                background: "gray",
                color: "white",
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <input
        type="text"
        value={query}
        placeholder="Search by medicine name..."
        onChange={(e) => handleSearch(e.target.value)}
        className="search-input"
        style={{ marginBottom: "20px", padding: "8px", width: "300px" }}
      />

      {message && (
        <p
          style={{
            marginBottom: "10px",
            color: message.includes("NO") ? "red" : "green",
          }}
        >
          {message}
        </p>
      )}

      <table className="styled-table" border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price (JOD)</th>
            <th>Quantity</th>
            <th>Expiry Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((med) => {
            const qty = Number(med.quantity);
            return (
              <tr key={med.id}>
                <td>{med.id}</td>
                <td>{med.name}</td>
                <td>{med.description}</td>
                <td>{med.price}</td>
                <td>{qty}</td>
                <td>{med.expiry_date}</td>
                
                <td>
    {/*  Add to Order only appears for regular username */}
  {!isAdmin && qty > 0 && (
    <button
      onClick={() => handleAddToOrder(med)}
      disabled={addingId === med.id}
      style={{
        padding: "5px 10px",
        cursor: "pointer",
        marginRight: "5px",
      }}
    >
      {addingId === med.id ? "Adding..." : "Add to Order"}
    </button>
  )}

 {/* Out of stock message to everyone if quantity is 0 */}
  {qty <= 0 && (
    <span
      style={{
        color: "gray",
        fontStyle: "italic",
        marginRight: "5px",
      }}
    >
      Out of stock
    </span>
  )}

  {/*Admin buttons only*/}

  {isAdmin && (
    <>
      <button
        onClick={() => startEdit(med)}
        style={{ padding: "5px 8px", marginRight: "5px" }}
      >
        Edit
      </button>
      <button
        onClick={() => handleDeleteMedicine(med)}
        style={{ padding: "5px 8px" }}
      >
        Delete
      </button>
    </>
  )}
</td>





              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
