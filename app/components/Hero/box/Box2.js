import Link from "next/link";
import React from "react";

const Box2 = (props) => {
  const nextPageUrl = "/" + props.box2Text.toLowerCase();
  return (
    <div className="absolute  ml-[0px] h-[140px] w-[140px] mt-[-110px]  sm:ml-[-75px]  sm:h-[50vh] sm:mt-auto   xl:h-[45vh]  sm:w-[20vw] sm:top-[10vh]  rounded-[10px] border-[1px] p-[20] 2xl:ml-[-125px] ">
      <img src={props.img2Url} className="h-[90%] w-[90%] p-[20px] " alt="" />
      <div className="absolute rounded-tr-lg rounded-bl-lg  bg-[#CC03FE] sm:py-2 px-[20px] bottom-0 left-0 top-auto right-auto ml-[-8%] mb-[-5%]  w-[90%] hover:bg-[#6315CB]">
        <p className="text-lg   text-[#F5FAFF] dark:text-[#F5FAFF] lg:text-2xl">
          <Link href={nextPageUrl}>{props.box2Text}</Link>
        </p>
      </div>
    </div>
  );
};


export default Box2;
