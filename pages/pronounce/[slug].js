import Pronounce from "../../components/dashboard/pronounce";
import App from "../../components/app";
import React from "react";
import {
  searchWordOnYoutube,
  getSubtitleFromVideo,
} from "../../lib/dictionary";
import { storeCollection, getDocCollection } from "../../lib/api";

React.useLayoutEffect = React.useEffect;
const Home = ({ pronounce, subTitle, word, defaultVideo }) => {
  return (
    <>
      <App>
        <Pronounce
          pronounce={pronounce}
          subTitle={subTitle}
          word={word}
          defaultVideo={defaultVideo}
        />
      </App>
    </>
  );
};
export async function getServerSideProps({ params }) {
  const getDocWord = await getDocCollection(params.slug, "en_en", "pronounce");

  if (getDocWord.data?.length) {
    var subTitleDoc = await getSubtitleFromVideo(getDocWord?.data[0]?.code);

    for (var i = 0; i < getDocWord?.data.length; i++) {
      if (subTitleDoc.result) break;
      subTitleDoc = await getSubtitleFromVideo(getDocWord?.data[i]?.code);
    }
    if (i == getDocWord?.data.length) {
      return {
        props: {
          pronounce: getDocWord.data,
          subTitle: [],
          word: params?.slug,
          defaultVideo: i,
        },
      };
    }
    return {
      props: {
        pronounce: getDocWord.data,
        subTitle: subTitleDoc?.result?.transcript?.text,
        word: params?.slug,
        defaultVideo: i,
      },
    };
  }
  const youList = await searchWordOnYoutube(params.slug);
  var subTitle = await getSubtitleFromVideo(youList?.data[0]?.code);
  for (var i = 0; i < youList?.data.length; i++) {
    if (subTitle.result) break;
    subTitle = await getSubtitleFromVideo(youList?.data[i]?.code);
  }
  if (i == youList?.data.length) {
    return {
      props: {
        pronounce: youList?.data,
        subTitle: [],
        word: params?.slug,
        defaultVideo: i,
      },
    };
  }
  storeCollection(params.slug, "en_en", youList, "pronounce");
  return {
    props: {
      pronounce: youList?.data,
      subTitle: subTitle?.result?.transcript?.text,
      word: params?.slug,
      defaultVideo: i,
    },
  };
}
export default Home;
