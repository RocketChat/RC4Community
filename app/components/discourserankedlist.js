import { ListGroup} from  "react-bootstrap"
import styles from "../styles/Discourserankedlist.module.css"

function timeSince(date) {
    let seconds = Math.floor((new Date() - date) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months ago";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days ago";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours ago";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
  }


function Discourserankedlist(props) {
  let activityItems = [];
  props.topposts[0]?.TopPost?.topic_list?.topics.map((topic) => {
    let newTopic = {
      title: topic.fancy_title,
      time: timeSince(new Date(topic.created_at)),
      upvotes: topic.like_count,
      comments: topic.posts_count,
      link: `https://forums.rocket.chat/t/${topic.slug}/${topic.id}`,
      image_url: topic.image_url
    }
    activityItems.push(newTopic);
  })

    return(
        <>
        <ListGroup>
        {activityItems.map((item) => (
        <ListGroup.Item>{item.title}</ListGroup.Item>
        ))}
        </ListGroup>
        </>
    )
}

export default Discourserankedlist