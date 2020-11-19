import { AccordionWithOpenandCloseIcon } from './accordionComponent';
import { Accordion } from 'react-bootstrap';
export const WordSection = ({ item }) => {
    // console.log(item);
    return (
        <>
            {/* {JSON.stringify(definition[0].meaning[item])} */}
            {item?.data?.map(
                (itemWord, i) => (
                    <li key={i} className={!itemWord?.definition ? 'ignore-order' : ''}>
                        {itemWord?.definition && <span className='meaning-word'>
                            {itemWord?.definition}
                        </span>}
                        {itemWord?.example && <div className='shortEx'>
                            <em>{itemWord?.example}</em>
                        </div>}
                        
                        <Accordion>
                            <div
                                className='default-according style-1'
                                id='accordionoc'
                            >
                                <AccordionWithOpenandCloseIcon
                                    moreExample={
                                        itemWord?.examples
                                    }
                                    synonyms={
                                        itemWord?.synonyms
                                    }
                                />
                            </div>
                        </Accordion>
                        <ol className='examples'>
                            {itemWord.subSenses?.map(
                                (subSense, j) => (
                                    <li key={j}>
                                        <span className='meaning-word'>
                                            {
                                                subSense?.definition
                                            }
                                        </span>
                                        {subSense?.example ? (
                                            <>
                                                <div className='shortEx'>
                                                    <em>
                                                        ‘
																									{
                                                            subSense?.example
                                                        }
																									’
																								</em>
                                                </div>
                                            </>
                                        ) : (
                                                <></>
                                            )}

                                        <Accordion>
                                            <div
                                                className='default-according style-1'
                                                id='accordionoc'
                                            >
                                                <AccordionWithOpenandCloseIcon
                                                    moreExample={
                                                        subSense?.examples
                                                    }
                                                    synonyms={
                                                        subSense?.synonyms
                                                    }
                                                />
                                            </div>
                                        </Accordion>
                                    </li>
                                )
                            )}
                        </ol>
                    </li>
                )
            )}
        </>
    );
};
