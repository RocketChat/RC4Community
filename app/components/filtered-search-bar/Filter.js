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
    console.log(filtered);
  }, [activeOption]);

  return (
    <div className="text-white flex mb-5">
      <h1 className="text-white text-lg ml-10 sm:ml-16 md:text-2xl md:mx-20">
        Filter:
      </h1>
      <div>
        <button
          onClick={() => setActiveOption("all")}
          className="bg-red px-8 border-4 ml-5 mb-2 md:ml-10"
        >
          All
        </button>
        <button
          onClick={() => setActiveOption("github")}
          className="bg-red px-8 border-4 ml-5 mb-2 sm:ml-10"
        >
          Github repo
        </button>
        <button
          onClick={() => setActiveOption("twitter")}
          className="bg-red px-8 border-4 ml-5 mb-2 sm:ml-10"
        >
          Twitter
        </button>
        <button
          onClick={() => setActiveOption("project")}
          className="bg-red px-8 border-4 ml-5 mb-2 sm:ml-10"
        >
          Projects
        </button>
        <button
          onClick={() => setActiveOption("resources")}
          className="bg-red px-8 border-4 ml-5 mb-2 sm:ml-10"
        >
          Resources
        </button>
      </div>
    </div>
  );
}

export default Filter;
