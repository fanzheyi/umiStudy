import React from 'react';
import { Button } from 'antd';
// import lose from '../assets/404.png'
import styles from './404.css'
import router from 'umi/router';
class Error extends React.Component {
	render() {
		return <div>
			<div className={styles.box}>
				{/* <img className={styles.img} src={lose} /> */}
				<p>没有找到您要查找的页面，别着急,</p>
				<p>请尝试其他操作，或与管理员取得联系。</p>
				<Button type="primary" onClick={router.goBack}>返回</Button>
			</div>

		</div>;
	}
}

export default Error;
