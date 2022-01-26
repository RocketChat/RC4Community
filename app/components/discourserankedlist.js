import { Col, Row } from 'react-bootstrap';
import styles from '../styles/Discourserankedlist.module.css';
import Like from '../public/svg/like.js';
import Comment from '../public/svg/comment';

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
  const Data = [
    {
      id: 1,
      title:
        'Upload stuck at 0% again after initially fixing with chanding site url in General admin options',
      time: '6:57 PM',
      upvotes: '89',
      comments: '91',
    },
    {
      id: 2,
      title: 'Why can’t we have thumbnails for video uploads on mobile?',
      time: '4:00 PM',
      upvotes: '500',
      comments: '4',
    },
    {
      id: 3,
      title: 'Can’t find “Users must use Two Factor Authentication” Option',
      time: '12:53 PM',
      upvotes: '456',
      comments: '75',
    },
    {
      id: 4,
      title: 'Can’t “forget/remove my data” directly in RC 4.3.0 in livechat',
      time: '8:36 AM',
      upvotes: '234',
      comments: '199',
    },
    {
      id: 5,
      title: 'Not migrating, control is locked',
      time: '11:30 PM',
      upvotes: '441',
      comments: '74',
    },
    {
      id: 6,
      title:
        'Upload stuck at 0% again after initially fixing with chanding site url in General admin options',
      time: '7:14 PM',
      upvotes: '972',
      comments: '42',
    },
    {
      id: 7,
      title: 'Can’t find “Users must use Two Factor Authentication” Option',
      time: '3:36 PM',
      upvotes: '4279',
      comments: '98',
    },
    {
      id: 8,
      title: 'Cannot Chat Log Level - Option has disappeared',
      time: '11:06 AM',
      upvotes: '51',
      comments: '291',
    },
    {
      id: 9,
      title: 'Wrong IP Server',
      time: '2:00 PM',
      upvotes: '478',
      comments: '25',
    },
    {
      id: 10,
      title: 'Not migrating, control is locked',
      time: '11:03 PM',
      upvotes: '16',
      comments: '15',
    },
  ];
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
