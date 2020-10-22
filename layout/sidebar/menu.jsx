import { Home, Anchor, Headphones } from 'react-feather';
export const MENUITEMS = [
	{
		title: 'Home',
		icon: Home,
		type: 'sub',
		active: false,
		path: '/',
		// children: [
		// 	{ path: `/dashboard/default`, title: 'Default', type: 'link' },
		// 	{ path: `/dashboard/ecommerce`, title: 'Ecommerce', type: 'link' },
		// ],
	},
	{
		title: 'Look Up Dictionary',
		icon: Anchor,
		type: 'sub',
		active: false,
		path: '/dictionary'
		// children: [
		// 	{
		// 		path: `/starter-kits/sample-page`,
		// 		title: 'Sample Page',
		// 		type: 'link',
		// 	},
		// ],
	},
];
