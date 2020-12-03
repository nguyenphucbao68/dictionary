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
  // console.time("start");
  const getDocWord = await getDocCollection(word, language);
  if (getDocWord.data?.data) {
    // console.timeEnd("start");
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
