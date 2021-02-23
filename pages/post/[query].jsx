import PostResult from "../../components/dashboard/post";
import App from "../../components/app";
import React from "react";
import { getPostResults } from "../../lib/api";

React.useLayoutEffect = React.useEffect;
const PostPage = ({ result, query }) => {
  return (
    <>
      <App>
        <PostResult result={result} query={query} />
      </App>
    </>
  );
};

export async function getServerSideProps({ params }) {
  const { query } = params;
  const getResults = await getPostResults(encodeURIComponent(query), 0);
  return {
    props: {
      result: getResults,
      query: query,
    },
  };
}
export default PostPage;
