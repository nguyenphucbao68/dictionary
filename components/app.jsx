import React from 'react';
import Loader from '../layout/loader';
import Header from '../layout/header';
import Sidebar from '../layout/sidebar';
import Footer from '../layout/footer';
import dynamic from 'next/dynamic';
const ThemeCustomize = dynamic(() => import('../layout/theme-customizer'), {
	ssr: false,
});
// import ThemeCustomize from '../layout/theme-customizer';
import { ToastContainer } from 'react-toastify';
const App = ({ children }) => {
	console.warn = () => {};
	return (
		<>
			{/* <Loader /> */}
			<div className='page-wrapper compact-wrapper' id='pageWrapper'>
				<Header />
				<div className='page-body-wrapper sidebar-icon'>
					<Sidebar />
					<div className='page-body'>{children}</div>
					<Footer />
					<ThemeCustomize />
				</div>
			</div>
			<ToastContainer />
		</>
	);
};

export default App;
