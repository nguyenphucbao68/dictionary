import Dictionary from '../../../components/dashboard/dict';
import App from '../../../components/app';
// const { store } = dynamic(import('../store'), { ssr: false });
import React, { useState, useEffect } from 'react';
// import ScrollToTop from '../../layout/scroll_to_top';
// import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ConfigDB from '../../../data/customizer/config';
import dynamic from 'next/dynamic';
import { getDefinitions, getDefinitions2 } from '../../../lib/dictionary';
import { storeCollection, getDocCollection } from '../../../lib/api';
// import Store from '../../store';
const ScrollToTop = dynamic(import('../../../layout/scroll_to_top'), {
  ssr: false,
});
import { useRouter } from 'next/router';

React.useLayoutEffect = React.useEffect;
// definition?, relatedWord?, word
const Home = ({ definition, language, word }) => {
  const [anim, setAnim] = useState('');
  // localStorage.getItem('animation') ||
  const animation = ConfigDB.data.router_animation || 'fade';

  useEffect(() => {
    const abortController = new AbortController();
    setAnim(animation);
    console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
    console.disableYellowBox = true;
    return function cleanup() {
      abortController.abort();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {/* <ScrollToTop /> */}
      <App>
        <Dictionary definition={definition} language={language} word={word} />
      </App>
    </>
  );
};
export async function getServerSideProps({ params }) {
  const { word, language } = params;
  const getDocWord = await getDocCollection(word, language);
  if (getDocWord.data?.data) {
    return {
      props: {
        definition: getDocWord.data,
        language,
        word,
      },
    };
  }
  const definition = await getDefinitions(word, language);
  storeCollection(word, language, definition);
  return {
    props: { definition: definition?.data, language, word },
  };
}
export default Home;
