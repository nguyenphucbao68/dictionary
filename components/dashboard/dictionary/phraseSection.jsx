import { AccordionWithOpenandCloseIcon } from './accordionComponent';
import { Accordion } from 'react-bootstrap';
export const PhraseSection = ({ item }) => {
    return (
        <>
            {item?.data?.map(
                (itemWord, i) => (
                    <li key={i}>
                        <span className='meaning-word phrase'>
                            {itemWord?.phraseName}
                        </span>
                        <div className='definition-phrase'>
                            {itemWord?.definition}
                        </div>
                        { itemWord?.example && <div className='shortEx phrase'>
                            <em>‘{itemWord?.example}’</em>
                        </div> }
                        
                        <Accordion>
                            <div
                                className='default-according style-1'
                                id='accordionoc'
                            >
                                <AccordionWithOpenandCloseIcon
                                    moreExample={
                                        itemWord?.examples
                                    }
                                />
                            </div>
                        </Accordion>
                    </li>
                )
            )}
        </>
    );
};
