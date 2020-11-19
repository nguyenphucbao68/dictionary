import Pronounce from '../../components/dashboard/pronounce';
import App from '../../components/app';
import React, { useState, useEffect } from 'react';
import ConfigDB from '../../data/customizer/config';
import dynamic from 'next/dynamic';
import {
	searchWordOnYoutube,
	getSubtitleFromVideo,
} from '../../lib/dictionary';
import { storeCollection, getDocCollection } from '../../lib/api';
const ScrollToTop = dynamic(import('../../layout/scroll_to_top'), {
	ssr: false,
});

React.useLayoutEffect = React.useEffect;

const Home = ({ pronounce, subTitle, word }) => {
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
				<Pronounce pronounce={pronounce} subTitle={subTitle} word={word} />
			</App>
		</>
	);
};
export async function getServerSideProps({ params }) {
	const getDocWord = await getDocCollection(params.slug, 'pronounce');

	if (getDocWord.data?.length) {
		const subTitleDoc = await getSubtitleFromVideo(getDocWord?.data[0]?.code);

		return {
			props: {
				pronounce: getDocWord.data,
				subTitle: subTitleDoc?.result.transcript.text,
				word: params?.slug,
			},
		};
	}
	const youList = await searchWordOnYoutube(params.slug);
	const subTitle = await getSubtitleFromVideo(youList?.data[0]?.code);

	storeCollection(params.slug, youList, 'pronounce');
	return {
		props: {
			pronounce: youList?.data,
			subTitle: subTitle?.result.transcript.text,
			word: params?.slug,
		},
	};
}
export default Home;