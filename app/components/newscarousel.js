import styles from '../styles/Newscarousel.module.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Item = (props) => {
  return (
    <div className={`bg-white m-2 h-auto + ${styles.active_carousel}`}>
      <a
        href={props.item.attributes.url}
        target='_blank'
        rel='noreferrer'
        className='text-decoration-none text-black :hover'
      >
        <img
          className={styles['carousel-item-image']}
          src={props.item.attributes.imageUrl}
        />
        <div className={`p-2 p-md-3 h-auto + ${styles.content}`}>
          <h2 className={`${styles.heading}`}>{props.item.attributes.name}</h2>
          <p className={`${styles.description}`}>{props.item.attributes.description}</p>
        </div>
      </a>
    </div>
  );
};

function Newscarousel(props) {
  return (
    <>
      <Slider
        className={`d-flex ${styles.slider}`}
        dots={true}
        arrows={true}
        infinite={true}
        speed={500}
        slidesToShow={4}
        slidesToScroll={4}
        pauseOnHover={true}
        responsive={[
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2,
            },
          },
        ]}
        prevArrow={
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='80'
            height='80'
            fill='#000'
            className='bi bi-arrow-left-short align-self-center'
            viewBox='0 0 16 16'
          >
            <path
              fillRule='evenodd'
              d='M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z'
            />
          </svg>
        }
        nextArrow={
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='80'
            height='80'
            fill='#000'
            className='bi bi-arrow-left-short align-self-center'
            viewBox='0 0 16 16'
          >
            <path
              fillRule='evenodd'
              d='M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z'
            />
          </svg>
        }
      >
        {props.carousels.map((item, i) => (
          <Item key={i} item={item} />
        ))}
      </Slider>
    </>
  );
}

export default Newscarousel;
