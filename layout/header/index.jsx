import React, { useState } from "react";
import { Row } from "reactstrap";
import { MENUITEMS } from "../sidebar/menu";
import LeftHeader from "./leftbar";
import RightHeader from "./rightbar";
// import {Link} from 'react-router-dom'
const Header = () => {
  // eslint-disable-next-line
  const [mainmenu, setMainMenu] = useState(MENUITEMS);
  // eslint-disable-next-line
  const [searchResult, setSearchResult] = useState(false);
  // eslint-disable-next-line
  const [searchResultEmpty, setSearchResultEmpty] = useState(false);

  return (
    <>
      <div className="page-main-header close_icon">
        <Row className="main-header-right m-0">
          <LeftHeader />
          <RightHeader />
        </Row>
      </div>
    </>
  );
};

export default Header;
