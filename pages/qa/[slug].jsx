import QAResult from "../../components/dashboard/qa";
import App from "../../components/app";
import React from "react";

React.useLayoutEffect = React.useEffect;
const QAPage = () => {
  return (
    <>
      <App>
        <QAResult />
      </App>
    </>
  );
};
export async function getServerSideProps() {
  return {
    props: {},
  };
}
export default QAPage;
