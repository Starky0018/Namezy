import React, { useState } from "react";
import NameSuggestion from "./NameSuggestion";
import TrendingKeywords from "./TrendingKeywords";
import { exportCSV } from "./ExportCSV";
import { exportPDF } from "./ExportPDF";

function App() {
  const [keywords, setKeywords] = useState("");
  const [style, setStyle] = useState("brandable");
  const [names, setNames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  const generateNames = async () => {
    setLoading(true);
    const res = await fetch("http://localhost:5000/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ keywords, style }),
    });
    const data = await res.json();
    setNames(data.names);
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 40 }}>
      <h1>Namezy: AI Startup Name Generator</h1>
      <TrendingKeywords />
      <input
        type="text"
        placeholder="Enter keywords/industry..."
        value={keywords}
        onChange={e => setKeywords(e.target.value)}
        style={{ width: "100%", marginBottom: 10 }}
      />
      <select value={style} onChange={e => setStyle(e.target.value)} style={{ marginBottom: 10 }}>
        <option value="brandable">Brandable</option>
        <option value="short">Short</option>
        <option value="fun">Fun</option>
      </select>
      <button onClick={generateNames} disabled={loading}>
        {loading ? "Generating..." : "Generate Names"}
      </button>
      <div style={{ marginTop: 20, marginBottom: 10 }}>
        <button onClick={() => exportCSV(names.map(n => n.name))}>Export as CSV</button>
        <button onClick={() => exportPDF(names.map(n => n.name))} style={{ marginLeft: 10 }}>Export as PDF</button>
      </div>
      <ul>
        {names.map(({ name, domainAvailable }, i) => (
          <NameSuggestion
            key={i}
            name={name}
            domainAvailable={domainAvailable}
            onFavorite={() => setFavorites([...favorites, name])}
          />
        ))}
      </ul>
      <h2>Favorites</h2>
      <ul>
        {favorites.map((fav, i) => <li key={i}>{fav}</li>)}
      </ul>
    </div>
  );
}

export default App;