import React, { useEffect, useState } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import styles from "../styles/Timeline.module.css";

import {
  TwitterTimelineEmbed,
  TwitterShareButton,
  TwitterFollowButton,
  TwitterHashtagButton,
  TwitterMentionButton,
  TwitterTweetEmbed,
  TwitterMomentShare,
  TwitterDMButton,
  TwitterVideoEmbed,
  TwitterOnAirButton,
} from "react-twitter-embed";

export default function Timeline() {
  const [tweets, setTweets] = useState([]);
  const size = useWindowSize();

  useEffect(() => {
    setTweets(["1599777601777979394", "1608460785826791425","1609366996944293889", "1604857867609075712","1602542190684536832", "1599824127019614208","1593189634846363648", "1597944893934301186"]);
    // console.log(size.width);
  });

  function render(tweet){
    console.log(tweets.indexOf(tweet));

    if(tweets.indexOf(tweet)%4===0){
      return(<VerticalTimelineElement
        className="vertical-timeline-element--left"
        contentStyle={{
          border: "1px dotted  rgb(255, 255, 255)",
          background: "rgb(7, 7, 7)",
          color: "#fff",
        }}
        contentArrowStyle={{
          borderRight: "20px solid  rgb(255, 255, 255)",
          marginTop: "20%",
        }}
        iconStyle={{
          maxHeight: "30px",
          maxWidth: "30px",
          marginLeft: "-1%",
          background: "rgb(255,20,147)",
          color: "#fff",
          marginTop: "10%",
        }}
      >
                          <TwitterTweetEmbed tweetId={tweet} placeholder={<div style={{backgroundColor: 'rgb(7, 7, 7)', color: 'white', margin: 10, padding: 10}}><img src="https://media2.giphy.com/media/hWZBZjMMuMl7sWe0x8/giphy.gif?cid=ecf05e47l74dn8a8iz6s2atj1vs9k933ulhi09kyijk8fk8o&rid=giphy.gif&ct=g" /></div>}/>

      </VerticalTimelineElement>);
    }
    if(tweets.indexOf(tweet)%4===1){
      return(<VerticalTimelineElement
        className="vertical-timeline-element--right"
        contentStyle={{
          border: "1px groove rgb(255, 255, 255)",
          background: "rgb(7, 7, 7)",
          color: "#fff",
        }}
        contentArrowStyle={{
          borderRight: "20px solid  rgb(255, 255, 255)",
          marginTop: "20%",
        }}
        iconStyle={{
          maxHeight: "30px",
          maxWidth: "30px",
          marginLeft: "-1%",
          background: "rgb(138,43,226)",
          color: "#fff",
          marginTop: "10%",
        }}
      >
                          <TwitterTweetEmbed tweetId={tweet} placeholder={<div style={{backgroundColor: 'rgb(7, 7, 7)', color: 'white', margin: 10, padding: 10}}><img src="https://media2.giphy.com/media/hWZBZjMMuMl7sWe0x8/giphy.gif?cid=ecf05e47l74dn8a8iz6s2atj1vs9k933ulhi09kyijk8fk8o&rid=giphy.gif&ct=g" /></div>}/>
      </VerticalTimelineElement>);
    }
    if(tweets.indexOf(tweet)%4===2){
      return(<VerticalTimelineElement
        className="vertical-timeline-element--left"
        contentStyle={{
          border: "1px dotted  rgb(255, 255, 255)",
          background: "rgb(7, 7, 7)",
          color: "#fff",
        }}
        contentArrowStyle={{
          borderRight: "20px solid  rgb(255, 255, 255)",
          marginTop: "20%",
        }}
        iconStyle={{
          maxHeight: "30px",
          maxWidth: "30px",
          marginLeft: "-1%",
          background: "	rgb(255,69,0)",
          color: "#fff",
          marginTop: "10%",
        }}
      >
                          <TwitterTweetEmbed tweetId={tweet} placeholder={<div style={{backgroundColor: 'rgb(7, 7, 7)', color: 'white', margin: 10, padding: 10}}><img src="https://media2.giphy.com/media/hWZBZjMMuMl7sWe0x8/giphy.gif?cid=ecf05e47l74dn8a8iz6s2atj1vs9k933ulhi09kyijk8fk8o&rid=giphy.gif&ct=g" /></div>}/>
      </VerticalTimelineElement>);
    }
    if(tweets.indexOf(tweet)%4===3){
      return( <VerticalTimelineElement
        className="vertical-timeline-element--right"
        contentStyle={{
          border: "1px dotted  rgb(255, 255, 255)",
          background: "rgb(7, 7, 7)",
          color: "#fff",
        }}
        contentArrowStyle={{
          borderRight: "20px solid  rgb(255, 255, 255)",
          marginTop: "20%",
        }}
        iconStyle={{
          maxHeight: "30px",
          maxWidth: "30px",
          marginLeft: "-1%",
          background: "rgb(147,112,219)",
          color: "#fff",
          marginTop: "10%",
        }}
      >
                          <TwitterTweetEmbed tweetId={tweet} placeholder={<div style={{backgroundColor: 'rgb(7, 7, 7)', color: 'white', margin: 10, padding: 10}}><img src="https://media2.giphy.com/media/hWZBZjMMuMl7sWe0x8/giphy.gif?cid=ecf05e47l74dn8a8iz6s2atj1vs9k933ulhi09kyijk8fk8o&rid=giphy.gif&ct=g" /></div>}/>
      </VerticalTimelineElement>);
    }
  }

  function renderSmallScreen(tweet){
      if(tweets.indexOf(tweet)%4===0){
      return(<VerticalTimelineElement
                  className="vertical-timeline-element--left"
                  contentStyle={{
                    border: "1px dotted  rgb(255, 255, 255)",
                    background: "rgb(7, 7, 7)",
                    color: "#fff",
                  }}
                  contentArrowStyle={{
                    borderRight: "20px solid  rgb(255, 255, 255)",
                    marginTop: "20%",
                  }}
                  iconStyle={{
                    maxHeight: "30px",
                    maxWidth: "30px",
                    marginLeft: "0.5%",
                    background: "rgb(255,20,147)",
                    color: "#fff",
                    marginTop: "20%",
                  }}
                >
                          <TwitterTweetEmbed tweetId={tweet} placeholder={<div style={{backgroundColor: 'rgb(7, 7, 7)', color: 'white', margin: 10, padding: 10}}><img src="https://media2.giphy.com/media/hWZBZjMMuMl7sWe0x8/giphy.gif?cid=ecf05e47l74dn8a8iz6s2atj1vs9k933ulhi09kyijk8fk8o&rid=giphy.gif&ct=g" /></div>}/>
                </VerticalTimelineElement>);
}
    if(tweets.indexOf(tweet)%4===1){
          return( <VerticalTimelineElement
                  className="vertical-timeline-element--right"
                  contentStyle={{
                    border: "1px groove rgb(255, 255, 255)",
                    background: "rgb(7, 7, 7)",
                    color: "#fff",
                  }}
                  contentArrowStyle={{
                    borderRight: "20px solid  rgb(255, 255, 255)",
                    marginTop: "20%",
                  }}
                  iconStyle={{
                    maxHeight: "30px",
                    maxWidth: "30px",
                    marginLeft: "0.5%",
                    background: "rgb(138,43,226)",
                    color: "#fff",
                    marginTop: "20%",
                  }}
                >
                          <TwitterTweetEmbed tweetId={tweet} placeholder={<div style={{backgroundColor: 'rgb(7, 7, 7)', color: 'white', margin: 10, padding: 10}}><img src="https://media2.giphy.com/media/hWZBZjMMuMl7sWe0x8/giphy.gif?cid=ecf05e47l74dn8a8iz6s2atj1vs9k933ulhi09kyijk8fk8o&rid=giphy.gif&ct=g" /></div>}/>
                </VerticalTimelineElement>);

}
    if(tweets.indexOf(tweet)%4===2){
          return(  
                <VerticalTimelineElement
                  className="vertical-timeline-element--left"
                  contentStyle={{
                    border: "1px dotted  rgb(255, 255, 255)",
                    background: "rgb(7, 7, 7)",
                    color: "#fff",
                  }}
                  contentArrowStyle={{
                    borderRight: "20px solid  rgb(255, 255, 255)",
                    marginTop: "20%",
                  }}
                  iconStyle={{
                    maxHeight: "30px",
                    maxWidth: "30px",
                    marginLeft: "0.5%",
                    background: "	rgb(255,69,0)",
                    color: "#fff",
                    marginTop: "20%",
                  }}
                >
                          <TwitterTweetEmbed tweetId={tweet} placeholder={<div style={{backgroundColor: 'rgb(7, 7, 7)', color: 'white', margin: 10, padding: 10}}><img src="https://media2.giphy.com/media/hWZBZjMMuMl7sWe0x8/giphy.gif?cid=ecf05e47l74dn8a8iz6s2atj1vs9k933ulhi09kyijk8fk8o&rid=giphy.gif&ct=g" /></div>}/>
                </VerticalTimelineElement>);

}
    if(tweets.indexOf(tweet)%4===3){
          return(<VerticalTimelineElement
                  className="vertical-timeline-element--work"
                  contentStyle={{
                    border: "1px dotted  rgb(255, 255, 255)",
                    background: "rgb(7, 7, 7)",
                    color: "#fff",
                  }}
                  contentArrowStyle={{
                    borderRight: "20px solid  rgb(255, 255, 255)",
                    marginTop: "20%",
                  }}
                  iconStyle={{
                    maxHeight: "30px",
                    maxWidth: "30px",
                    marginLeft: "0.5%",
                    background: "rgb(147,112,219)",
                    color: "#fff",
                    marginTop: "20%",
                  }}
                >
                          <TwitterTweetEmbed tweetId={tweet} placeholder={<div style={{backgroundColor: 'rgb(7, 7, 7)', color: 'white', margin: 10, padding: 10}}><img src="https://media2.giphy.com/media/hWZBZjMMuMl7sWe0x8/giphy.gif?cid=ecf05e47l74dn8a8iz6s2atj1vs9k933ulhi09kyijk8fk8o&rid=giphy.gif&ct=g" /></div>}/>
                </VerticalTimelineElement>);

}
  
  }
 

  if (size.width > 1023) {
  

    return (
      <div className={styles.bg}>
        <VerticalTimeline lineColor={"#F3F3F3"}>
          {tweets.map((tweet) => {
            return (
              <div>
              
                {render(tweet)}
                
                
               
              </div>
            );
          })}
          <VerticalTimelineElement
            iconStyle={{
              maxHeight: "30px",
              maxWidth: "30px",
              background: "rgb(16, 204, 82)",
              marginLeft: "-1%",
              color: "#fff",
            }}
          />
        </VerticalTimeline>
      </div>
    );
  } else {
    return (
      <div className={styles.bg}>
        <VerticalTimeline lineColor={"#F3F3F3"}>
          {tweets.map((tweet) => {
            return (
              <div>
                {renderSmallScreen(tweet)}
             
                
              </div>
            );
          })}

          <VerticalTimelineElement
            iconStyle={{
              maxHeight: "30px",
              maxWidth: "30px",
              background: "rgb(16, 204, 82)",
              marginLeft: "0.5%",
              color: "#fff",
            }}
          />
        </VerticalTimeline>
      </div>
    );
  }
}
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
}
