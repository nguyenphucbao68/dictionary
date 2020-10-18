import React from 'react';
import Bookmark from '../bookmark';
import { Container, Row, Col, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Home } from 'react-feather';
// import {Link} from 'react-router-dom'
import Link from 'next/link';
const Breadcrumbs = (props) => {
	return (
		<>
			<Container fluid={true}>
				<div className='page-header'>
					<Row>
						<Col xs='6'>
							<h3>{props.title}</h3>
							<Breadcrumb>
								<BreadcrumbItem>
									<Link href='/dashboard/default'>
										<a>
											<Home />
										</a>
									</Link>
								</BreadcrumbItem>
								<BreadcrumbItem>{props.parent}</BreadcrumbItem>
							</Breadcrumb>
						</Col>
						<Bookmark />
					</Row>
				</div>
			</Container>
		</>
	);
};

export default Breadcrumbs;
