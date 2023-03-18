'use client';
import {useState, useEffect, useCallback} from 'react';
import { Col, Row } from 'react-bootstrap';
import styles from './styles/DiscourseTopicList.module.css';
import useDiscourseClient from './useDiscourseClient';
import Like from '../../SvgIcons/Like';
import Comment from '../../SvgIcons/Comment';
import Eye from '../../SvgIcons/Eye';
import DefaultAvatarUrl from './assets/no_user.png';
import { Loader } from '../../loader';

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
	variant = 'latest', // latest, top, unsolved 
	max = 10,
	className = ''
}) {
	const discourse = useDiscourseClient();
	const [loading, setLoading] = useState(true);
	const [topics, setTopics] = useState([]); 
	const [postsByTopicId, setPosts] = useState(new Object()); 
	const [topicUsers, setTopicUsers] = useState(new Object());

	const setTopicsAndUsers = useCallback((data) => {
		const usersMap = new Object();
		(data.users || []).map((u) => {
			usersMap[u.id] = u;
		})
		setTopicUsers(usersMap);
		if (variant === 'unsolved') {
			const postsMap = new Object();
			(data.posts || []).map((p) => {
				postsMap[p.topic_id] = p;
			})
			setPosts(postsMap);
			setTopics(data.topics);
		} else {
			setTopics(data.topic_list?.topics || []);
		}
	}, [variant]);

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
		if (variant === 'unsolved') {
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

	useEffect(()=> {
		const loadTopics = async () => {
			setLoading(true);
			let data = {};
			try {
				if (variant === 'latest') {
			 		data = await discourse.getLatestTopics()
				}
				if (variant === 'top') {
					data = await discourse.getTopTopics()
				}
				if (variant === 'unsolved') {
					data = await discourse.getUnsolvedTopics()
				}
				setTopicsAndUsers(data);
			} catch (e) {
				console.error(e);
			} finally {
				setLoading(false);
			}
		}
		loadTopics();
 	}, [discourse, setTopicsAndUsers, variant]);

	//generates random colour for border styling
	const color = [
		'border-primary',
		'border-success',
		'border-danger',
		'border-warning',
		'border-info',
	];

	if (loading) {
		return (
			<Col
				className={`${styles.container}`}
			>
				{
					Array(max)
						.fill(null)
						.map((_, i) => (
							<Col
								key={i}
								className={`${styles.item
									} ${
										styles.loading
									} ${color[Math.floor(i%color.length)]
									}`}
							>
							</Col>
						))
				}
			</Col>
		)
	}
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
							<div className={`${styles.heading} text-truncate`}>
								<a href={`${discourse.host}/t/${item.slug}/${item.id}`}>
									{item.title}
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
										variant === 'unsolved' ?
										 	postsByTopicId[item.id]?.like_count :
											item.like_count || 0
									}
								</span>
								<span className={`${styles.numbers}`}>
									<Comment />
									{item.posts_count - 1 || 0}
								</span>
								{
									variant !== 'unsolved' ?
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
