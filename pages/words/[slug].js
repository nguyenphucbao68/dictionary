import Dictionary from '../../components/dashboard/dictionary';
import App from '../../components/app';
// const { store } = dynamic(import('../store'), { ssr: false });
import React, { useState, useEffect } from 'react';
// import ScrollToTop from '../layout/scroll_to_top';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ConfigDB from '../../data/customizer/config';
import dynamic from 'next/dynamic';
import { findDefinitions } from '../../lib/dictionary';
import { storeCollection, getDocCollection } from '../../lib/api';
// import Store from '../store';
const ScrollToTop = dynamic(import('../../layout/scroll_to_top'), {
	ssr: false,
});
import { useRouter } from 'next/router';

React.useLayoutEffect = React.useEffect;

const Home = ({ definition, relatedWord, word }) => {
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
			{/* <Provider sotre={store}> */}
			{/* <ScrollToTop /> */}
			<App>
				{/* <TransitionGroup>
					<CSSTransition
						in={true}
						timeout={100}
						classNames={anim}
						unmountOnExit
					> */}
				{/* <div> */}
				<Dictionary
					definition={definition}
					relatedWord={relatedWord}
					word={word}
				/>
				{/* </div> */}
				{/* </CSSTransition> */}
				{/* </TransitionGroup> */}
			</App>
			{/* </Provider> */}
		</>
	);
};
export async function getServerSideProps({ params }) {
	const getDocWord = await getDocCollection(params.slug);
	if (getDocWord.data?.length) {
		return {
			props: {
				definition: getDocWord.data,
				relatedWord: getDocWord.relatedWords,
				word: params.slug,
			},
		};
	}
	const definition = await findDefinitions(params.slug, 'en');
	storeCollection(params.slug, definition);
	return {
		props: {
			definition: definition.data,
			relatedWord: definition.relatedWords,
			word: params.slug,
		},
	};
}
export default Home;
