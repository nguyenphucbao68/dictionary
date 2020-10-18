import React, { useState, useEffect } from 'react';
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
	Dropdown, DropdownMenu, DropdownItem, Button
} from 'reactstrap';
import { MeaningSection } from './meaningSection';
import Head from 'next/head';
import ErrorPage from 'next/error';
import Link from 'next/link';
import { Send, Clock } from 'react-feather';

const Dictionary = ({ definition, relatedWord }) => {
	const [BasicLineTab, setBasicLineTab] = useState('1');
	// console.log(definition[0].meaning.noun);
	// const router = useRouter();
	if (
		// !router.isFallback ||
		// typeof definition?.slug === 'undefined' ||
		!definition ||
		!definition.length
	) {
		return <ErrorPage statusCode={404} />;
	}

	const [daytimes, setDayTimes] = useState()
	const today = new Date()
	const curHr = today.getHours()
	const curMi = today.getMinutes()
	const [meridiem, setMeridiem] = useState("AM")
	// eslint-disable-next-line
	const [date, setDate] = useState({ date: new Date() });
	// eslint-disable-next-line
	const [startDate, setStartDate] = useState(new Date());
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [keyword, setKeyword] = useState('');
	const [listWord, setListWord] = useState([]);
	const handleChange = date => {
		setDate(date)
	};

	const onClickAudio = (url) => {
		var audio = new Audio(url);
		audio.play();
	}

	const onChangeKeyWord = async (e) => {
		const keyword = e.target?.value;
		setKeyword(e.target?.value);
		try {
			const res = await fetch(`http://localhost/restful/index.php/search/${keyword}/8`);
			const obj = res.json();
			console.log('obj', await obj);
			setListWord(await obj);
		} catch (error) {
			console.log('err', error);
		}

	}

	useEffect(() => {
		if (curHr < 12) {
			setDayTimes('Good Morning')
		} else if (curHr < 18) {
			setDayTimes('Good Afternoon')
		} else {
			setDayTimes('Good Evening')
		}

		if (curHr >= 12) {
			setMeridiem('PM')
		} else {
			setMeridiem('AM')
		}
	}, [])

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
			<Container fluid={true}>
				<Row className="appointment-sec mt-2">
					<Col md='12' className="chat-default">
						<Card>
							<CardBody className="search-words">
								<div className="dropdown">
									<div className="input-group input-group-lg search-input">
										<input
											type="text"
											className="form-control"
											aria-label="Text input with segmented dropdown button"
											id="keyword-search"
											placeholder="Search eduDawn's Dictionary"
											onChange={onChangeKeyWord}
										/>
										<a
											className="language-switcher"
											onClick={() => ModalLanguageSwitcher()}
										>
											English - English
    </a>
										<button type="button" className="btn btn-light">
											<img width={31} src="../assets/images/landing/search-icon.png" />
										</button>
									</div>
									<div
										className="dropdown-menu row show"
										id="related-words"
										aria-labelledby="dropdownMenuButton"
									>
										<div className="col-md-6">
											{listWord.filter((item, i) => i < (listWord.length / 2)).map((item) => (
												<>
													<Link href={`/words/${item?.word}`}>
														<a className="dropdown-item">
															{item.word == keyword ? (<strong>{item?.word}</strong>) : item?.word}
														</a>
													</Link>

												</>
											))}

										</div>
										<div className="col-md-6">
											{listWord.filter((item, i) => i >= (listWord.length / 2)).map((item) => (
												<>
													<Link href={`/words/${item?.word}`}>
														<a className="dropdown-item">
															{item?.word}
														</a>
													</Link>
												</>
											))}
										</div>
									</div>
								</div>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
			<Breadcrumb parent='Dashboard' title='Default' />
			<Container fluid={true}>
				<Row>
					<Col md='9'>
						<Card>
							<CardHeader>
								<h1>
									{definition[0].word}
									{/* <span className='uk-text-small'>noun</span> */}
								</h1>
								<div>
									<span className='speaker-word'>
										<i className='txt-primary icofont icofont-audio' onClick={() => onClickAudio(definition[0].pronunciation)}></i>{' '}
										{definition[0].phonetic}
									</span>

								</div>
							</CardHeader>
							<CardBody className='content-words'>
								{definition[0].meaning.map(
									(item, i) => (
										<div className='meaningSection' key={i}>
											<h3 className='sec'>
												{item?.name.toUpperCase()}
											</h3>
											<ol className='meaning-section'>
												<MeaningSection item={item} />
											</ol>
											<hr />
										</div>
									)
								)}
							</CardBody>
						</Card>
						{/* <DataTables /> */}
					</Col>

					<Col md='3'>
						<h4>Other Results</h4>
						<Card className='m-b-0 related-section'>
							<Nav className='m-b-0' tabs>
								<NavItem>
									<NavLink
										href='#javascript'
										className={
											BasicLineTab === '1' ? 'active' : ''
										}
										onClick={() => setBasicLineTab('1')}
									>
										Matches
									</NavLink>
								</NavItem>
							</Nav>
							<TabContent activeTab={BasicLineTab}>
								<TabPane className='fade show' tabId='1'>
									<ListGroup>
										{relatedWord?.map((item, i) => (
											<ListGroupItem
												className='btn-square btn btn-outline-light txt-dark'
												action
												key={i}
											>
												<Link href={item.word}><a>{item.word}</a></Link>
											</ListGroupItem>
										))}

									</ListGroup>
								</TabPane>
							</TabContent>
						</Card>
						<button
							className='mt-3 btn btn-outline-primary btn-lg'
							id='view-more'
						>
							Xem thêm
								</button>

						<Card className="o-hidden profile-greeting mt-3">
							<CardBody>
								<div className="media">
									<div className="badge-groups w-100">
										<div className="badge f-12">
											<Clock style={{ width: "16px", height: "16px" }} className="mr-1" />
											<span id="txt">{curHr}:{curMi < 10 ? "0" + curMi : curMi} {meridiem}</span>
										</div>
										<div className="badge f-12"><i className="fa fa-spin fa-cog f-14"></i></div>
									</div>
								</div>
								<div className="greeting-user text-center">
									{/* <span id="greeting">{daytimes}</span> */}
									<div className="profile-vector"><img className="img-fluid" src="../assets/images/dashboard/welcome.png" alt="" /></div>
									<h4 className="f-w-600"> comfortable <span className="right-circle"><i className="fa fa-check-circle f-14 middle"></i></span></h4>
									<div className="whatsnew-btn"><a className="btn btn-primary" href="#javascript">Whats New !</a></div>
									<div className="left-icon"><i className="fa fa-bell"> </i></div>
								</div>
							</CardBody>
						</Card>
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

export default Dictionary;
