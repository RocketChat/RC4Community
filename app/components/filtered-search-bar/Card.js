import React from "react";
import { motion } from "framer-motion";

function Card({ name, value, info}) {
  return (
    <motion.div layout className="flex w-72 min-h-72 ">
      <div className="max-w-sm  p-6 bg-white border border-gray-200 rounded-lg shadow-md ">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
          {name}
        </h5>

        <p className="mb-20 mt-5  font-normal text-gray-700 dark:text-gray-600">
          {info}
        </p>
        <a
          href={value}
          target="_blank"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Read more
        </a>
      </div>
    </motion.div>
  );
}

export default Card;
