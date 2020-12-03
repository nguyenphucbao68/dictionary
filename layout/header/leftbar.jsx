import React, { useState, useLayoutEffect, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { Grid } from "react-feather";
// import { Link } from 'react-router-dom'
import Link from "next/link";
const Leftbar = (props) => {
  const [bonusui, setBonusUI] = useState(false);
  const [sidebartoogle, setSidebartoogle] = useState(true);
  const [megaboxtoggle1, setMegaboxtoggle1] = useState(true);
  const [megaboxtoggle2, setMegaboxtoggle2] = useState(true);
  const [megaboxtoggle3, setMegaboxtoggle3] = useState(true);
  const [megaboxtoggle4, setMegaboxtoggle4] = useState(true);
  const width = useWindowSize();

  function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize(window.innerWidth);
      }
      window.addEventListener("resize", updateSize);
      updateSize();
      return () => window.removeEventListener("resize", updateSize);
    }, []);
    return size;
  }

  useEffect(() => {
    if (width <= 767) {
      setMegaboxtoggle1(true);
      setMegaboxtoggle2(true);
      setMegaboxtoggle3(true);
      setMegaboxtoggle4(true);
    } else {
      setMegaboxtoggle1(false);
      setMegaboxtoggle2(false);
      setMegaboxtoggle3(false);
      setMegaboxtoggle4(false);
    }
  }, [width]);

  const responsiveMegaMenuclose = () => {
    setBonusUI(false);
    document.querySelector(".menu-content").classList.remove("d-block");
  };

  const ToggleBonusUI = (value) => {
    if (value) {
      setBonusUI(!value);
      document.querySelector(".menu-content").classList.remove("d-block");
    } else {
      setBonusUI(!value);
      if (width <= 991) {
        document.querySelector(".page-main-header").className =
          "page-main-header close_icon";
        document.querySelector(".main-nav").className =
          "main-nav close_icon " +
          configDB.data.settings.sidebar_background_setting;
        document.querySelector(".menu-content").classList.add("d-block");
      } else {
        document.querySelector(".menu-content").classList.add("d-block");
      }
    }
  };

  const openCloseSidebar = (toggle) => {
    if (toggle) {
      setSidebartoogle(!toggle);
      document.querySelector(".page-main-header").className =
        "page-main-header close_icon";
      document.querySelector(".main-nav").className =
        "main-nav close_icon " +
        configDB.data.settings.sidebar_background_setting;
      document.querySelector(".menu-content").classList.remove("d-block");
    } else {
      setSidebartoogle(!toggle);
      document.querySelector(".page-main-header").className =
        "page-main-header";
      document.querySelector(".main-nav").className =
        "main-nav " + configDB.data.settings.sidebar_background_setting;
    }
  };

  const responsiveMegaBox1 = (megabox) => {
    if (megabox) {
      setMegaboxtoggle1(!megabox);
    } else {
      setMegaboxtoggle1(!megabox);
    }
  };
  const responsiveMegaBox2 = (megabox) => {
    if (megabox) {
      setMegaboxtoggle2(!megabox);
    } else {
      setMegaboxtoggle2(!megabox);
    }
  };
  const responsiveMegaBox3 = (megabox) => {
    if (megabox) {
      setMegaboxtoggle3(!megabox);
    } else {
      setMegaboxtoggle3(!megabox);
    }
  };
  const responsiveMegaBox4 = (megabox) => {
    if (megabox) {
      setMegaboxtoggle4(!megabox);
    } else {
      setMegaboxtoggle4(!megabox);
    }
  };

  return (
    <>
      <div className="main-header-left">
        <div className="logo-wrapper">
          <Link href="/dashboard/default">
            <a>
              <img
                className="img-fluid for-light"
                src={require("../../assets/images/logo/logo.png")}
                alt="Athoni Logo"
              />
              <img
                className="img-fluid for-dark"
                src={require("../../assets/images/logo/logo_dark.png")}
                alt="Athoni Logo"
              />
            </a>
          </Link>
        </div>
        <div
          className="toggle-sidebar"
          onClick={() => openCloseSidebar(sidebartoogle)}
        >
          <Grid className="status_toggle middle" id="sidebar-toggle" />
        </div>
      </div>
      <Col className="left-menu-header horizontal-wrapper pl-0"></Col>
    </>
  );
};

export default Leftbar;
