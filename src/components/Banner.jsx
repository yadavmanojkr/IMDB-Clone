import React, { useEffect, useState } from "react";
import axios from "axios";

function Banner() {

  const [index, setIndex] = useState(0)


  const [films, setFilms] = useState([])

  useEffect(() => {
    // console.log("use effect fetched data");
    axios
      .get(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=4769696c3f83938f8e14aa14ea20abf4&language=en-US&page=1`
      )
      .then(function (res) {
        // console.log('Films', res.data.results);
        setFilms(res.data.results);
      });
  }, []);


  useEffect(() => {
    let idx = Math.floor(Math.random() * 10)
    setIndex(idx)
  }, [])


  let backdrops = films.map((film) => {
    return film.backdrop_path
  })

  let names = films.map((film) => {
    return film.title
  })





  return (
    <div
      className="h-[10vh] md:h-[85vh] bg-cover bg-center flex items-end"
      style={{
        backgroundImage:
          `url(https://image.tmdb.org/t/p/original/${backdrops[index]})`,
      }}
    >
      <div className="text-white w-full text-center text-2xl">
        {names[index]}
      </div>
    </div>
  );
}

export default Banner;