'use client';

import { useState } from 'react';
import {Row, Col} from 'react-bootstrap';
import DiscourseTopicList from './DiscourseTopicList';
import styles from './styles/DiscourseTopicListTabs.module.css';

const DiscourseTopicListTabs = ({
	tabs = [], // {[variant: "latest", data: DiscourseData ]}
	max = 10,
	className = '',
	maxWidth = '100%'
}) => {
	const [currentTab, setCurrentTab] = useState(0)
	if (!tabs.length)
		return null;
	return (
		<Row
			className={`${styles.container} ${className}`}
			style={{
				maxWidth
			}}>
			<Col xs={12} className="d-flex justify-content-start p-3 pb-0">
				<div className={styles.TabGroup}>
					{tabs.map((tabData, idx) => (
						<button
							onClick={() => setCurrentTab(idx)}
							className={`${styles.TabButton} ${idx === currentTab ? styles.active : ''}`}
							key={tabData.variant}>
							{tabData.variant}
						</button>
					))}
				</div>
			</Col>
			<Col xs={12} className='p-3'>
				<DiscourseTopicList variant={tabs[currentTab].variant} max={max} data={tabs[currentTab].data}/>
			</Col>
		</Row>
	)
}

export default DiscourseTopicListTabs;
