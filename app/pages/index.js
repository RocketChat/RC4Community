
import Hero from "../components/Hero/Hero";
import Nav from "../components/Hero/Nav";



let imgUrl = "bgdevops.gif";
const gifStyle = {
  position: "absolute",
  width: "90%",
  height: "90%",
  background: `url(${imgUrl})`,
  backgroundSize: "cover",
  backgroundPosition: "left center",
  backgroundRepeat: "no-repeat",
  zIndex: 1,
  opacity: 0.1,
  mixBlendMode: "screen",
};
export default function Home() {
  return (
    <>
      <div className="bg-black">
        <div className="py-6 px-5 sm:px-16 bg-[url('/elipses.png')] bg-no-repeat bg-contain relative">
          <div
            style={gifStyle}
            //     style="position: absolute;
            // width: 90%;
            // height:90%;
            // background: url('https://media.giphy.com/media/DNvcUc3t3ThFTC65M7/giphy.gif') left center no-repeat;
            // background-size: cover;
            // z-index: 1;
            // mix-blend-mode: screen;
            // opacity: .1;"
          ></div>
          <Nav></Nav>
          <Hero></Hero>
        </div>
      </div>
      {/* <Tweettimeline /> */}
    </>
  );
}
