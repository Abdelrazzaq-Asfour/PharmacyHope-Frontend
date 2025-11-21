"use client";

import { useEffect, useState } from "react";

export default function SearchMedicines() {
  const [allMedicines, setAllMedicines] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    async function load() {
      const res = await fetch("http://localhost:8080/api/medicines");
      const data = await res.json();
      setAllMedicines(data);
      setFiltered(data);
    }
    load();
  }, []);

  function handleSearch(value) {
    setQuery(value);
    const result = allMedicines.filter((med) =>
      med.name.toLowerCase().includes(value.toLowerCase())
    );
    setFiltered(result);
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Search Medicines</h1>

      <input
        type="text"
        value={query}
        placeholder="Search by medicine name..."
        onChange={(e) => handleSearch(e.target.value)}
        className="search-input"
      />

      <table className="styled-table" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price (JOD)</th>
            <th>Quantity</th>
            <th>Expiry Date</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((med) => (
            <tr key={med.id}>
              <td>{med.id}</td>
              <td>{med.name}</td>
              <td>{med.description}</td>
              <td>{med.price}</td>
              <td>{med.quantity}</td>
              <td>{med.expiry_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
