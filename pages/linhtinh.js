import Sample from '../components/dashboard/default';
import App from '../components/app';
// const { store } = dynamic(import('../store'), { ssr: false });
import React, { useState, useEffect } from 'react';
// import ScrollToTop from '../layout/scroll_to_top';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ConfigDB from '../data/customizer/config';
import dynamic from 'next/dynamic';
// var template = { __html: __html };
// import Store from '../store';
const ScrollToTop = dynamic(import('../layout/scroll_to_top'), { ssr: false });

// import './index.scss';
React.useLayoutEffect = React.useEffect;

const Home = ({ store }) => {
	const [anim, setAnim] = useState('');
	// localStorage.getItem('animation') ||
	const animation = ConfigDB.data.router_animation || 'fade';

	useEffect(() => {
		const abortController = new AbortController();
		setAnim(animation);
		console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
		console.disableYellowBox = true;
		return function cleanup() {
			abortController.abort();
		};
		// eslint-disable-next-line
	}, []);

	return (
		<>
			<App>
				<Sample />
			</App>
		</>
	);
};

export default Home;
