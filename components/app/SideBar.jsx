import { Nav, NavItem, NavLink } from 'reactstrap';
import Link from 'next/link';
const SideBarPage = ({ currentPage, word }) => {
	return (
		<>
			<Nav className='nav flex-column nav-pills'>
				<NavItem key='menu1'>
					<Link href={`/words/${word}`}>
						<NavLink
							// href='#javascript'
							className={currentPage === 'details' ? 'active' : ''}
						>
							<i className='pe-7s-info'></i>
							Details
						</NavLink>
					</Link>
				</NavItem>
				<NavItem key='menu2'>
					<Link href={`/pronounce/${word}`}>
						<NavLink
							// href='#javascript'
							className={currentPage === 'pronounce' ? 'active' : ''}
						>
							<i className='pe-7s-video'></i>
							Pronounce
						</NavLink>
					</Link>
				</NavItem>
			</Nav>
		</>
	);
};
export default SideBarPage;
