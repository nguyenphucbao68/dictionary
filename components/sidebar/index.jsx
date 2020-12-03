import React, { Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { MENUITEMS } from "./menu";
import { ArrowRight, ArrowLeft, Grid } from "react-feather";
// import { Link } from 'react-router-dom'
import Link from "next/link";
import { translate } from "react-switch-lang";
import configDB from "../../data/customizer/config";

const Sidebar = (props) => {
  const [mainmenu, setMainMenu] = useState(MENUITEMS);
  const [margin, setMargin] = useState(0);
  const [width, setWidth] = useState(0);
  const [sidebartoogle, setSidebartoogle] = useState(true);
  const wrapper =
    useSelector((content) => content.Customizer.sidebar_types.type) ||
    configDB.data.settings.sidebar.type;

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
    <Fragment>
      <header className="main-nav">
        <div className="logo-wrapper">
          <Link href={`${process.env.PUBLIC_URL}/dashboard/default`}>
            sssss
            <img
              className="img-fluid for-light"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABSCAMAAAAme2uJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Njg3QkZBQkMxMUYwMTFFQjlEMDRGNUM0ODNFNkRGQTMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Njg3QkZBQkQxMUYwMTFFQjlEMDRGNUM0ODNFNkRGQTMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2ODdCRkFCQTExRjAxMUVCOUQwNEY1QzQ4M0U2REZBMyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo2ODdCRkFCQjExRjAxMUVCOUQwNEY1QzQ4M0U2REZBMyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PspOsjMAAAMAUExURQhKg////8bl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"
              alt=""
            />
            {/* <img
              className="img-fluid for-dark"
              src={require("../../assets/images/logo/logo_dark.png")}
              alt=""
            /> */}
            <div className="back-btn" onClick={() => responsiveSidebar()}>
              <i className="fa fa-angle-left"></i>
            </div>
          </Link>
          <div
            className="toggle-sidebar"
            onClick={() => openCloseSidebar(sidebartoogle)}
          >
            <Grid className="status_toggle middle" id="sidebar-toggle" />
          </div>
        </div>
        <div className="logo-icon-wrapper">
          <Link href={`${process.env.PUBLIC_URL}/dashboard/default`}>
            <img
              className="img-fluid"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABSCAMAAAAme2uJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Njg3QkZBQkMxMUYwMTFFQjlEMDRGNUM0ODNFNkRGQTMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Njg3QkZBQkQxMUYwMTFFQjlEMDRGNUM0ODNFNkRGQTMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2ODdCRkFCQTExRjAxMUVCOUQwNEY1QzQ4M0U2REZBMyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo2ODdCRkFCQjExRjAxMUVCOUQwNEY1QzQ4M0U2REZBMyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PspOsjMAAAMAUExURQhKg////8bl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"
              alt=""
            />
          </Link>
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
                  <Fragment key={i}>
                    <li className="sidebar-title">
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
                            to={menuItem.path}
                            className={`nav-link menu-title link-nav  ${
                              menuItem.active ? "active" : ""
                            }`}
                            href="#javascript"
                            onClick={() => toggletNavActive(menuItem)}
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
                                      to={childrenItem.path}
                                      className={`${
                                        childrenItem.active ? "active" : ""
                                      }`}
                                      onClick={() =>
                                        toggletNavActive(childrenItem)
                                      }
                                    >
                                      {props.t(childrenItem.title)}
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
                                                to={childrenSubItem.path}
                                                className={`${
                                                  childrenSubItem.active
                                                    ? "active"
                                                    : ""
                                                }`}
                                                onClick={() =>
                                                  toggletNavActive(
                                                    childrenSubItem,
                                                  )
                                                }
                                              >
                                                {props.t(childrenSubItem.title)}
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
                  </Fragment>
                ))}
              </ul>
            </div>
            <div className="right-arrow" onClick={scrollToRight}>
              <ArrowRight />
            </div>
          </div>
        </nav>
      </header>
    </Fragment>
  );
};

export default translate(Sidebar);
