import { useEffect, useState } from "react";
import "./App.css";

const API = "https://movie-app-agr8.onrender.com/movies";

function App() {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [img, setImg] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  // načtení filmů
  const loadMovies = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setMovies(data);
  };

  useEffect(() => {
    loadMovies();
  }, []);

  //  přidání filmu
  const addMovie = async (e) => {
    e.preventDefault();

    const payload = {
      title: title.trim(),
      genre: genre.trim(),
      img: img.trim()
    };

    console.log("POSÍLÁM:", payload);

    const res = await fetch("https://movie-app-agr8.onrender.com/movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    console.log("STATUS:", res.status);
    console.log("RESPONSE:", data);

    if (!res.ok) {
      alert(data.message);
      return;
    }

    setTitle("");
    setGenre("");
    setImg("");

    loadMovies();
  };

  // smazání filmu
  const deleteMovie = async (id) => {
    await fetch(`${API}/${id}`, {
      method: "DELETE"
    });

    loadMovies();
  };

  return (
      <div>

        {/* HEADER */}
        <header className="header">
        <span
            className="logo"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          🎬 MOVIE STREAM
        </span>
        </header>

        {/* DETAIL MODAL */}
        {selectedMovie && (
            <div
                className="movie-detail-overlay"
                onClick={() => setSelectedMovie(null)}
            >
              <div
                  className="movie-detail"
                  onClick={(e) => e.stopPropagation()}
              >
                <h2>{selectedMovie.title}</h2>

                <img src={selectedMovie.img} alt={selectedMovie.title} />

                <p><b>Žánr:</b> {selectedMovie.genre}</p>
                <p><b>Rok:</b> {selectedMovie.year}</p>
                <p><b>Hodnocení:</b> ⭐ {selectedMovie.rating}</p>
                <p><b>Hlavní herci:</b> {selectedMovie.actors}</p>
                <p>{selectedMovie.description}</p>

                <button onClick={() => setSelectedMovie(null)}>
                  Zavřít
                </button>
              </div>
            </div>
        )}

        {/* MAIN */}
        <div className="container">

          <h1>Filmy</h1>

          {/* ADD FORM */}
          <form onSubmit={addMovie}>
            <input
                placeholder="Název"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <input
                placeholder="Žánr"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
            />

            <input
                placeholder="URL obrázku"
                value={img}
                onChange={(e) => setImg(e.target.value)}
            />

            <button>Přidat</button>
          </form>

          {/* SEARCH + FILTER */}
          <div className="controls">

            <input
                className="search"
                placeholder="Hledat film..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <select
                className="filter"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">Vše</option>
              <option value="Action">Action</option>
              <option value="Sci-Fi">Sci-Fi</option>
              <option value="Drama">Drama</option>
              <option value="Romance">Romance</option>
              <option value="Fantasy">Fantasy</option>
            </select>

          </div>

          {/* MOVIE LIST */}
          <div className="movie-list">

            {movies
                .filter(movie =>
                    (filter === "all" || movie.genre === filter) &&
                    movie.title.toLowerCase().includes(search.toLowerCase())
                )
                .map((movie) => (
                    <div
                        key={movie.id}
                        className="movie-card"
                        onClick={() => setSelectedMovie(movie)}
                    >
                      <img src={movie.img} alt={movie.title} />

                      <h3>{movie.title}</h3>
                      <p>{movie.genre}</p>

                      <button
                          className="delete"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteMovie(movie.id);
                          }}
                      >
                        Smazat
                      </button>
                    </div>
                ))}

          </div>
        </div>

        {/* FOOTER */}
        <footer className="footer">
          © 2026 Movie App | React + Express
        </footer>

      </div>
  );
}

export default App;