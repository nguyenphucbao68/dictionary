import Reaction from "../../../components/dashboard/chemistry/reaction";
import App from "../../../components/app";
import React from "react";
import {
  getChemicalReaction,
  getSearchResults,
  setReactionCollection,
  getReactionCollection,
} from "../../../lib/api";
React.useLayoutEffect = React.useEffect;
const ReactionPage = ({
  data,
  relatedReactionsByReactant,
  relatedReactionsByProduct,
  p,
  r,
}) => {
  return (
    <>
      <App>
        <Reaction
          data={data}
          relatedReactionsByReactant={relatedReactionsByReactant}
          relatedReactionsByProduct={relatedReactionsByProduct}
          products={p}
          reactants={r}
        />
      </App>
    </>
  );
};
export async function getServerSideProps({ params }) {
  const { p, r } = params;
  var getDocReaction = await getReactionCollection(`${p}+${r}`);
  if (getDocReaction.data) {
    getDocReaction = {
      p,
      r,
      ...getDocReaction,
    };
    return {
      props: getDocReaction,
    };
  }
  const data = await getChemicalReaction(r, p);
  const relatedReactionsByReactant = await getSearchResults("r", r);
  const relatedReactionsByProduct = await getSearchResults("p", p);
  setReactionCollection(`${p}+${r}`, {
    data,
    relatedReactionsByReactant,
    relatedReactionsByProduct,
  });
  return {
    props: {
      data,
      relatedReactionsByReactant,
      relatedReactionsByProduct,
      p,
      r,
    },
  };
}
export default ReactionPage;
