import { useEffect } from "react";
import React from "react";

function Filter({ resources, setActiveOption, setFiltered, activeOption }) {
  useEffect(() => {
    if (activeOption == "all") {
      setFiltered(resources);
      return;
    }
    const filtered = resources.filter((card) => card.genre === activeOption);
    setFiltered(filtered);
    // console.log(filtered);
  }, [activeOption]);

  return (
    <div className="text-white flex mb-5 md:mt-16 align-center">
      <h1 className="text-white text-lg ml-2 md:text-3xl md:mt-3 font-bold ">
        Filter:
      </h1>
      <div className="flex flex-wrap flex-col sm:flex-row	">
        <button
          onClick={() => setActiveOption("all")}
          className="bg-red px-8 md:px-14 md:py-3 border-2 ml-5 mb-2 lg:ml-10 "
        >
          All
        </button>
        <button
          onClick={() => setActiveOption("github")}
          className="bg-red px-8 md:px-14 md:py-3 border-2 ml-5 mb-2 sm:ml-10"
        >
          Github repo
        </button>
        <button
          onClick={() => setActiveOption("twitter")}
          className="bg-red px-8 md:px-14 md:py-3 border-2 ml-5 mb-2 sm:ml-10"
        >
          Twitter
        </button>
        <button
          onClick={() => setActiveOption("projects")}
          className="bg-red px-8 md:px-14 md:py-3 border-2 ml-5 mb-2 sm:ml-10"
        >
          Projects
        </button>
        <button
          onClick={() => setActiveOption("resources")}
          className="bg-red px-8 md:px-14 md:py-3 border-2 ml-5 mb-2 sm:ml-10"
        >
          Resources
        </button>
      </div>
    </div>
  );
}

export default Filter;

