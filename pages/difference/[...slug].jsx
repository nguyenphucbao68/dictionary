import Difference from '../../components/dashboard/difference';
import App from '../../components/app';
import React, { useState, useEffect } from 'react';
import ConfigDB from '../../data/customizer/config';
import dynamic from 'next/dynamic';
// import {
// 	searchWordOnYoutube,
// 	getSubtitleFromVideo,
// } from '../../lib/dictionary';
import { getListDifference } from '../../lib/api';
const ScrollToTop = dynamic(import('../../layout/scroll_to_top'), {
	ssr: false,
});
import Error from 'next/error';

React.useLayoutEffect = React.useEffect;

const Home = ({ difference }) => {
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
			{/* <ScrollToTop /> */}
			<App>
				<Difference difference={difference} />
			</App>
		</>
	);
};
export async function getServerSideProps({ params }) {
	if (params.slug.length > 3)
		return {
			props: {},
		};
	let difference = await getListDifference(params.slug);
	return {
		props: {
			difference,
		},
	};
}
export default Home;
