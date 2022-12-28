import React from "react";
import Box1 from "./box/Box1";
import Box2 from "./box/Box2";

const Hero = () => {
  const img1Url = "discounts.gif";
  const img2Url = "resources.gif";
  const box1Text = "Discounts";
  const box2Text = "Resources";
  return (
    <div className="relative flex min-h-screen flex-col items-center z-20 sm:items-start sm:flex-row sm:justify-around mt-[12vh] ">
    <div className="sm:text-start text-center sm:mr-20 sm:max-w-[40vw] mt-[7vh] sm:mt-[10vh] ">
      <h1 className="mb-4 text-5xl sm:text-3xl  text-white  dark:text-white  md:text-6xl xl:text-7xl 2xl:text-8xl font-lato font-[900]">
        Dev-Ops
        <br />
        <span className="bg-gradient-to-r from-[#CC03FE] to-[#E34B2E] bg-clip-text text-transparent font-lato font-[900] text-5xl md:text-6xl xl:text-7xl 2xl:text-8xl ">
          Community
        </span>
      </h1>
      <p className="sm:text-lg  text-white dark:text-white lg:text-xl 2xl:text-4xl font-lato font-[400]">
        DevOps/SRE community is for those folks who are trying to learn or
        explore DevOps with the help of experienced professionals.
        Opportunities are open to share.
      </p>
      <div></div>
    </div>
    <div className="mt-10 sm:mt-0 sm:max-w-[40vw]  sm:align-baseline">
      <Box1 img1Url={img1Url} box1Text={box1Text} />
      <Box2 img2Url={img2Url} box2Text={box2Text} />
    </div>
  </div>
  );
};

export default Hero;
