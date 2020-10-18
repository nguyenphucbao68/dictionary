import { WordSection } from './wordSection';
import { OriginSection } from './originSection';
import { PhraseSection } from './phraseSection';
export const MeaningSection = ({item}) => {
	if (item?.name == 'Origin')
		return <OriginSection item={item} />
	else if (item?.name === 'Phrases')
		return <PhraseSection item={item} />
	else
		return <WordSection item={item} />	
};
