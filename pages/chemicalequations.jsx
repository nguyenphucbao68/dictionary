import CEHome from "../components/dashboard/chemistry/home";
import App from "../components/app";
import React from "react";
import { getChemicalEquationsByCat } from "../lib/api";

React.useLayoutEffect = React.useEffect;
const Home = ({ data }) => {
  return (
    <>
      <App>
        <CEHome data={data} />
      </App>
    </>
  );
};

export async function getServerSideProps({ params }) {
  var decomposition = await getChemicalEquationsByCat(
    "Decomposition reaction",
    8,
  );
  var doublereplacement = await getChemicalEquationsByCat(
    "Double-replacement reaction",
    8,
  );
  var oxidition = await getChemicalEquationsByCat(
    "Oxidation-reduction reaction",
    8,
  );
  var singlereplacement = await getChemicalEquationsByCat(
    "Single-replacement reaction",
    8,
  );
  var combination = await getChemicalEquationsByCat("Combination reaction", 8);
  return {
    props: {
      data: {
        decomposition,
        doublereplacement,
        singlereplacement,
        oxidition,
        combination,
      },
    },
  };
}

export default Home;
