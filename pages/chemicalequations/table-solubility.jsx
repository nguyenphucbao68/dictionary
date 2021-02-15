import SolubilityTable from "../../components/dashboard/chemistry/solubility";
import App from "../../components/app";
import React from "react";
React.useLayoutEffect = React.useEffect;
const SolubilityTablePage = () => {
  return (
    <>
      <App>
        <SolubilityTable />
      </App>
    </>
  );
};
export default SolubilityTablePage;
