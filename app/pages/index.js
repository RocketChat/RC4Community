
import Hero from "../components/Hero/Hero";
import Nav from "../components/Hero/Nav";
import Timeline from "../components/Timeline";




let imgUrl = "bgdevops.gif";
const gifStyle = {
  backgroundImage: `url(${imgUrl})`,
  opacity: 0.3,
};
export default function Home() {
  return (
    <>
      <div className="bg-black">
        <div className="py-6 px-5 sm:px-16 bg-[url('/elipses.png')] bg-no-repeat bg-contain relative">
          <div
            className="absolute w-[90%] h-[90%] bg-contain sm:bg-cover bg-[center_top_20vh] sm:bg-[left_center] bg-no-repeat z-1 opacity-10 sm:opacity-10 mix-blend-screen"
            style={gifStyle}
          ></div>
          <Nav></Nav>
          <Hero></Hero>
        </div>
      </div>
    <Timeline/>
    </>
  );
}
