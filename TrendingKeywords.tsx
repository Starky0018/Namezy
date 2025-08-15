import React, { useEffect, useState } from "react";

export default function TrendingKeywords() {
  const [trending, setTrending] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/trending")
      .then(res => res.json())
      .then(data => setTrending(data.trending));
  }, []);
  return (
    <div style={{ marginBottom: 20 }}>
      <h3>Trending Keywords</h3>
      <ul>
        {trending.map(({ keyword, count }) => (
          <li key={keyword}>{keyword} ({count})</li>
        ))}
      </ul>
    </div>
  );
}