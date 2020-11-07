import React, { useState, useEffect, useRef, Suspense } from 'react';
import Router from 'next/router';
import Breadcrumb from '../../../layout/breadcrumb';
import {
	Container,
	Row,
	Col,
	Card,
	CardHeader,
	CardBody,
	ListGroup,
	ListGroupItem,
	Nav,
	NavItem,
	NavLink,
	TabContent,
	TabPane,
} from 'reactstrap';
import Head from 'next/head';
import ErrorPage from 'next/error';
import useOutsideClick from '../../../lib/event';
import DifferenceLayout from './differenceLayout';
Router.onRouteChangeStart = () => {
	// if (window.runned) return;
	document.getElementById('skeleton-pronounce')?.classList.remove('hidden');
	document.getElementById('skeleton-pronounce')?.classList.add('show');
	document.getElementById('pronounce-info')?.classList.remove('show');
	document.getElementById('pronounce-info')?.classList.add('hidden');
};
Router.onRouteChangeComplete = () => {
	document.getElementById('skeleton-pronounce')?.classList.remove('show');
	document.getElementById('skeleton-pronounce')?.classList.add('hidden');
	document.getElementById('pronounce-info')?.classList.remove('hidden');
	document.getElementById('pronounce-info')?.classList.add('show');
};
Router.onRouteChangeError = () => {
	document.getElementById('skeleton-pronounce')?.classList.remove('show');
	document.getElementById('skeleton-pronounce')?.classList.add('hidden');
	document.getElementById('pronounce-info')?.classList.remove('hidden');
	document.getElementById('pronounce-info')?.classList.add('show');
};

const Difference = ({ difference }) => {
	const [BasicLineTab, setBasicLineTab] = useState('1');
	// console.log(definition[0].meaning.noun);
	// const router = useRouter();
	// if(router.isFallback){
	// 	return <div>Loading...</div>;
	// }
	// if (
	// 	// !router.isFallback ||
	// 	// typeof definition?.slug === 'undefined' ||
	// 	!pronounce ||
	// 	!pronounce.length
	// ) {
	// 	return <ErrorPage statusCode={404} />;
	// }

	const ref = useRef();
	const [daytimes, setDayTimes] = useState();
	const today = new Date();
	const curHr = today.getHours();
	const curMi = today.getMinutes();
	const [meridiem, setMeridiem] = useState('AM');
	// eslint-disable-next-line
	const [date, setDate] = useState({ date: new Date() });
	// eslint-disable-next-line
	const [startDate, setStartDate] = useState(new Date());
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [keyword, setKeyword] = useState('');
	const [listWord, setListWord] = useState([]);
	const [showResults, setShowResults] = useState(false);
	const [loading, setLoading] = useState(false);
	const handleChange = (date) => {
		setDate(date);
	};
	const [VerticleTab, setVerticleTab] = useState('2');

	// useEffect(() => {
	// 	document.getElementById('skeleton-pronounce')?.classList.remove('hidden');
	// 	document.getElementById('skeleton-pronounce')?.classList.add('show');
	// 	document.getElementById('pronounce-info')?.classList.remove('show');
	// 	document.getElementById('pronounce-info')?.classList.add('hidden');
	// 	window.runned = true;
	// }, []);

	const clickInputSearch = () => {
		if (keyword === '') return;
		setShowResults(true);
	};

	useOutsideClick(ref, () => {
		// alert('You clicked outside')
		setShowResults(false);
	});

	const onClickAudio = (url) => {
		var audio = new Audio(url);
		audio.play();
	};

	const onChangeKeyWord = async (e) => {
		const keyword = e.target?.value;
		setKeyword(e.target?.value);
		try {
			const res = await fetch(`/api/index.php/search/${keyword}/8`);
			const obj = res.json();
			setListWord(await obj);
			setShowResults(true);
		} catch (error) {
			// console.log('err', error);
		}
	};

	useEffect(() => {
		if (curHr < 12) {
			setDayTimes('Good Morning');
		} else if (curHr < 18) {
			setDayTimes('Good Afternoon');
		} else {
			setDayTimes('Good Evening');
		}

		if (curHr >= 12) {
			setMeridiem('PM');
		} else {
			setMeridiem('AM');
		}
	}, []);
	return (
		<>
			<Head>
				<link
					href='https://fonts.googleapis.com/css2?family=Gentium+Basic:ital@1&display=swap'
					rel='stylesheet'
				/>
				<link
					href='https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,700;1,300;1,400&display=swap'
					rel='stylesheet'
				/>
			</Head>
			<Breadcrumb parent='Dashboard' title='Default' />
			<Container
				fluid={true}
				id='word-info'
				key='container2'
				className='jkanban-container'
			>
				<Row>
					<Col md='12' key='md7'>
						<DifferenceLayout difference={difference} />
						{/* <YoutubeResources pronounce={pronounce} subTitle={subTitle} /> */}
					</Col>
				</Row>
			</Container>

			<style jsx global>{`
				.uk-text-small {
					font-size: 0.8rem !important;
					line-height: 1.5;
				}
				.content-words h2,
				.content-words h3,
				.content-words h4,
				.content-words h5 {
					font-family: Roboto;
				}
				.content-words {
					font-size: 16px;
				}

				.related-section {
					border-bottom-left-radius: 0px !important;
					border-bottom-right-radius: 0px !important;
				}
				#view-more {
					width: 100%;
				}
			`}</style>
		</>
	);
};

export default Difference;
