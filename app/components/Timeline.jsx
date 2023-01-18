'use client';
import React, { useEffect, useState } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import styles from '../styles/Timeline.module.css';
import Link from 'next/link';

import Tweet from './Tweet/EmbeddedTweet';

export default function Timeline({ tweets }) {
  const size = useWindowSize();

  function render(tweet) {
    if (tweets.indexOf(tweet) % 4 === 0) {
      return (
        <VerticalTimelineElement
          className='vertical-timeline-element--left'
          contentStyle={{
            border: '1px groove rgb(255, 255, 255)',
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
          <Tweet
            key={tweet.id}
            {...tweet}
          />
        </VerticalTimelineElement>
      );
    }
    if (tweets.indexOf(tweet) % 4 === 1) {
      return (
        <VerticalTimelineElement
          className='vertical-timeline-element--right'
          contentStyle={{
            border: '1px groove rgb(255, 255, 255)',
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
          <Tweet
            key={tweet.id}
            {...tweet}
          />
        </VerticalTimelineElement>
      );
    }
    if (tweets.indexOf(tweet) % 4 === 2) {
      return (
        <VerticalTimelineElement
          className='vertical-timeline-element--left'
          contentStyle={{
            border: '1px groove  rgb(255, 255, 255)',
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
          <Tweet
            key={tweet.id}
            {...tweet}
          />
        </VerticalTimelineElement>
      );
    }
    if (tweets.indexOf(tweet) % 4 === 3) {
      return (
        <VerticalTimelineElement
          className='vertical-timeline-element--right'
          contentStyle={{
            border: '1px groove  rgb(255, 255, 255)',
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
          <Tweet
            key={tweet.id}
            {...tweet}
          />
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
        <Link href={'/resources'}>
          <div className={styles.button1}>See All</div>
        </Link>
      </div>
    );
  } else {
    return (
      <main
        className="flex flex-col justify-center px-8 bg-gray-50 dark:bg-black"
      >
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} {...tweet} />
        ))}
      </div>
      </main>
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
