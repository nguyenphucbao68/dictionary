import Dictionary from "../../../components/dashboard/dict";
import App from "../../../components/app";
import React, { useState, useEffect } from "react";
import ConfigDB from "../../../data/customizer/config";
import { getDefinitions, getDefinitions2 } from "../../../lib/dictionary";
import { storeCollection, getDocCollection } from "../../../lib/api";

React.useLayoutEffect = React.useEffect;
const Home = ({ definition, language, word }) => {
  const [anim, setAnim] = useState("");
  const animation = ConfigDB.data.router_animation || "fade";

  useEffect(() => {
    const abortController = new AbortController();
    setAnim(animation);
    console.ignoredYellowBox = ["Warning: Each", "Warning: Failed"];
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
