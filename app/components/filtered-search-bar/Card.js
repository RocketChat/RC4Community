import React from "react";
import { motion } from "framer-motion";

function Card({ name, value, info }) {
  return (
    <motion.div layout className="flex sm:min-w-96  min-h-96 ">
      <div className="flex flex-col justify-around w-72 align-center max-w-sm sm:w-96 sm:h-96 p-6 text-white bg-[#1E1E1E] border border-gray-200 rounded-lg shadow-md sm:hover:scale-110 sm:mb-6">
        <div>
          <h5 className="flex text-center justify-center mb-2 text-2xl font-bold tracking-tight ">
            {name}
          </h5>

          <p className="mb-20 mt-5  font-normal ">{info}</p>
        </div>
        <div className="flex justify-center">
          {/* <a
          href={value}
          target="_blank"
          className="inline-flex items-center p-8 h-10 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Read more
        </a> */}
          <a
            href={value}
            rel="noreferrer"
            target="_blank"
            className=" text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            Read more
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default Card;
