import React, { useEffect, useState } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import styles from '../styles/Timeline.module.css';
import { useRouter } from 'next/router.js';
import Link from 'next/link';

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
} from 'react-twitter-embed';

export default function Timeline() {
  const router = useRouter();

  const [tweets, setTweets] = useState([]);
  const size = useWindowSize();

  useEffect(() => {
    setTweets([
      '1609858655389876225',
      '1608799196081160195',
      '1606092417710465024',
      '1605768766918467584',
      '1602540813338423296',
      '1598537486283984897',
      '1599454084381442049',
      '1602253569335255045',
    ]);
    // console.log(size.width);
  },[]);

  function render(tweet) {
    console.log(tweets.indexOf(tweet));

    if (tweets.indexOf(tweet) % 4 === 0) {
      return (
        <VerticalTimelineElement
          className='vertical-timeline-element--left'
          contentStyle={{
            border: '5px groove  rgb(255, 255, 255)',
            background: 'rgb(7, 7, 7)',
            color: '#fff',
          }}
          contentArrowStyle={{
            borderRight: '20px solid  rgb(255, 255, 255)',
            marginTop: '25%',
            marginLeft: '1.5%',
          }}
          iconStyle={{
            maxHeight: '30px',
            maxWidth: '30px',
            marginLeft: '-1.25%',
            background: 'rgb(255,20,147)',
            color: '#fff',
            marginTop: '12.5%',
          }}
        >
          <TwitterTweetEmbed
            tweetId={tweet}
            placeholder={
              <div
                style={{ backgroundColor: 'rgb(7, 7, 7)', color: 'white', margin: 10, padding: 10 }}
              >
                <img src='https://media2.giphy.com/media/hWZBZjMMuMl7sWe0x8/giphy.gif?cid=ecf05e47l74dn8a8iz6s2atj1vs9k933ulhi09kyijk8fk8o&rid=giphy.gif&ct=g' />
              </div>
            }
          />
        </VerticalTimelineElement>
      );
    }
    if (tweets.indexOf(tweet) % 4 === 1) {
      return (
        <VerticalTimelineElement
          className='vertical-timeline-element--right'
          contentStyle={{
            border: '5px groove rgb(255, 255, 255)',
            background: 'rgb(7, 7, 7)',
            color: '#fff',
          }}
          contentArrowStyle={{
            borderRight: '20px solid  rgb(255, 255, 255)',
            marginTop: '40%',
            marginRight: '1.5%',
          }}
          iconStyle={{
            maxHeight: '30px',
            maxWidth: '30px',
            marginLeft: '-1.25%',
            background: 'rgb(138,43,226)',
            color: '#fff',
            marginTop: '19%',
          }}
        >
          <TwitterTweetEmbed
            tweetId={tweet}
            placeholder={
              <div
                style={{ backgroundColor: 'rgb(7, 7, 7)', color: 'white', margin: 10, padding: 10 }}
              >
                <img src='https://media2.giphy.com/media/hWZBZjMMuMl7sWe0x8/giphy.gif?cid=ecf05e47l74dn8a8iz6s2atj1vs9k933ulhi09kyijk8fk8o&rid=giphy.gif&ct=g' />
              </div>
            }
          />
        </VerticalTimelineElement>
      );
    }
    if (tweets.indexOf(tweet) % 4 === 2) {
      return (
        <VerticalTimelineElement
          className='vertical-timeline-element--left'
          contentStyle={{
            border: '5px groove  rgb(255, 255, 255)',
            background: 'rgb(7, 7, 7)',
            color: '#fff',
          }}
          contentArrowStyle={{
            borderRight: '20px solid  rgb(255, 255, 255)',
            marginTop: '35%',
            marginLeft: '1.5%',
          }}
          iconStyle={{
            maxHeight: '30px',
            maxWidth: '30px',
            marginLeft: '-1.25%',
            background: '	rgb(255,69,0)',
            color: '#fff',
            marginTop: '17%',
          }}
        >
          <TwitterTweetEmbed
            tweetId={tweet}
            placeholder={
              <div
                style={{ backgroundColor: 'rgb(7, 7, 7)', color: 'white', margin: 10, padding: 10 }}
              >
                <img src='https://media2.giphy.com/media/hWZBZjMMuMl7sWe0x8/giphy.gif?cid=ecf05e47l74dn8a8iz6s2atj1vs9k933ulhi09kyijk8fk8o&rid=giphy.gif&ct=g' />
              </div>
            }
          />
        </VerticalTimelineElement>
      );
    }
    if (tweets.indexOf(tweet) % 4 === 3) {
      return (
        <VerticalTimelineElement
          className='vertical-timeline-element--right'
          contentStyle={{
            border: '5px groove  rgb(255, 255, 255)',
            background: 'rgb(7, 7, 7)',
            color: '#fff',
          }}
          contentArrowStyle={{
            borderRight: '20px solid  rgb(255, 255, 255)',
            marginTop: '44%',
            marginRight: '1.5%',
          }}
          iconStyle={{
            maxHeight: '30px',
            maxWidth: '30px',
            marginLeft: '-1.25%',
            background: 'rgb(147,112,219)',
            color: '#fff',
            marginTop: '21%',
          }}
        >
          <TwitterTweetEmbed
            tweetId={tweet}
            placeholder={
              <div
                style={{ backgroundColor: 'rgb(7, 7, 7)', color: 'white', margin: 10, padding: 10 }}
              >
                <img src='https://media2.giphy.com/media/hWZBZjMMuMl7sWe0x8/giphy.gif?cid=ecf05e47l74dn8a8iz6s2atj1vs9k933ulhi09kyijk8fk8o&rid=giphy.gif&ct=g' />
              </div>
            }
          />
        </VerticalTimelineElement>
      );
    }
  }

  function renderSmallScreen(tweet) {
    if (tweets.indexOf(tweet) % 4 === 0) {
      return (
        <VerticalTimelineElement
          className='vertical-timeline-element--left'
          contentStyle={{
            paddingRight: '4%',
            marginTop: '30px',
            border: '2px groove  rgb(255, 255, 255)',
            background: 'rgb(7, 7, 7)',
            color: '#fff',
          }}
          contentArrowStyle={{
            borderRight: '10px solid  rgb(255, 255, 255)',
            marginTop: '20%',
            marginRight: '1%',
          }}
          iconStyle={{
            maxHeight: '15px',
            maxWidth: '15px',
            marginLeft: '13px',
            background: 'rgb(255,20,147)',
            color: '#fff',
            marginTop: '21%',
          }}
        >
          <TwitterTweetEmbed
            tweetId={tweet}
            placeholder={
              <div
                style={{ backgroundColor: 'rgb(7, 7, 7)', color: 'white', margin: 10, padding: 10 }}
              >
                <img src='https://media2.giphy.com/media/hWZBZjMMuMl7sWe0x8/giphy.gif?cid=ecf05e47l74dn8a8iz6s2atj1vs9k933ulhi09kyijk8fk8o&rid=giphy.gif&ct=g' />
              </div>
            }
          />
        </VerticalTimelineElement>
      );
    }
    if (tweets.indexOf(tweet) % 4 === 1) {
      return (
        <VerticalTimelineElement
          className='vertical-timeline-element--right'
          contentStyle={{
            paddingRight: '4%',
            marginTop: '30px',
            border: '2px groove rgb(255, 255, 255)',
            background: 'rgb(7, 7, 7)',
            color: '#fff',
          }}
          contentArrowStyle={{
            borderRight: '10px solid  rgb(255, 255, 255)',
            marginTop: '33%',
            marginRight: '1%',
          }}
          iconStyle={{
            maxHeight: '15px',
            maxWidth: '15px',
            marginLeft: '13px',
            background: 'rgb(138,43,226)',
            color: '#fff',
            marginTop: '32.5%',
          }}
        >
          <TwitterTweetEmbed
            tweetId={tweet}
            placeholder={
              <div
                style={{ backgroundColor: 'rgb(7, 7, 7)', color: 'white', margin: 10, padding: 10 }}
              >
                <img src='https://media2.giphy.com/media/hWZBZjMMuMl7sWe0x8/giphy.gif?cid=ecf05e47l74dn8a8iz6s2atj1vs9k933ulhi09kyijk8fk8o&rid=giphy.gif&ct=g' />
              </div>
            }
          />
        </VerticalTimelineElement>
      );
    }
    if (tweets.indexOf(tweet) % 4 === 2) {
      return (
        <VerticalTimelineElement
          className='vertical-timeline-element--left'
          contentStyle={{
            paddingRight: '4%',
            marginTop: '30px',
            border: '2px groove  rgb(255, 255, 255)',
            background: 'rgb(7, 7, 7)',
            color: '#fff',
          }}
          contentArrowStyle={{
            borderRight: '10px solid  rgb(255, 255, 255)',
            marginTop: '20%',
            marginRight: '1%',
          }}
          iconStyle={{
            maxHeight: '15px',
            maxWidth: '15px',
            marginLeft: '13px',
            background: '	rgb(255,69,0)',
            color: '#fff',
            marginTop: '21%',
          }}
        >
          <TwitterTweetEmbed
            tweetId={tweet}
            placeholder={
              <div
                style={{ backgroundColor: 'rgb(7, 7, 7)', color: 'white', margin: 10, padding: 10 }}
              >
                <img src='https://media2.giphy.com/media/hWZBZjMMuMl7sWe0x8/giphy.gif?cid=ecf05e47l74dn8a8iz6s2atj1vs9k933ulhi09kyijk8fk8o&rid=giphy.gif&ct=g' />
              </div>
            }
          />
        </VerticalTimelineElement>
      );
    }
    if (tweets.indexOf(tweet) % 4 === 3) {
      return (
        <VerticalTimelineElement
          className={'vertical-timeline-element--work'}
          contentStyle={{
            paddingRight: '4%',
            maxWidth: '100%',
            marginTop: '30px',
            border: '2px groove  rgb(255, 255, 255)',
            background: 'rgb(7, 7, 7)',
            color: '#fff',
          }}
          contentArrowStyle={{
            borderRight: '10px solid  rgb(255, 255, 255)',
            marginTop: '40%',
            marginRight: '1%',
          }}
          iconStyle={{
            maxHeight: '15px',
            maxWidth: '15px',
            marginLeft: '13px',
            background: 'rgb(147,112,219)',
            color: '#fff',
            marginTop: '38%',
          }}
        >
          <div className={styles.height}>
            <TwitterTweetEmbed
              tweetId={tweet}
              placeholder={
                <div
                  style={{
                    backgroundColor: 'rgb(7, 7, 7)',
                    color: 'white',
                    margin: 10,
                    padding: 10,
                  }}
                >
                  <img src='https://media2.giphy.com/media/hWZBZjMMuMl7sWe0x8/giphy.gif?cid=ecf05e47l74dn8a8iz6s2atj1vs9k933ulhi09kyijk8fk8o&rid=giphy.gif&ct=g' />
                </div>
              }
            />
          </div>
        </VerticalTimelineElement>
      );
    }
  }

  if (size.width > 1169) {
    return (
      <div className={styles.bg}>
        <VerticalTimeline lineColor={'#F3F3F3'}>
          {tweets.map((tweet) => {
            return <div key={tweet}>{render(tweet)}</div>;
          })}
          <VerticalTimelineElement
            iconStyle={{
              maxHeight: '30px',
              maxWidth: '30px',
              background: 'rgb(16, 204, 82)',
              marginLeft: '-1.25%',
              color: '#fff',
            }}
          ></VerticalTimelineElement>
        </VerticalTimeline>
        <button
          className={styles.button1}
          onClick={() => {
            router.push('/resources');
          }}
        >
          See All
        </button>
      </div>
    );
  } else {
    return (
      <div className={styles.bg}>
        <VerticalTimeline lineColor={'#F3F3F3'}>
          {tweets.map((tweet) => {
            return <div key={tweet}>{renderSmallScreen(tweet)}</div>;
          })}

          <VerticalTimelineElement
            contentStyle={{
              marginTop: '30px',
              border: '2px groove  rgb(255, 255, 255)',
              background: 'rgb(7, 7, 7)',
              color: '#fff',
            }}
            contentArrowStyle={{
              borderRight: '10px solid  rgb(255, 255, 255)',
              marginTop: '1%',
              marginRight: '1%',
            }}
            iconStyle={{
              maxHeight: '15px',
              maxWidth: '15px',
              background: 'rgb(16, 204, 82)',
              marginLeft: '13px',
              marginTop: '4%',
              color: '#fff',
            }}
          >
            {' '}
            <button
              className={styles.button}
              onClick={() => {
                router.push('/resources');
              }}
            >
              See All
            </button>
          </VerticalTimelineElement>
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

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return windowSize;
}
