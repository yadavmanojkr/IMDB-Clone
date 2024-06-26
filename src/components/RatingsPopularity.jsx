import React from "react";

function RatingsPopularity({vote , popularity , revenue}) {
  return (
    <>
      <div className=" gap-10 grid-cols-2 flex group justify-between">
        <div className="font-black flex flex-col">
          <span className="text-yellow-500 text-xl">IMDB SCORE</span>
          <span className="text-3xl ml-8 flex gap-x-1 items-center group-hover:text-yellow-600">
            {vote} &#11088;
           
          </span>
        </div>

        <div className="font-black flex flex-col">
          <span className="text-red-500 text-xl">POPULARITY</span>
          <span className="text-3xl ml-1 flex gap-x-1 items-center group-hover:text-yellow-600">
            {popularity} &#128293;
           
          </span>
        </div>

        <div className="font-black flex flex-col">
          <span className="text-blue-500 text-xl">BOX OFFICE</span>
          <span className="text-3xl flex gap-x-1 items-center group-hover:text-yellow-600">
            {revenue} M &#128176;
           
          </span>
        </div>
      </div>
    </>
  );
}

export default RatingsPopularity;
