import TermsOfUsePage from "../components/dashboard/page/terms";
import App from "../components/app";
import React from "react";

React.useLayoutEffect = React.useEffect;
const TermsOfUse = () => {
  return (
    <>
      <App>
        <TermsOfUsePage />
      </App>
    </>
  );
};
export default TermsOfUse;
