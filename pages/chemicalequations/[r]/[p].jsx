import Reaction from "../../../components/dashboard/chemistry/reaction";
import App from "../../../components/app";
import React from "react";
import { getChemicalReaction } from "../../../lib/api";
React.useLayoutEffect = React.useEffect;
const ReactionPage = () => {
  return (
    <>
      <App>
        <Reaction />
      </App>
    </>
  );
};
export async function getServerSideProps({ params }) {
  const { p, r } = params;
  const reaction = await getChemicalReaction(r, p);
  return {
    props: {},
  };
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
  //   const substance = await getSubstance(params.slug);
  //   // storeCollection(params.slug, "en_en", youList, "pronounce");
  //   return {
  //     props: {
  //       substance: substance,
  //       name: params.slug,
  //       language: "en",
  //     },
  //   };
}
export default ReactionPage;
