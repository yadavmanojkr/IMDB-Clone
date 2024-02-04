import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import axios from "axios";
import Pagination from "./Pagination";

function Movies({ handleAddToWatchList, watchlist, searchQuery }) {
  const [movies, setMovies] = useState([]);
  const [pageNo, setPageNo] = useState(1);

  const handleNext = () => {
    setPageNo(pageNo + 1);
  };

  const handlePrevious = () => {
    if (pageNo === 1) {
      return;
    }
    setPageNo(pageNo - 1);
  };

  useEffect(() => {
    const url = searchQuery
      ? `https://api.themoviedb.org/3/search/movie?api_key=4769696c3f83938f8e14aa14ea20abf4&language=en-US&query=${searchQuery}&page=${pageNo}`
      : `https://api.themoviedb.org/3/trending/movie/day?api_key=4769696c3f83938f8e14aa14ea20abf4&language=en-US&page=${pageNo}`;

    axios.get(url).then(function (res) {
      setMovies(res.data.results);
    });
  }, [pageNo, searchQuery]);

  return (
    <div>
      <div className="text-white text-2xl font-bold text-center m-5">
        <h1>{searchQuery ? `Search Results for "${searchQuery}"` : "Trending Movies"}</h1>
      </div>

      <div className="flex justify-evenly flex-wrap gap-8">
        {movies.map((movieObj) => {
          return (
            <MovieCard
              key={movieObj.id}
              name={movieObj.title}
              posterPath={movieObj.poster_path}
              movieObject={movieObj}
              handleAddToWatchList={handleAddToWatchList}
              watchlist={watchlist}
            />
          );
        })}
      </div>
      <Pagination
        nextPageFn={handleNext}
        previousPageFn={handlePrevious}
        pageNumber={pageNo}
      />
    </div>
  );
}

export default Movies;
