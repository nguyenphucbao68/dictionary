import { useEffect } from 'react';
import { useRouter, withRouter } from 'next/router';

const ScrollToTop = ({ router }) => {
	// const router = useRouter();

	useEffect(() => {
		const unlisten = router.beforePopState(() => {
			window.scrollTo(0, 0);
		});
		return () => {
			unlisten();
		};
	}, []);

	return null;
};

export default withRouter(ScrollToTop);
