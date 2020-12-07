import Pronounce from "../../components/dashboard/Pronounce";
import App from "../../components/app";
import React from "react";
import {
  searchWordOnYoutube,
  getSubtitleFromVideo,
} from "../../lib/dictionary";
import { storeCollection, getDocCollection } from "../../lib/api";

React.useLayoutEffect = React.useEffect;
const Home = ({ pronounce, subTitle, word }) => {
  return (
    <>
      <App>
        <Pronounce pronounce={pronounce} subTitle={subTitle} word={word} />
      </App>
    </>
  );
};
export async function getServerSideProps({ params }) {
  const getDocWord = await getDocCollection(params.slug, "en_en", "pronounce");

  if (getDocWord.data?.length) {
    const subTitleDoc = await getSubtitleFromVideo(getDocWord?.data[0]?.code);

    return {
      props: {
        pronounce: getDocWord.data,
        subTitle: subTitleDoc?.result.transcript.text,
        word: params?.slug,
      },
    };
  }
  const youList = await searchWordOnYoutube(params.slug);
  const subTitle = await getSubtitleFromVideo(youList?.data[0]?.code);

  storeCollection(params.slug, "en_en", youList, "pronounce");
  return {
    props: {
      pronounce: youList?.data,
      subTitle: subTitle?.result.transcript.text,
      word: params?.slug,
    },
  };
}
export default Home;
