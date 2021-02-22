import React, { Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { MENUITEMS } from "./menu";
import { ArrowRight, ArrowLeft, Grid } from "react-feather";
import Link from "next/link";
import { translate } from "react-switch-lang";
import configDB from "../../data/customizer/config";

const Sidebar = (props) => {
  const [mainmenu, setMainMenu] = useState(MENUITEMS);
  const [margin, setMargin] = useState(0);
  const [width, setWidth] = useState(0);
  const [sidebartoogle, setSidebartoogle] = useState(true);
  const wrapper = configDB.data.settings.sidebar.type;
  useEffect(() => {
    if (window.innerWidth <= 991) {
      document.querySelector(".page-main-header").className =
        "page-main-header close_icon";
      document.querySelector(".main-nav").className = "main-nav close_icon ";
    }
  });
  useEffect(() => {
    document.querySelector(".left-arrow").classList.add("d-none");

    window.addEventListener("resize", handleResize);
    handleResize();

    const currentUrl = window.location.pathname;
    mainmenu.map((items) => {
      items.Items.filter((Items) => {
        if (Items.path === currentUrl) setNavActive(Items);
        if (!Items.children) return false;
        Items.children.filter((subItems) => {
          if (subItems.path === currentUrl) setNavActive(subItems);
          if (!subItems.children) return false;
          subItems.children.filter((subSubItems) => {
            if (subSubItems.path === currentUrl) {
              setNavActive(subSubItems);
              return true;
            } else {
              return false;
            }
          });
          return subItems;
        });
        return Items;
      });
      return items;
    });

    return () => {
      window.removeEventListener("resize", handleResize);
    };

    // eslint-disable-next-line
  }, []);

  const handleResize = () => {
    setWidth(window.innerWidth - 500);
  };

  const setNavActive = (item) => {
    MENUITEMS.map((menuItems) => {
      menuItems.Items.filter((Items) => {
        if (Items !== item) Items.active = false;
        if (Items.children && Items.children.includes(item))
          Items.active = true;
        if (Items.children) {
          Items.children.filter((submenuItems) => {
            if (submenuItems.children && submenuItems.children.includes(item)) {
              Items.active = true;
              submenuItems.active = true;
              return true;
            } else {
              return false;
            }
          });
        }
        return Items;
      });
      return menuItems;
    });
    item.active = !item.active;
    setMainMenu({ mainmenu: MENUITEMS });
  };

  const toggletNavActive = (item) => {
    if (window.innerWidth <= 991) {
      document.querySelector(".page-main-header").className =
        "page-main-header close_icon";
      document.querySelector(".main-nav").className = "main-nav close_icon ";
      document
        .querySelector(".mega-menu-container")
        .classList.remove("d-block");
      if (item.type === "sub") {
        document.querySelector(".page-main-header").className =
          "page-main-header ";
        document.querySelector(".main-nav").className = "main-nav ";
      }
    }
    if (!item.active) {
      MENUITEMS.map((a) => {
        a.Items.filter((Items) => {
          if (a.Items.includes(item)) Items.active = false;
          if (!Items.children) return false;
          Items.children.forEach((b) => {
            if (Items.children.includes(item)) {
              b.active = false;
            }
            if (!b.children) return false;
            b.children.forEach((c) => {
              if (b.children.includes(item)) {
                c.active = false;
              }
            });
          });
          return Items;
        });
        return a;
      });
    }
    item.active = !item.active;
    setMainMenu({ mainmenu: MENUITEMS });
  };

  const scrollToRight = () => {
    if (margin <= -2598 || margin <= -2034) {
      if (width === 492) {
        setMargin(-3570);
      } else {
        setMargin(-3464);
      }
      document.querySelector(".right-arrow").classList.add("d-none");
      document.querySelector(".left-arrow").classList.remove("d-none");
    } else {
      setMargin((margin) => (margin += -width));
      document.querySelector(".left-arrow").classList.remove("d-none");
    }
  };

  const scrollToLeft = () => {
    if (margin >= -width) {
      setMargin(0);
      document.querySelector(".left-arrow").classList.add("d-none");
      document.querySelector(".right-arrow").classList.remove("d-none");
    } else {
      setMargin((margin) => (margin += width));
      document.querySelector(".right-arrow").classList.remove("d-none");
    }
  };

  const openCloseSidebar = (toggle) => {
    if (toggle) {
      setSidebartoogle(!toggle);
      document.querySelector(".page-main-header").className =
        "page-main-header close_icon";
      document.querySelector(".main-nav").className = "main-nav close_icon ";
    } else {
      setSidebartoogle(!toggle);
      document.querySelector(".page-main-header").className =
        "page-main-header";
      document.querySelector(".main-nav").className = "main-nav ";
    }
  };

  const responsiveSidebar = () => {
    document.querySelector(".page-main-header").className =
      "page-main-header close_icon";
    document.querySelector(".main-nav").className = "main-nav close_icon";
  };

  return (
    <>
      <header className="main-nav">
        <div className="logo-wrapper">
          <a href="/">
            <img
              className="img-fluid for-light"
              src={require("../../assets/images/logo/logo.png")}
              alt=""
            />
            <img
              className="img-fluid for-dark"
              src={require("../../assets/images/logo/logo_dark.png")}
              alt=""
            />
            <div className="back-btn" onClick={() => responsiveSidebar()}>
              <i className="fa fa-angle-left"></i>
            </div>
          </a>
          <div
            className="toggle-sidebar"
            onClick={() => openCloseSidebar(sidebartoogle)}
          >
            <Grid className="status_toggle middle" id="sidebar-toggle" />
          </div>
        </div>
        <div className="logo-icon-wrapper">
          <a href="/">
            <img
              className="img-fluid"
              src={require("../../assets/images/logo/logo-icon.png")}
              alt=""
            />
          </a>
        </div>
        <nav>
          <div className="main-navbar">
            <div className="left-arrow" onClick={scrollToLeft}>
              <ArrowLeft />
            </div>

            <div
              id="mainnav"
              style={
                wrapper === "horizontal-wrapper"
                  ? { marginLeft: margin + "px" }
                  : { margin: "0px" }
              }
            >
              <ul className="nav-menu custom-scrollbar">
                <li className="back-btn">
                  <div className="mobile-back text-right">
                    <span>Back</span>
                    <i
                      className="fa fa-angle-right pl-2"
                      aria-hidden="true"
                    ></i>
                  </div>
                </li>
                {MENUITEMS.map((Item, i) => (
                  <>
                    <li className="sidebar-title" key={i}>
                      <div>
                        <h6 className="lan-1">{props.t(Item.menutitle)}</h6>
                        <p className="lan-2">{props.t(Item.menucontent)}</p>
                      </div>
                    </li>
                    {Item.Items.map((menuItem, i) => (
                      <li className="dropdown" key={i}>
                        {menuItem.type === "sub" ? (
                          <a
                            className={`nav-link menu-title  ${
                              menuItem.active ? "active" : ""
                            }`}
                            href="#javascript"
                            onClick={() => setNavActive(menuItem)}
                          >
                            <menuItem.icon />
                            <span>{props.t(menuItem.title)}</span>
                            {menuItem.badge ? (
                              <label className={menuItem.badge}>
                                {menuItem.badgetxt}
                              </label>
                            ) : (
                              ""
                            )}
                            <div className="according-menu">
                              {menuItem.active ? (
                                <i className="fa fa-angle-down"></i>
                              ) : (
                                <i className="fa fa-angle-right"></i>
                              )}
                            </div>
                          </a>
                        ) : (
                          ""
                        )}

                        {menuItem.type === "link" ? (
                          <Link
                            href={menuItem.path}
                            onClick={() => toggletNavActive(menuItem)}
                          >
                            <a
                              className={`nav-link menu-title link-nav  ${
                                menuItem.active ? "active" : ""
                              }`}
                            >
                              <menuItem.icon />
                              <span>{props.t(menuItem.title)}</span>
                              {menuItem.badge ? (
                                <label className={menuItem.badge}>
                                  {menuItem.badgetxt}
                                </label>
                              ) : (
                                ""
                              )}
                            </a>
                          </Link>
                        ) : (
                          ""
                        )}

                        {menuItem.children ? (
                          <ul
                            className="nav-submenu menu-content"
                            style={
                              menuItem.active
                                ? {
                                    opacity: 1,
                                    transition: "opacity 500ms ease-in",
                                  }
                                : { display: "none" }
                            }
                          >
                            {menuItem.children.map((childrenItem, index) => {
                              return (
                                <li key={index}>
                                  {childrenItem.type === "sub" ? (
                                    <a
                                      className={`${
                                        childrenItem.active ? "active" : ""
                                      }`}
                                      href="#javascript"
                                      onClick={() =>
                                        toggletNavActive(childrenItem)
                                      }
                                    >
                                      {props.t(childrenItem.title)}
                                      <span className="sub-arrow">
                                        <i className="fa fa-chevron-right"></i>
                                      </span>
                                      <div className="according-menu">
                                        {childrenItem.active ? (
                                          <i className="fa fa-angle-down"></i>
                                        ) : (
                                          <i className="fa fa-angle-right"></i>
                                        )}
                                      </div>
                                    </a>
                                  ) : (
                                    ""
                                  )}

                                  {childrenItem.type === "link" ? (
                                    <Link
                                      href={childrenItem.path}
                                      onClick={() =>
                                        toggletNavActive(childrenItem)
                                      }
                                    >
                                      <a
                                        className={`${
                                          childrenItem.active ? "active" : ""
                                        }`}
                                      >
                                        {props.t(childrenItem.title)}
                                      </a>
                                    </Link>
                                  ) : (
                                    ""
                                  )}

                                  {childrenItem.children ? (
                                    <ul
                                      className="nav-sub-childmenu submenu-content"
                                      style={
                                        childrenItem.active
                                          ? { display: "block" }
                                          : { display: "none" }
                                      }
                                    >
                                      {childrenItem.children.map(
                                        (childrenSubItem, key) => (
                                          <li key={key}>
                                            {childrenSubItem.type === "link" ? (
                                              <Link
                                                href={childrenSubItem.path}
                                                onClick={() =>
                                                  toggletNavActive(
                                                    childrenSubItem,
                                                  )
                                                }
                                              >
                                                <a
                                                  className={`${
                                                    childrenSubItem.active
                                                      ? "active"
                                                      : ""
                                                  }`}
                                                >
                                                  {props.t(
                                                    childrenSubItem.title,
                                                  )}
                                                </a>
                                              </Link>
                                            ) : (
                                              ""
                                            )}
                                          </li>
                                        ),
                                      )}
                                    </ul>
                                  ) : (
                                    ""
                                  )}
                                </li>
                              );
                            })}
                          </ul>
                        ) : (
                          ""
                        )}
                      </li>
                    ))}
                  </>
                ))}
              </ul>
            </div>
            <div className="right-arrow" onClick={scrollToRight}>
              <ArrowRight />
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default translate(Sidebar);
