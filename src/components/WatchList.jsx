import React, { useContext, useEffect, useState } from "react";
import genreids from "../utility/genre";
import { MovieContext } from "./MovieContext";

function WatchList() {
  const { watchlist, setWatchlist, DeleteFromWatchList } =
    useContext(MovieContext);
  const [search, setSearch] = useState("");
  const [genreList, setGenreList] = useState([]);
  const [currGenre, setCurrGenre] = useState("All Genres");

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleFilter = (genre) => {
    setCurrGenre(genre);
  };

  useEffect(() => {
    let temp = watchlist.map((movieObj) => {
      return genreids[movieObj.genre_ids[0]];
    });

    temp = new Set(temp);

    setGenreList(["All Genres", ...temp]);
  }, [watchlist]);

  const handleAscendingRatings = () => {
    let sortedAscending = [...watchlist].sort((movieObjA, movieObjB) => {
      return movieObjA.vote_average - movieObjB.vote_average;
    });

    setWatchlist([...sortedAscending]);
  };

  const handleDescendingRatings = () => {
    let sortedDescending = [...watchlist].sort((movieObjA, movieObjB) => {
      return movieObjB.vote_average - movieObjA.vote_average;
    });

    setWatchlist([...sortedDescending]);
  };

  return (
    <>
      {/* Genre Based Filtering */}
      <div className="flex justify-center m-4">
        {genreList.map((genre) => (
          <div
            key={genre}
            onClick={() => handleFilter(genre)}
            className={
              currGenre === genre
                ? "mx-4 flex justify-center items-center bg-blue-400 h-[3rem] w-[9rem] text-white font-bold border rounded-xl"
                : "flex justify-center items-center h-[3rem] w-[9rem] bg-gray-400/50 rounded-xl text-white font-bold mx-4"
            }
          >
            {genre}
          </div>
        ))}
      </div>

      {/* Search Field */}
      <div className="flex justify-center my-10">
        <input
          placeholder="Search Movies"
          className="h-[3rem] w-[18rem] bg-gray-200 px-4 outline-none border border-slate-600"
          type="text"
          onChange={handleSearch}
          value={search}
        />
      </div>

      {/* Watchlist Table */}
      <div className="text-white m-8">
        <table className="w-full text-center">
          <thead className="border border-gray-200 rounded-lg bg-gray-200">
            <tr>
              <th>Name</th>
              <th>
                <i
                  onClick={handleAscendingRatings}
                  className="fa-solid fa-arrow-up"
                ></i>{" "}
                Ratings{" "}
                <i
                  onClick={handleDescendingRatings}
                  className="fa-solid fa-arrow-down"
                ></i>
              </th>
              <th>Popularity</th>
              <th>Genre</th>
              <th>Delete Movies</th>
            </tr>
          </thead>

          <tbody>
            {watchlist
              .filter((movieObj) => {
                if (currGenre === "All Genres") {
                  return true;
                } else {
                  return genreids[movieObj.genre_ids[0]] === currGenre;
                }
              })
              .filter((movieObj) =>
                movieObj.title.toLowerCase().includes(search.toLowerCase())
              )
              .map((movieObj) => (
                <tr key={movieObj.id} className="border-b-2">
                  <td className="flex items-center px-6 py-4">
                    <img
                      className="h-[6rem] w-[10rem]"
                      src={`https://image.tmdb.org/t/p/original/${movieObj.poster_path}`}
                      alt={movieObj.title}
                    />
                    <div className="mx-10">{movieObj.title}</div>
                  </td>

                  <td>{movieObj.vote_average}</td>
                  <td>{movieObj.popularity}</td>
                  <td>{genreids[movieObj.genre_ids[0]]}</td>

                  <td
                    onClick={() => DeleteFromWatchList(movieObj)}
                    className="text-red-500 cursor-pointer"
                  >
                    Delete
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default WatchList;
