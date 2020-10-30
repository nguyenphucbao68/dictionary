import Skeleton from 'react-loading-skeleton';
import {
	Card,
	CardHeader,
	CardBody,
	ListGroup,
	ListGroupItem,
} from 'reactstrap';
import Slider from 'react-slick';
import { Accordion } from 'react-bootstrap';
import dynamic from 'next/dynamic';
const ScrollArea = dynamic(() => import('react-scrollbar'), { ssr: false });

const SkeletonSection = () => {
	const slickSettings = {
		centerMode: true,
		centerPadding: '0px',
		slidesToShow: 4,
		dots: true,
		responsive: [
			{
				breakpoint: 992,
				settings: {
					arrows: true,
					centerMode: false,
					centerPadding: '0',
					slidesToShow: 1,
				},
			},
		],
	};
	return (
		<Card key='skeleton-pronounce' id='skeleton-pronounce' className='hidden'>
			<CardHeader>
				<Skeleton height={30} />
			</CardHeader>
			<CardBody>
				<Slider {...slickSettings}>
					<div className='slider-frame' key='frame1'>
						<div
							className='img-slider'
							style={{
								backgroundColor: `#888`,
							}}
						></div>
						<Skeleton />
					</div>
					<div className='slider-frame' key='frame2'>
						<div
							className='img-slider'
							style={{
								backgroundColor: `#888`,
							}}
						></div>
						<Skeleton />
					</div>
					<div className='slider-frame' key='frame3'>
						<div
							className='img-slider'
							style={{
								backgroundColor: `#888`,
							}}
						></div>
						<Skeleton />
					</div>
					<div className='slider-frame' key='frame4'>
						<div
							className='img-slider'
							style={{
								backgroundColor: `#888`,
							}}
						></div>
						<Skeleton />
					</div>
				</Slider>
				<div className='youtube'>
					{/* <YouTube
						videoId={pronounce[0].code}
						opts={opts}
						onReady={onReadyFunc}
						onPlay={onPlayFunc}
						onPause={onStopFunc}
					/> */}
					<div className='loader-box'>
						<div className='loader-17'></div>
					</div>
				</div>
				<div id='subtitle'>
					<Skeleton height={30} />
				</div>
				<div id='action-item'>
					<span className='left'>
						<button className='btn btn-primary'>
							<i className='icon-light-bulb'></i>
						</button>
					</span>
					<span className='pull-right'>
						<button className='btn btn-light' key='skip-backward'>
							<i className='icon-control-skip-backward'></i>
						</button>
						<button className='btn btn-light' key='skip-forward'>
							<i className='icon-control-skip-forward'></i>
						</button>
					</span>
				</div>
				<Accordion defaultActiveKey='0'>
					<div
						className='default-according style-1 meaningSection'
						id='accordionoc'
						key='section1'
					>
						<Card>
							<CardHeader className='bg-light p-0 border-0'>
								<h5 className='mb-0'>
									<Accordion.Toggle
										className='btn txt-dark btn-outline-light btn-square'
										color='light'
										eventKey='0'
										key='section3'
									>
										<i className='icofont icofont-square-right'></i>
										Subtitle
									</Accordion.Toggle>
								</h5>
							</CardHeader>
							<Accordion.Collapse eventKey='0' key='section5'>
								<ListGroup
									className='moreExample'
									id='subTitle'
									key='section7'
								>
									<ScrollArea
										horizontal={false}
										vertical={true}
										key='section9'
									>
										<ListGroupItem key={`titleSub1`}>
											<span className='badge badge-primary'>
												0.00
											</span>{' '}
											<Skeleton count={1} />
										</ListGroupItem>
										<ListGroupItem key={`titleSub2`}>
											<span className='badge badge-primary'>
												0.00
											</span>{' '}
											<Skeleton count={1} />
										</ListGroupItem>
										<ListGroupItem key={`titleSub3`}>
											<span className='badge badge-primary'>
												0.00
											</span>{' '}
											<Skeleton count={1} />
										</ListGroupItem>
									</ScrollArea>
								</ListGroup>
							</Accordion.Collapse>
						</Card>
					</div>
				</Accordion>
			</CardBody>
		</Card>
	);
};
export default SkeletonSection;
