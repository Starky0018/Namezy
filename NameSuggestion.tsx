import React from "react";

export default function NameSuggestion({ name, domainAvailable, onFavorite }) {
  return (
    <li style={{ marginBottom: 8 }}>
      <span style={{ fontWeight: "bold" }}>{name}</span>
      <span style={{ color: domainAvailable ? "green" : "red", marginLeft: 10 }}>
        {domainAvailable ? "Domain available!" : "Domain taken"}
      </span>
      <button onClick={onFavorite} style={{ marginLeft: 10 }}>❤️</button>
    </li>
  );
}