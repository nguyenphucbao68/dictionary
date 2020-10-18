import React, { useState, useEffect } from 'react';
// import '../../assets/scss/';
const Loader = (props) => {
	const [show, setShow] = useState(true);
	useEffect(() => {
		const timeout = setTimeout(() => {
			setShow(false);
		}, 3000);

		return () => {
			clearTimeout(timeout);
		};
	}, [show]);

	return (
		<>
			<div className={`loader-wrapper ${show ? '' : 'loderhide'}`}>
				<div className='loader-index'>
					<span></span>
				</div>
				<svg>
					<defs></defs>
					<filter id='goo'>
						<fegaussianblur
							in='SourceGraphic'
							stdDeviation='11'
							result='blur'
						></fegaussianblur>
						<fecolormatrix
							in='blur'
							values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9'
							result='goo'
						>
							{' '}
						</fecolormatrix>
					</filter>
				</svg>
			</div>
		</>
	);
};

export default Loader;
