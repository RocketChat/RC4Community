import React from 'react';
import styles from '../../styles/emojianimation.module.css';

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const Animation = React.memo(({ emojify, emojiArr }) => {
  console.log('animation rerendered');
  return emojiArr.map((emoji, index) => (
    <span className={styles.track}>
      {Array.apply(null, { length: 3 }).map(() => (
        <p
          key={emoji}
          className={styles.emojiAnimationContainer}
          style={{
            overflow: 'hidden',
            animationDelay: `${getRandomInt(2000)}ms`,
            transform: `translate(${getRandomInt(60)}px, ${getRandomInt(0)}px)`,
            
          }}
          dangerouslySetInnerHTML={{
            __html: emojify(emojiArr[index]),
          }}
        />
      ))}
    </span>
  ));
});

export default Animation;
