'use client';
import { Col, Row } from 'react-bootstrap';
import styles from './styles/DiscourseTopicList.module.css';
import useDiscourseClient from './useDiscourseClient';
import Like from '../../SvgIcons/Like';
import Comment from '../../SvgIcons/Comment';
import Eye from '../../SvgIcons/Eye';
import DefaultAvatarUrl from './assets/no_user.png';

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

function DiscourseTopicList({
	variant = 'latest', // latest, top, unsolved, unsolved
	max = 10,
	className = '',
	data
}) {
	const discourse = useDiscourseClient();
	const topicUsers = new Object();
	(data.users || []).map((u) => {
		topicUsers[u.id] = u;
	})

	let topics = [];
	const postsByTopicId = new Object();

	if (variant === 'unsolved' || variant === 'solved') {
		(data.posts || []).map((p) => {
			postsByTopicId[p.topic_id] = p;
		})
		topics = (data.topics || []);
	} else {
		topics = (data.topic_list?.topics || [])
	} 

	const getAvatarUrl = (user, size = 32) => {
		if (!user?.avatar_template)
			return DefaultAvatarUrl;
		const url = user.avatar_template.replace('{size}', size);
		if (user.avatar_template.startsWith('http')) {
			return url
		}
		return `${discourse.host}${url}`
	}

	const getAvatarUrlsForTopic = (topic, size = 32) => {
		if (variant === 'unsolved' || variant === 'solved') {
			return [{
				username: topic.username,
				avatarUrl: getAvatarUrl(postsByTopicId[topic.id], size)
			}]
		}
		return (topic.posters || []).map(p => ({
			username: topicUsers[p.user_id].username,
			avatarUrl: getAvatarUrl(topicUsers[p.user_id])
		}))
	}

	//generates random colour for border styling
	const color = [
		'border-primary',
		'border-success',
		'border-danger',
		'border-warning',
		'border-info',
	];

	return (
		<>
			<Col
				className={`${styles.container} ${className}`}
			>
				{topics.slice(0,max).map((item, i) => (
					<Col
						key={item.id}
						className={`${styles.item
							} ${color[Math.floor(i % color.length)]
							}`}
					>
						<Row className={`${styles.item_container}`}>
							<div className={`${styles.heading}`}>
								<a href={`${discourse.host}/t/${item.slug}/${item.id}`}>
									{`${item.has_accepted_answer ? '✅': ''} ${item.title}`}
								</a>
							</div>
							<div className={`fw-light ${styles.time}`}>
								updated {TimeSince(new Date(item.last_posted_at || item.created_at))}
							</div>
							<div className={`${styles.user_avatars}`}>
								{
									getAvatarUrlsForTopic(item, 32)
										.map((avatarItem) => (
											// eslint-disable-next-line @next/next/no-img-element
											<img
												className={styles.user_avatar}
												key={avatarItem.username}
												src={avatarItem.avatarUrl}
												alt={avatarItem.username}
												title={avatarItem.username}
											/>
										))
								}
							</div>
							<span className={styles.metrics}>
								<span className={`${styles.numbers}`}>
									<Like />
									{
										variant === 'unsolved' || variant === 'solved' ?
										 	postsByTopicId[item.id]?.like_count :
											item.like_count || 0
									}
								</span>
								<span className={`${styles.numbers}`}>
									<Comment />
									{item.posts_count - 1 || 0}
								</span>
								{
									typeof item.views !== 'undefined' ?
										<>
											<span className={`${styles.numbers}`}>
												<Eye />
												{item.views || 0}
											</span>
										</> : null
								}
							</span>
						</Row>
					</Col>
				))}
			</Col>
		</>
	);
}

export default DiscourseTopicList;
