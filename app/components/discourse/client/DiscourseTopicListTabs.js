'use client';

import { useState } from 'react';
import {Row, Col} from 'react-bootstrap';
import DiscourseTopicList from './DiscourseTopicList';
import styles from './styles/DiscourseTopicListTabs.module.css';

const DiscourseTopicListTabs = ({
	tabs = ['top', 'latest', 'unsolved'],
	max = 10,
	className = '',
	maxWidth = '100%'
}) => {
	const [currentTab, setCurrentTab] = useState('top')
	return (
		<Row
			className={`${styles.container} ${className}`}
			style={{
				maxWidth
			}}>
			<Col xs={12} className="d-flex justify-content-start p-3 pb-0">
				<div className={styles.TabGroup}>
					{tabs.map(tab => (
						<button
							onClick={() => setCurrentTab(tab)}
							className={`${styles.TabButton} ${tab === currentTab ? styles.active : ''}`}
							key={tab}>
							{tab}
						</button>
					))}
				</div>
			</Col>
			<Col xs={12} className='p-3'>
				<DiscourseTopicList variant={currentTab} max={max}/>
			</Col>
		</Row>
	)
}

export default DiscourseTopicListTabs;
