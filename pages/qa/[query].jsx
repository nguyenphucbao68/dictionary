import QAResult from "../../components/dashboard/qa";
import App from "../../components/app";
import React from "react";
import { getQAResults } from "../../lib/api";

React.useLayoutEffect = React.useEffect;
const QAPage = ({ result, query }) => {
  return (
    <>
      <App>
        <QAResult result={result} query={query} />
      </App>
    </>
  );
};

export async function getServerSideProps({ params }) {
  const { query } = params;
  const getResults = await getQAResults(encodeURIComponent(query), 0);
  return {
    props: {
      result: getResults,
      query: query,
    },
  };
}
export default QAPage;
