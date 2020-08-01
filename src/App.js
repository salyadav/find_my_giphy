import React, { useState } from "react";
import "./styles.css";

export default function App() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState(null);
  const [changeFlag, setChangeFlag] = useState(false);

  const search = () => {
    if (!changeFlag) return;
    if (!query) {
      setData(undefined);
      return;
    }
    setChangeFlag(false);
    fetch(
      `https://api.giphy.com/v1/gifs/search?q=${query}&api_key=CabPkxTFYOJhqaCNuxZPX7RR2IUmPZ6q`
    )
      .then(response => response.json())
      .then(json => {
        setData(
          json.data.sort((a, b) => {
            const a_date = new Date(a.trending_datetime);
            const b_date = new Date(b.trending_datetime);
            if (b_date === a_date) {
              return a.images.fixed_height.width - b.images.fixed_height.width;
            } else return b_date - a_date;
          })
        );
        console.log(json.data);
      });
  };

  return (
    <div className="App">
      <h1>Words don't express...</h1>
      <div>
        <form
          className="giph-form"
          onSubmit={e => {
            e.preventDefault();
            search();
          }}
        >
          <input
            value={query}
            type="text"
            placeholder="Find my giphy..."
            onChange={e => {
              setChangeFlag(true);
              setQuery(e.target.value);
            }}
          />
          <input type="submit" className="btn btn-outline-primary" />
        </form>
      </div>
      {data && (
        <div>
          <h2>Results for "{query}"</h2>
          <ul className="gif-flex">
            {data.map(d => (
              <li key={d.id}>
                <img src={d.images.fixed_height.url} alt={d.title} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
