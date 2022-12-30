import Link from "next/link";
import React from "react";

const Nav = () => {
  return (
    <nav className=" border-[#CDCDCD] border-y-[1px] z-20">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between px-4 py-2.5 md:px-0">
        <div className="flex items-center">
          <Link href="/" passHref legacyBehavior>
            <a className="self-center whitespace-nowrap hover:underline text-xl font-normal text-white font-roboto z-20">
              Dev-Ops
            </a>
          </Link>
        </div>

        <div className="flex items-center">
          <Link href="/resources" passHref legacyBehavior>
            <a className="text-sm font-normal text-white hover:underline dark:text-white font-roboto z-20">
              Resources
            </a>
          </Link>
        </div>
      </div>
    </nav>
  );
};


export default Nav;
