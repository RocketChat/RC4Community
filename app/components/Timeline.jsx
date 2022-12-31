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
    setTweets(["1599777601777979394", "1608460785826791425"]);
    console.log(size.width);
  });

  if (size.width > 1023) {
    return (
      <div className={styles.bg}>
        <VerticalTimeline lineColor={"#F3F3F3"}>
          {tweets.map((tweet) => {
            return (
              <div>
                <VerticalTimelineElement
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
                    marginLeft: "-1%",
                    background: "rgb(255,20,147)",
                    color: "#fff",
                    marginTop: "10%",
                  }}
                >
                  <TwitterTweetEmbed tweetId={tweet} />
                </VerticalTimelineElement>
                <VerticalTimelineElement
                  className="vertical-timeline-element--work"
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
                  <TwitterTweetEmbed tweetId={tweet} />
                </VerticalTimelineElement>
                <VerticalTimelineElement
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
                    marginLeft: "-1%",
                    background: "	rgb(255,69,0)",
                    color: "#fff",
                    marginTop: "10%",
                  }}
                >
                  <TwitterTweetEmbed tweetId={tweet} />
                </VerticalTimelineElement>
                <VerticalTimelineElement
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
                    marginLeft: "-1%",
                    background: "rgb(147,112,219)",
                    color: "#fff",
                    marginTop: "10%",
                  }}
                >
                  <TwitterTweetEmbed tweetId={tweet} />
                </VerticalTimelineElement>
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
                <VerticalTimelineElement
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
                    background: "rgb(255,20,147)",
                    color: "#fff",
                    marginTop: "20%",
                  }}
                >
                  <TwitterTweetEmbed tweetId={tweet} />
                </VerticalTimelineElement>
                <VerticalTimelineElement
                  className="vertical-timeline-element--work"
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
                  <TwitterTweetEmbed tweetId={tweet} />
                </VerticalTimelineElement>
                <VerticalTimelineElement
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
                    background: "	rgb(255,69,0)",
                    color: "#fff",
                    marginTop: "20%",
                  }}
                >
                  <TwitterTweetEmbed tweetId={tweet} />
                </VerticalTimelineElement>
                <VerticalTimelineElement
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
                  <TwitterTweetEmbed tweetId={tweet} />
                </VerticalTimelineElement>
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
