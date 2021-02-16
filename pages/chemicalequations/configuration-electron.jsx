import ConfigurationElectron from "../../components/dashboard/chemistry/configelectron";
import App from "../../components/app";
import React from "react";
React.useLayoutEffect = React.useEffect;
const ConfigurationElectronPage = () => {
  return (
    <>
      <App>
        <ConfigurationElectron />
      </App>
    </>
  );
};
export default ConfigurationElectronPage;
