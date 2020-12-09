import HomeSearch from "../components/dashboard/dict/home";
import App from "../components/app";
import React from "react";

React.useLayoutEffect = React.useEffect;
const Home = () => {
  return (
    <>
      <App>
        <HomeSearch />
      </App>
    </>
  );
};
export default Home;
