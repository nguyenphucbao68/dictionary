import Head from 'next/head';
// import withRedux from 'next-redux-wrapper';
import dynamic from 'next/dynamic';
import { Provider } from 'react-redux';
import { wrapper } from '../store';
import "nprogress/nprogress.css";
// const wrapper = dynamic(import('../store'), { ssr: false });
// const TopProgressBar = dynamic(() => import("../components/app/TopProgressBar"), {
// 	ssr: false,
// });

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				<meta charSet='utf-8' />
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1'
				/>
				<meta name='theme-color' content='#000000' />
				<meta
					name='description'
					content='Web site created using create-react-app'
				/>
				<title>Cuba - Premium Admin Template</title>
				{/* Google font*/}
				<link
					href='https://fonts.googleapis.com/css?family=Rubik:400,400i,500,500i,700,700i&display=swap'
					rel='stylesheet'
				/>
				<link
					href='https://fonts.googleapis.com/css?family=Roboto:300,300i,400,400i,500,500i,700,700i,900&display=swap'
					rel='stylesheet'
				/>
				<title>Create Next App</title>
				<link rel='icon' href='/favicon.ico' />

				<link
					rel='stylesheet'
					type='text/css'
					href='../assets/css/getBootstrap.min.css'
				/>
				<link
					rel='stylesheet'
					type='text/css'
					href='../assets/css/styleReact.min.css'
				/>
				<link rel='stylesheet' href='../test.css' />
			</Head>
			<Component {...pageProps} />
			<link
				rel='stylesheet'
				type='text/css'
				href='//cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/leaflet.css'
			/>
		</>
	);
}

export default wrapper.withRedux(MyApp);
