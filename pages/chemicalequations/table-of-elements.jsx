import ToEs from "../../components/dashboard/chemistry/toes";
import App from "../../components/app";
import React from "react";
React.useLayoutEffect = React.useEffect;
const TableOfElementsPage = () => {
  return (
    <>
      <App>
        <ToEs />
      </App>
    </>
  );
};
export default TableOfElementsPage;
