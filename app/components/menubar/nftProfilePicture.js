import React from 'react';
import styles from '../../styles/Menubar.module.css';

const NFTProfilePicture = ({ id }) => {
  return (
    <div className={styles.nft_pfp}>
      <svg
        viewBox='0 0 200 200'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        width='100%'
        height='100%'
      >
        <defs>
          <pattern id={id}  width='100%' height='100%'>
            {/* replace the href with the nft link */}
            <image
              preserveAspectRatio='xMidYMid slice'
              href='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrD7zIqb5fsmcu_fSnnHkpQqzMccAHzX2reg&usqp=CAU'
              height='100%'
              width='100%'
            />
          </pattern>
        </defs>
        <path
          d='M17.7489 147.583C7.23743 128.104 1.9817 118.365 0.54522 107.946C-0.18174 102.674 -0.18174 97.3261 0.54522 92.0535C1.9817 81.6349 7.23744 71.8956 17.7489 52.4171L20.3577 47.5829C29.3372 30.9433 33.8269 22.6235 40.1654 16.4407C46.6753 10.0908 54.5842 5.36561 63.2527 2.64704C71.6932 0 81.1288 0 100 0C118.871 0 128.307 0 136.747 2.64704C145.416 5.36561 153.325 10.0908 159.835 16.4407C166.173 22.6235 170.663 30.9433 179.642 47.5829L182.251 52.4171C192.763 71.8956 198.018 81.6349 199.455 92.0535C200.182 97.3261 200.182 102.674 199.455 107.946C198.018 118.365 192.763 128.104 182.251 147.583L179.642 152.417C170.663 169.057 166.173 177.377 159.835 183.559C153.325 189.909 145.416 194.634 136.747 197.353C128.307 200 118.871 200 100 200C81.1288 200 71.6932 200 63.2527 197.353C54.5842 194.634 46.6753 189.909 40.1654 183.559C33.8269 177.377 29.3372 169.057 20.3577 152.417L17.7489 147.583Z'
          fill={`url(#${id})`}
        />
      </svg>
    </div>
  );
};

export default NFTProfilePicture;
