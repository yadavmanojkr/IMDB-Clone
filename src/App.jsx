import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import "./App.css";
import Banner from "./components/Banner";
import Movies from "./components/Movies";
import WatchList from "./components/WatchList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MovieContext } from "./components/MovieContext";
import Details from "./components/Details";


function App() {
  const [watchlist, setWatchlist] = useState([]);
  // search on navbar
  const [searchQuery, setSearchQuery] = useState('')
  const handleSearch = (query) => {
    setSearchQuery(query)
  }

  const handleAddToWatchList = (movieObj) => {
    let updatednewWatchList = [...watchlist, movieObj];
    setWatchlist(updatednewWatchList);
    localStorage.setItem("movies", JSON.stringify(updatednewWatchList));
    console.log(updatednewWatchList);
  };

  function DeleteFromWatchList(movieObj) {
    let filtredMovies = watchlist.filter((movie) => {
      return movie.id != movieObj.id;
    });

    setWatchlist(filtredMovies);
    localStorage.setItem("movies", JSON.stringify(filtredMovies));
  }

  useEffect(() => {
    let moviesFromLocalStorage = localStorage.getItem("movies");
    if (!moviesFromLocalStorage) {
      return;
    }
    setWatchlist(JSON.parse(moviesFromLocalStorage));
  }, []);

  return (
    <>
      <BrowserRouter>
        <MovieContext.Provider
          value={{
            handleAddToWatchList,
            DeleteFromWatchList,
            watchlist,
            setWatchlist,
          }}
        >
          <NavBar handleSearch={handleSearch} />

          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Banner />
                  <Movies searchQuery={searchQuery} />
                </>
              }
            />

            <Route path="/watchlist" element={<WatchList />} />

            <Route path="/details/:id" element={<Details />} />
          </Routes>
        </MovieContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
