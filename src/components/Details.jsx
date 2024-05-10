import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import CastDetails from "./CastDetails";
import CrewDetails from "./CrewDetails";
import RatingsPopularity from "./RatingsPopularity";

const Details = () => {
  const { id } = useParams();
  const [movieDetail, setMovieDetail] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=4769696c3f83938f8e14aa14ea20abf4&language=en-US&append_to_response=credits,videos`
        );
        setMovieDetail(response.data);
      } catch (error) {
        setError(error);
      }
    };

    fetchMovieDetail();
  }, [id]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!movieDetail) {
    return <div>Loading...</div>;
  }

  const { title, genres, backdrop_path, videos, credits, popularity, vote_average, revenue } = movieDetail;

  return (
    <>
      <div className="flex justify-center mb-4">
        {revenue && <RatingsPopularity vote={vote_average.toFixed(1)} popularity={popularity.toFixed(2)} revenue={revenue / 1000000} />}
      </div>
      <div
        className="flex flex-row items-end justify-between mt-4 bg-black/10 bg-blend-multiply rounded-3xl h-[40rem] overflow-hidden bg-cover bg-center px-7 pt-4 pb-6 text-white"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${backdrop_path})`,
        }}
      >
        <div className="bg-gradient-to-r from-black/30 to-transparent -mx-7 -mb-6 px-7 pb-6 pt-2">
          <span className="uppercase text-3xl font-semibold drop-shadow-lg ">
            {title}
          </span>
          <div className="text-s text-gray-200 mt-2 ">
            {genres &&
              genres.map((genre, index) => <Link key={index} className="mr-3">{genre.name}</Link>)}
          </div>
          <div className="mt-4 flex space-x-3 items-center">
            {videos && (
              <a
                href={`https://www.youtube.com/watch?v=${videos.results[0].key}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-red-600 hover:bg-red-700 rounded-lg text-xs inline-block"
              >
                Watch
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="text-2xl font-bold text-center m-5">
        <h2>Cast</h2>
        <div className="flex flex-row flex-wrap justify-center gap-5">
          {credits && credits.cast.slice(0, 8).map((cast) => <CastDetails key={cast.id} imageURL={cast.profile_path} name={cast.name} characterName={cast.character} />)}
        </div>
      </div>

      <div className="text-2xl font-bold text-center m-5">
        <h2>Crew</h2>
        <div className="flex flex-row flex-wrap justify-center gap-5">
          {credits && credits.crew.slice(0, 8).map((crew) => <CrewDetails key={crew.id} imageURL={crew.profile_path} name={crew.name} department={crew.known_for_department} />)}
        </div>
      </div>
    </>
  );
};

export default Details;
