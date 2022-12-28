import React from "react";

const Nav = () => {
  return (
    <nav className=" border-[#CDCDCD] border-y-[1px]">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between px-4 py-2.5 md:px-0">
        <a href="#" className="flex items-center no-underline">
          <span className="self-center whitespace-nowrap text-xl font-normal text-white font-roboto">
            Dev-Ops
          </span>
        </a>
        <div className="flex items-center">
          <a
            href="ind.html"
            className="text-sm font-normal text-white hover:underline dark:text-white font-roboto no-underline"
          >
            Resources
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
