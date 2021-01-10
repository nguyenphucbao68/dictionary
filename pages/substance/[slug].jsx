import Substance from "../../components/dashboard/chemistry/substance";
import App from "../../components/app";
import React from "react";
import { getSubstance } from "../../lib/dictionary";
// import { storeCollection, getDocCollection } from "../../lib/api";

React.useLayoutEffect = React.useEffect;
const SubstancePage = ({ substance, name, language }) => {
  return (
    <>
      <App>
        <Substance substance={substance} name={name} language={language} />
      </App>
    </>
  );
};
export async function getServerSideProps({ params }) {
  // const getDocWord = await getChemicalCollection(params.slug);

  // if (getDocWord.data?.nameLang) {
  //  // var subTitleDoc = await getSubtitleFromVideo(getDocWord?.data[0]?.code);
  //   var i = 0;
  //   while (!subTitleDoc.result) {
  //     subTitleDoc = await getSubtitleFromVideo(getDocWord?.data[++i]?.code);
  //   }
  //   return {
  //     props: {
  //       pronounce: getDocWord.data,
  //       subTitle: subTitleDoc?.result?.transcript?.text,
  //       word: params?.slug,
  //       defaultVideo: i,
  //     },
  //   };
  // }
  const substance = await getSubstance(params.slug);
  // storeCollection(params.slug, "en_en", youList, "pronounce");
  return {
    props: {
      substance: substance,
      name: params.slug,
      language: "en",
    },
  };
}
export default SubstancePage;
