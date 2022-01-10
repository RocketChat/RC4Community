import { Image} from  "react-bootstrap"
import styles from "../styles/Newscarousel.module.css"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Item = (props) => {
    console.log(props.item.imageUrl)
    return (
      <div className={styles['carousel-item-wrapper']}>
        <a
          href={props.item.url}
          target="_blank"
          rel="noreferrer"
          className={styles['carousel-item-link']}
        >
          <img className={styles['carousel-item-image']} src={props.item.imageUrl} />
          <h2 className={styles['carousel-item-title']}>{props.item.name}</h2>
        </a>
        <p className={styles['carousel-item-description']}>{props.item.description}</p>
      </div>
    );
  };


function Newscarousel(props) {
    return(
        <>
        <Slider
          className={styles["carousel-slider"]}
          dots={true}
          arrows={true}
          infinite={true}
          speed={500}
          slidesToShow={4}
          slidesToScroll={4}
          pauseOnHover={true}
          responsive={ 
            [
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                  }
                },
                {
                  breakpoint: 600,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                  }
                }
            ]
          }
          prevArrow={<img src="/prev-button-slider.png" />}
          nextArrow={<img src="/next-button-slider.png" />}
        >
          {props.carousels.map((item, i) => (
            <Item key={i} item={item} />
          ))}
        </Slider>  
      </>
    )
}

export default Newscarousel