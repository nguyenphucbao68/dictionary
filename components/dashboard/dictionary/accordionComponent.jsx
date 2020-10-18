import { useState } from 'react';
import {
	Card,
	CardHeader,
	CardBody,
	ListGroup,
	ListGroupItem,
} from 'reactstrap';
import { Accordion } from 'react-bootstrap';
export const AccordionWithOpenandCloseIcon = ({ moreExample, synonyms }) => {
	const [expanded1, setexpanded1] = useState(true);
	const [expanded2, setexpanded2] = useState(false);
	const Accordion1 = () => {
		setexpanded1(!expanded1);
		setexpanded2(false);
	};
	const Accordion2 = () => {
		setexpanded2(!expanded2);
		setexpanded1(false);
	};
	return (
		<>
			{moreExample ? (
				<>
					<Card>
						<CardHeader className='bg-light p-0 border-0'>
							<h5 className='mb-0'>
								<Accordion.Toggle
									as={Card.Header}
									className='btn txt-dark btn-outline-light btn-square'
									color='light'
									onClick={Accordion1}
									eventKey='0'
									aria-expanded={expanded1}
								>
									<i className='icofont icofont-square-right'></i>More
									example sentences
								</Accordion.Toggle>
							</h5>
						</CardHeader>
						<Accordion.Collapse eventKey='0'>
							<ListGroup className='moreExample'>
								{moreExample?.map((item, i) => (
									<ListGroupItem key={i}>{item}</ListGroupItem>
								))}
							</ListGroup>
						</Accordion.Collapse>
					</Card>
				</>
			) : (
				<>{}</>
			)}
			{synonyms ? (
				<>
					<Card>
						<CardHeader className='bg-light p-0 border-0'>
							<h5 className='mb-0'>
								<Accordion.Toggle
									as={Card.Header}
									className='btn txt-dark btn-outline-light btn-square'
									color='light'
									onClick={Accordion2}
									eventKey='1'
									aria-expanded={expanded2}
								>
									<i className='icofont icofont-tags'></i>Synonyms
								</Accordion.Toggle>
							</h5>
						</CardHeader>
						<Accordion.Collapse eventKey='1'>
							<>
								<CardBody className='syn-words'>
									{synonyms?.map((item, i) => (
										<a
											key={i}
											className='btn btn-outline-light txt-dark related-words btn-xs'
										>
											{item}
										</a>
									))}
								</CardBody>
							</>
						</Accordion.Collapse>
					</Card>
				</>
			) : (
				<></>
			)}
		</>
	);
};
