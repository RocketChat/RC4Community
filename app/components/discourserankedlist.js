import { Col, Row } from 'react-bootstrap';
import styles from '../styles/Discourserankedlist.module.css';
import Like from '../public/svg/like.js';
import Comment from '../public/svg/comment';
import Data from '../data/DiscourserankedlistData';
function TimeSince(date) {
  let seconds = Math.floor((new Date() - date) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) {
    return Math.floor(interval) + ' years';
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + ' months ago';
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + ' days ago';
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + ' hours ago';
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + ' minutes ago';
  }
  return Math.floor(seconds) + ' seconds ago';
}

function Discourserankedlist(props) {

  //generates random colour for border styling
  const color = [
    'border-primary',
    'border-success',
    'border-danger',
    'border-warning',
    'border-info',
  ];

  // let activityItems = [];
  // props.topposts[0]?.TopPost?.topic_list?.topics.map((topic) => {
  //   let newTopic = {
  //     title: topic.fancy_title,
  //     time: timeSince(new Date(topic.created_at)),
  //     upvotes: topic.like_count,
  //     comments: topic.posts_count,
  //     link: `https://forums.rocket.chat/t/${topic.slug}/${topic.id}`,
  //     image_url: topic.image_url,
  //   };
  //   activityItems.push(newTopic);
  // });
  //todo - add top posts array instead of Data array when discourse integration works
  return (
    <>
      <Col
        className={`${styles.container} d-flex flex-wrap justify-content-center`}
      >
        {Data.map(item => (
          <Col
            key={item.id}
            href={item.link}
            className={`${
              styles.coloumn
            } p-2 m-2 mx-md-3  ps-4 col-md-5 d-flex justify-content-between border-start border-4 ${
              color[Math.floor(Math.random() * color.length)]
            }`}
          >
            <Row className={`${styles.item_container}`}>
              <div className={`${styles.heading} text-truncate pb-2`}>
                {item.title}
              </div>
              <div className={`fw-light fst-italic  pb-1 ${styles.time}`}>
                {item.time}
              </div>
              <span className=''>
                <span className={`me-3 ${styles.numbers}`}>
                  <span className='me-2'>
                    <Like />
                  </span>
                  {item.upvotes}
                </span>
                <span className={`me-2 ${styles.numbers}`}>
                  <span className='me-2'>
                    <Comment />
                  </span>
                  {item.comments}
                </span>
              </span>
            </Row>
          </Col>
        ))}
      </Col>
    </>
  );
}

export default Discourserankedlist;
