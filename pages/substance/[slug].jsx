import Substance from "../../components/dashboard/chemistry/substance";
import App from "../../components/app";
import React from "react";
import { getSubstance } from "../../lib/dictionary";
import {
  getSubstanceCollection,
  setSubstanceCollection,
  getSubstanceDb,
} from "../../lib/api";

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
  const getDocSubstance = await getSubstanceCollection(params.slug);

  if (getDocSubstance.data?.nameLang) {
    return {
      props: {
        substance: getDocSubstance,
        name: params.slug,
        language: "en",
      },
    };
  }
  var substance = await getSubstance(params.slug);
  substance.data.other = await getSubstanceDb(params.slug);
  setSubstanceCollection(params.slug, substance);
  return {
    props: {
      substance: substance,
      name: params.slug,
      language: "en",
    },
  };
}
export default SubstancePage;
