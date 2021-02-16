import Dictionary from "../../../components/dashboard/dict";
import App from "../../../components/app";
import React from "react";
import { getDefinitions } from "../../../lib/dictionary";
import { storeCollection, getDocCollection } from "../../../lib/api";

React.useLayoutEffect = React.useEffect;
const Home = ({ definition, language, word }) => {
  return (
    <>
      <App>
        <Dictionary definition={definition} language={language} word={word} />
      </App>
    </>
  );
};
export async function getServerSideProps({ params }) {
  const { word, language } = params;
  const wordLang = word.join("/");
  const getDocWord = await getDocCollection(wordLang, language);
  if (getDocWord?.data?.data) {
    return {
      props: {
        definition: getDocWord?.data,
        language,
        word: wordLang,
      },
    };
  }
  const definition = await getDefinitions(wordLang, language);
  storeCollection(wordLang, language, definition);
  return {
    props: { definition: definition?.data, language, word: wordLang },
  };
}
export default Home;
