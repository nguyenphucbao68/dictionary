import React, { useState, useEffect, useLayoutEffect } from "react";
import { Container, Row } from "reactstrap";
import {
  Nav,
  NavLink,
  TabContent,
  TabPane,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import {
  ADD_LAYOUT,
  ADD_SIDEBAR_TYPES,
  ADD_SIDEBAR_SETTINGS,
  ADD_COLOR,
  ADD_COSTOMIZER,
  ADD_MIX_BACKGROUND_LAYOUT,
  ROUTER_ANIMATION,
} from "../../redux/actionTypes";

const Themecustomizer = (props) => {
  const [rightSidebar, setRightSidebar] = useState(true);
  // eslint-disable-next-line
  const [activeTab1, setActiveTab1] = useState("1");
  const primary_color = localStorage.getItem("primary_color");
  const secondary_color = localStorage.getItem("secondary_color");
  const layout_version = localStorage.getItem("layout_version");
  const color = localStorage.getItem("color");
  const layout_animation = localStorage.getItem("animation");
  const [modal, setModal] = useState();
  const configDB = useSelector((content) => content.Customizer.customizer);
  const dispatch = useDispatch();
  const [layout_type, setLayout_type] = useState(configDB.settings.layout_type);
  const [sidebar_type, setSidebar_type] = useState(
    configDB.settings.sidebar.type,
  );
  const body_sidebar_type = configDB.settings.sidebar.body_type;
  const sidebar_setting = configDB.settings.sidebar_setting;
  const mix_background_layout = configDB.color.mix_background_layout;
  const config_primary = configDB.color.primary_color;
  const config_secondary = configDB.color.secondary_color;
  const config_color = configDB.color.color;
  const config_layout_version = localStorage.getItem("layout_version");
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
    dispatch({ type: ADD_COSTOMIZER });

    dispatch({
      type: ADD_COLOR,
      payload: {
        color,
        primary_color,
        secondary_color,
        layout_version,
      },
    });

    dispatch({ type: ROUTER_ANIMATION, payload: layout_animation });

    if (
      localStorage.getItem("primary_color") == null ||
      localStorage.getItem("secondary_color") == null ||
      localStorage.getItem("color") == null ||
      localStorage.getItem("layout_version") == null
    ) {
      document.documentElement.className = config_color;
      localStorage.setItem("primary_color", config_primary);
      localStorage.setItem("secondary_color", config_secondary);
      localStorage.setItem("color", config_color);
      localStorage.setItem("layout_version", config_layout_version);
      dispatch({
        type: ADD_COLOR,
        payload: {
          color: config_color,
          primary_color: config_primary,
          secondary_color: config_secondary,
          layout_version: config_layout_version,
        },
      });
    }

    //set layout_type
    document.body.setAttribute("main-theme-layout", layout_type);
    document.documentElement.dir = layout_type;

    //set sidebar_type
    if (width <= 991) {
      document.querySelector(".page-wrapper").className =
        "page-wrapper compact-wrapper";
      document.querySelector(".page-body-wrapper").className =
        "page-body-wrapper sidebar-icon";
      document.querySelector(".page-main-header").className =
        "page-main-header close_icon";
      document.querySelector(".main-nav").className = "main-nav close_icon";
    } else if (width <= 991 && sidebar_type === "horizontal-wrapper") {
      document.querySelector(".page-wrapper").className =
        "page-wrapper compact-wrapper";
      document.querySelector(".page-body-wrapper").className =
        "page-body-wrapper sidebar-icon";
      document.querySelector(".page-main-header").className =
        "page-main-header close_icon";
      document.querySelector(".main-nav").className = "main-nav close_icon";
    } else {
      document.querySelector(".page-wrapper").className =
        "page-wrapper " + sidebar_type;
      document.querySelector(".page-body-wrapper").className =
        "page-body-wrapper " + body_sidebar_type;
      document.querySelector(".page-main-header").className =
        "page-main-header close_icon";
    }

    //set sidebar setting
    document
      .querySelector(".main-nav")
      .setAttribute("sidebar-layout", sidebar_setting);

    // mix and background layout
    if (mix_background_layout === "light-only") {
      document.body.className = config_layout_version;
    } else {
      document.body.className = mix_background_layout;
    }

    // color
    document.documentElement.className = color;

    // eslint-disable-next-line
  }, [width]);

  const toggle = () => {
    setModal(!modal);
  };

  const openCustomizer = () => {
    if (rightSidebar) {
      setRightSidebar(!rightSidebar);
      document.querySelector(".customizer-contain").classList.add("open");
      document.querySelector(".customizer-links").classList.add("open");
    }
  };

  const closeCustomizer = () => {
    setRightSidebar(!rightSidebar);
    document.querySelector(".customizer-contain").classList.remove("open");
    document.querySelector(".customizer-links").classList.remove("open");
  };

  const handleLayout = (layout) => {
    setLayout_type(layout);
    document.querySelectorAll(".main-layout li").forEach((item) => {
      item.classList.remove("active");
    });
    document.body.setAttribute("main-theme-layout", layout);
    document.documentElement.dir = layout;

    if (sidebar_type === "horizontal-wrapper" && layout === "box-layout") {
      document.querySelector(".page-wrapper").className =
        "page-wrapper compact-wrapper";
      document.querySelector(".page-body-wrapper").className =
        "page-body-wrapper sidebar-icon";
    }

    if (
      width <= 991 &&
      sidebar_type === "horizontal-wrapper" &&
      layout === "box-layout"
    ) {
      document.querySelector(".page-wrapper").className =
        "page-wrapper compact-wrapper";
      document.querySelector(".page-body-wrapper").className =
        "page-body-wrapper sidebar-icon";
      document.querySelector(".page-main-header").className =
        "page-main-header ";
      document.querySelector(".main-nav").className = "main-nav ";
    }

    dispatch({ type: ADD_LAYOUT, payload: layout });
  };

  const handleSidebarType = (e, type, body_type) => {
    e.preventDefault();
    setSidebar_type(type);
    document.querySelectorAll(".sidebar-type li").forEach((item) => {
      item.classList.remove("active");
    });
    document.querySelector(".page-wrapper").className = "page-wrapper " + type;
    document.querySelector(".page-body-wrapper").className =
      "page-body-wrapper " + body_type;
    e.currentTarget.classList.add("active");

    if (layout_type === "box-layout" && type === "horizontal-wrapper") {
      document.querySelector(".page-wrapper").className =
        "page-wrapper compact-wrapper";
      document.querySelector(".page-body-wrapper").className =
        "page-body-wrapper sidebar-icon";
    }

    if (
      width <= 991 &&
      layout_type === "box-layout" &&
      type === "horizontal-wrapper"
    ) {
      document.querySelector(".page-wrapper").className =
        "page-wrapper compact-wrapper";
      document.querySelector(".page-body-wrapper").className =
        "page-body-wrapper sidebar-icon";
      document.querySelector(".page-main-header").className =
        "page-main-header ";
      document.querySelector(".main-nav").className = "main-nav ";
    }

    if (width <= 991 && type === "horizontal-wrapper") {
      document.querySelector(".page-wrapper").className =
        "page-wrapper compact-wrapper";
      document.querySelector(".page-body-wrapper").className =
        "page-body-wrapper sidebar-icon";
      document.querySelector(".page-main-header").className =
        "page-main-header close_icon";
      document.querySelector(".main-nav").className = "main-nav close_icon";
    }

    dispatch({ type: ADD_SIDEBAR_TYPES, payload: { type, body_type } });
  };

  const handleSidebarSetting = (e, sidebar_setting) => {
    e.preventDefault();
    document.querySelectorAll(".sidebar-setting li").forEach((item) => {
      item.classList.remove("active");
    });
    document
      .querySelector(".main-nav")
      .setAttribute("sidebar-layout", sidebar_setting);
    e.currentTarget.classList.add("active");
    dispatch({ type: ADD_SIDEBAR_SETTINGS, payload: sidebar_setting });
  };

  const handleCustomizerMix_Background = (e) => {
    e.preventDefault();

    document.querySelectorAll(".customizer-mix li").forEach((item) => {
      item.classList.remove("active");
    });
    document.body.className = e.currentTarget.getAttribute("data-attr");
    e.currentTarget.classList.add("active");

    dispatch({
      type: ADD_MIX_BACKGROUND_LAYOUT,
      payload: e.currentTarget.getAttribute("data-attr"),
    });
  };
  const colorChangeTheme = (value) => {
    if (value === "light-1") {
      localStorage.setItem("color", "color-1");
      localStorage.setItem("layout_version", "light");
      localStorage.setItem("primary_color", "#7366ff");
      localStorage.setItem("secondary_color", "#f73164");
    }
    if (value === "light-2") {
      localStorage.setItem("color", "color-2");
      localStorage.setItem("layout_version", "light");
      localStorage.setItem("primary_color", "#0288d1");
      localStorage.setItem("secondary_color", "#26c6da");
    }
    if (value === "light-3") {
      localStorage.setItem("color", "color-3");
      localStorage.setItem("layout_version", "light");
      localStorage.setItem("primary_color", "#d64dcf");
      localStorage.setItem("secondary_color", "#8e24aa");
    }
    if (value === "light-4") {
      localStorage.setItem("color", "color-4");
      localStorage.setItem("layout_version", "light");
      localStorage.setItem("primary_color", "#4c2fbf");
      localStorage.setItem("secondary_color", "#2e9de4");
    }
    if (value === "light-5") {
      localStorage.setItem("color", "color-5");
      localStorage.setItem("layout_version", "light");
      localStorage.setItem("primary_color", "#7c4dff");
      localStorage.setItem("secondary_color", "#7b1fa2");
    }
    if (value === "light-6") {
      localStorage.setItem("color", "color-6");
      localStorage.setItem("layout_version", "light");
      localStorage.setItem("primary_color", "#3949ab");
      localStorage.setItem("secondary_color", "#4fc3f7");
    }
    if (value === "dark-1") {
      localStorage.setItem("color", "color-1");
      localStorage.setItem("layout_version", "dark-only");
      localStorage.setItem("primary_color", "#7366ff");
      localStorage.setItem("secondary_color", "#f73164");
    }
    if (value === "dark-2") {
      localStorage.setItem("color", "color-2");
      localStorage.setItem("layout_version", "dark-only");
      localStorage.setItem("primary_color", "#0288d1");
      localStorage.setItem("secondary_color", "#26c6da");
    }
    if (value === "dark-3") {
      localStorage.setItem("color", "color-3");
      localStorage.setItem("layout_version", "dark-only");
      localStorage.setItem("primary_color", "#d64dcf");
      localStorage.setItem("secondary_color", "#8e24aa");
    }
    if (value === "dark-4") {
      localStorage.setItem("color", "color-4");
      localStorage.setItem("layout_version", "dark-only");
      localStorage.setItem("primary_color", "#4c2fbf");
      localStorage.setItem("secondary_color", "#2e9de4");
    }
    if (value === "dark-5") {
      localStorage.setItem("color", "color-5");
      localStorage.setItem("layout_version", "dark-only");
      localStorage.setItem("primary_color", "#7c4dff");
      localStorage.setItem("secondary_color", "#7b1fa2");
    }
    if (value === "dark-6") {
      localStorage.setItem("color", "color-6");
      localStorage.setItem("layout_version", "dark-only");
      localStorage.setItem("primary_color", "#3949ab");
      localStorage.setItem("secondary_color", "#4fc3f7");
    }
    window.location.reload();
  };

  const selectAnimation = (e) => {
    localStorage.setItem("animation", e.target.value);
    dispatch({ type: ROUTER_ANIMATION, payload: e.target.value });
    window.location.reload();
  };

  return (
    <>
      <div className="customizer-links">
        <Nav className="flex-column nac-pills">
          <NavLink>
            <div className="settings" onClick={openCustomizer}>
              <i className="icon-settings"></i>
            </div>
          </NavLink>
        </Nav>
      </div>
      <div className="customizer-contain">
        <div className="tab-content" id="c-pills-tabContent">
          <div className="customizer-header">
            <i className="icon-close" onClick={closeCustomizer}></i>
            <h5>Customizer</h5>
            <p className="mb-0">Customize &amp; Preview Real Time</p>
            <Button
              color="primary"
              className="plus-popup mt-2"
              onClick={() => setModal(!modal)}
            >
              Configuration
            </Button>
            <Modal
              isOpen={modal}
              toggle={toggle}
              className="modal-body"
              centered={true}
            >
              <ModalHeader toggle={toggle}>Modal title</ModalHeader>
              <ModalBody>
                <Container fluid={true} className="bd-example-row">
                  <Row>
                    <p>
                      To replace our design with your desired theme. Please do
                      configuration as mention{" "}
                    </p>
                    <p>
                      {" "}
                      <b> Path : data > customizer > config.jsx </b>{" "}
                    </p>
                  </Row>
                  <pre>
                    <code>
                      <div> export class ConfigDB &#123;</div>
                      <div> static data = &#123;</div>
                      <div> settings&#58; &#123;</div>
                      <div>
                        {" "}
                        layout_type&#58; '{configDB.settings.layout_type}',
                      </div>

                      <div> sidebar&#58; &#123;</div>
                      <div>
                        {" "}
                        type&#58; '{configDB.settings.sidebar.type}
                        ',
                      </div>
                      <div>
                        {" "}
                        body_type&#58; '{
                          configDB.settings.sidebar.body_type
                        }'{" "}
                      </div>
                      <div> &#125;,</div>
                      <div>
                        {" "}
                        sidebar_setting&#58; '
                        {configDB.settings.sidebar_setting}',{" "}
                      </div>
                      <div> &#125;,</div>
                      <div> color&#58; &#123;</div>
                      <div>
                        {" "}
                        layout_version&#58; '{
                          configDB.color.layout_version
                        }',{" "}
                      </div>
                      <div> color&#58; '{configDB.color.color}', </div>
                      <div>
                        {" "}
                        primary_color&#58; '{
                          configDB.color.primary_color
                        }',{" "}
                      </div>
                      <div>
                        {" "}
                        secondary_color&#58; '{
                          configDB.color.secondary_color
                        }',{" "}
                      </div>
                      <div>
                        {" "}
                        mix_background_layout&#58; '
                        {configDB.color.mix_background_layout}',{" "}
                      </div>
                      <div> &#125;,</div>
                      <div> router_animation&#58; 'fadeIn'</div>
                      <div> &#125;</div>
                      <div> &#125;</div>
                    </code>
                  </pre>
                </Container>
              </ModalBody>
              <ModalFooter>
                <CopyToClipboard text={JSON.stringify(configDB)}>
                  <Button
                    color="primary"
                    className="notification"
                    onClick={() =>
                      toast.success("Code Copied to clipboard !", {
                        position: toast.POSITION.BOTTOM_RIGHT,
                      })
                    }
                  >
                    Copy text
                  </Button>
                </CopyToClipboard>
                <Button color="secondary" onClick={toggle}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </div>
          <div className="customizer-body custom-scrollbar">
            <TabContent activeTab={activeTab1}>
              <TabPane tabId="1">
                <h6>Layout Type</h6>
                <ul className="main-layout layout-grid">
                  <li
                    className={`${layout_type === "ltr" ? "active" : ""}`}
                    onClick={() => handleLayout("ltr")}
                  >
                    <div className="header bg-light">
                      <ul>
                        <li></li>
                        <li></li>
                        <li></li>
                      </ul>
                    </div>
                    <div className="body">
                      <ul>
                        <li className="bg-light sidebar"></li>
                        <li className="bg-light body">
                          <span className="badge badge-primary">LTR</span>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li
                    className={`${layout_type === "rtl" ? "active" : ""}`}
                    onClick={() => handleLayout("rtl")}
                  >
                    <div className="header bg-light">
                      <ul>
                        <li></li>
                        <li></li>
                        <li></li>
                      </ul>
                    </div>
                    <div className="body">
                      <ul>
                        <li className="bg-light sidebar"></li>
                        <li className="bg-light body">
                          <span className="badge badge-primary">RTL</span>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li
                    className={`${
                      layout_type === "box-layout" ? "active" : ""
                    }`}
                    onClick={() => handleLayout("box-layout")}
                  >
                    <div className="header bg-light">
                      <ul>
                        <li></li>
                        <li></li>
                        <li></li>
                      </ul>
                    </div>
                    <div className="body">
                      <ul>
                        <li className="bg-light sidebar"></li>
                        <li className="bg-light body">
                          <span className="badge badge-primary">Box</span>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
                <h6 className="">Sidebar Type</h6>
                <ul className="sidebar-type layout-grid">
                  <li
                    data-attr="normal-sidebar"
                    onClick={(e) =>
                      handleSidebarType(
                        e,
                        "horizontal-wrapper",
                        "horizontal-menu",
                      )
                    }
                  >
                    <div className="header bg-light">
                      <ul>
                        {" "}
                        <li></li>
                        <li></li>
                        <li></li>
                      </ul>
                    </div>
                    <div className="body">
                      <ul>
                        <li className="bg-dark sidebar"></li>
                        <li className="bg-light body"> </li>
                      </ul>
                    </div>
                  </li>
                  <li
                    className="active"
                    data-attr="compact-sidebar"
                    onClick={(e) =>
                      handleSidebarType(e, "compact-wrapper", "sidebar-icon")
                    }
                  >
                    <div className="header bg-light">
                      <ul>
                        {" "}
                        <li></li>
                        <li></li>
                        <li></li>
                      </ul>
                    </div>
                    <div className="body">
                      <ul>
                        <li className="bg-dark sidebar compact"></li>
                        <li className="bg-light body"> </li>
                      </ul>
                    </div>
                  </li>
                </ul>
                <h6 className="">Sidebar settings</h6>
                <ul className="sidebar-setting layout-grid">
                  <li
                    className="active"
                    data-attr="default-sidebar"
                    onClick={(e) => handleSidebarSetting(e, "default-sidebar")}
                  >
                    <div className="header bg-light">
                      <ul>
                        <li></li>
                        <li></li>
                        <li></li>
                      </ul>
                    </div>
                    <div className="body bg-light">
                      <span className="badge badge-primary">Default</span>
                    </div>
                  </li>
                  <li
                    data-attr="border-sidebar"
                    onClick={(e) => handleSidebarSetting(e, "border-sidebar")}
                  >
                    <div className="header bg-light">
                      <ul>
                        <li></li>
                        <li></li>
                        <li></li>
                      </ul>
                    </div>
                    <div className="body bg-light">
                      <span className="badge badge-primary">Border</span>
                    </div>
                  </li>
                  <li
                    data-attr="iconcolor-sidebar"
                    onClick={(e) =>
                      handleSidebarSetting(e, "iconcolor-sidebar")
                    }
                  >
                    <div className="header bg-light">
                      <ul>
                        <li></li>
                        <li></li>
                        <li></li>
                      </ul>
                    </div>
                    <div className="body bg-light">
                      <span className="badge badge-primary">icon Color</span>
                    </div>
                  </li>
                </ul>
                <h6>Router Animation {layout_animation}</h6>
                <Input
                  type="select"
                  defaultValue={layout_animation}
                  name="selectMulti"
                  onChange={selectAnimation}
                >
                  <option value="zoomfade">Zoom Fade</option>
                  <option value="slidefade">Silde Fade</option>
                  <option value="fadebottom">Fade Bottom</option>
                  <option value="fade">Fade</option>
                  <option value="zoomout">Zoom Out</option>
                  <option value="none">None</option>
                </Input>

                <h6>Light layout</h6>
                <ul className="layout-grid customizer-color">
                  <li
                    className="color-layout"
                    data-attr="color-1"
                    data-primary="#7366ff"
                    data-secondary="#f73164"
                    onClick={() => colorChangeTheme("light-1")}
                  >
                    <div></div>
                  </li>
                  <li
                    className="color-layout"
                    data-attr="color-2"
                    data-primary="#0288d1"
                    data-secondary="#26c6da"
                    onClick={() => colorChangeTheme("light-2")}
                  >
                    <div></div>
                  </li>
                  <li
                    className="color-layout"
                    data-attr="color-3"
                    data-primary="#d64dcf"
                    data-secondary="#8e24aa"
                    onClick={() => colorChangeTheme("light-3")}
                  >
                    <div></div>
                  </li>
                  <li
                    className="color-layout"
                    data-attr="color-4"
                    data-primary="#4c2fbf"
                    data-secondary="#2e9de4"
                    onClick={() => colorChangeTheme("light-4")}
                  >
                    <div></div>
                  </li>
                  <li
                    className="color-layout"
                    data-attr="color-5"
                    data-primary="#7c4dff"
                    data-secondary="#7b1fa2"
                    onClick={() => colorChangeTheme("light-5")}
                  >
                    <div></div>
                  </li>
                  <li
                    className="color-layout"
                    data-attr="color-6"
                    data-primary="#3949ab"
                    data-secondary="#4fc3f7"
                    onClick={() => colorChangeTheme("light-6")}
                  >
                    <div></div>
                  </li>
                </ul>
                <h6 className="">Dark Layout</h6>
                <ul className="layout-grid customizer-color dark">
                  <li
                    className="color-layout"
                    data-attr="color-1"
                    data-primary="#7366ff"
                    data-secondary="#f73164"
                    onClick={() => colorChangeTheme("dark-1")}
                  >
                    <div></div>
                  </li>
                  <li
                    className="color-layout"
                    data-attr="color-2"
                    data-primary="#0288d1"
                    data-secondary="#26c6da"
                    onClick={() => colorChangeTheme("dark-2")}
                  >
                    <div></div>
                  </li>
                  <li
                    className="color-layout"
                    data-attr="color-3"
                    data-primary="#d64dcf"
                    data-secondary="#8e24aa"
                    onClick={() => colorChangeTheme("dark-3")}
                  >
                    <div></div>
                  </li>
                  <li
                    className="color-layout"
                    data-attr="color-4"
                    data-primary="#4c2fbf"
                    data-secondary="#2e9de4"
                    onClick={() => colorChangeTheme("dark-4")}
                  >
                    <div></div>
                  </li>
                  <li
                    className="color-layout"
                    data-attr="color-5"
                    data-primary="#7c4dff"
                    data-secondary="#7b1fa2"
                    onClick={() => colorChangeTheme("dark-5")}
                  >
                    <div></div>
                  </li>
                  <li
                    className="color-layout"
                    data-attr="color-6"
                    data-primary="#3949ab"
                    data-secondary="#4fc3f7"
                    onClick={() => colorChangeTheme("dark-6")}
                  >
                    <div></div>
                  </li>
                </ul>
                <h6 className="">Mix Layout</h6>
                <ul className="layout-grid customizer-mix">
                  <li
                    className="color-layout active"
                    data-attr="light-only"
                    onClick={handleCustomizerMix_Background}
                  >
                    <div className="header bg-light">
                      <ul>
                        <li></li>
                        <li></li>
                        <li></li>
                      </ul>
                    </div>
                    <div className="body">
                      <ul>
                        <li className="bg-light sidebar"></li>
                        <li className="bg-light body"> </li>
                      </ul>
                    </div>
                  </li>
                  <li
                    className="color-layout"
                    data-attr="dark-sidebar"
                    onClick={handleCustomizerMix_Background}
                  >
                    <div className="header bg-light">
                      <ul>
                        <li></li>
                        <li></li>
                        <li></li>
                      </ul>
                    </div>
                    <div className="body">
                      <ul>
                        <li className="bg-dark sidebar"></li>
                        <li className="bg-light body"> </li>
                      </ul>
                    </div>
                  </li>
                  <li
                    className="color-layout"
                    data-attr="dark-only"
                    onClick={handleCustomizerMix_Background}
                  >
                    <div className="header bg-dark">
                      <ul>
                        <li></li>
                        <li></li>
                        <li></li>
                      </ul>
                    </div>
                    <div className="body">
                      <ul>
                        <li className="bg-dark sidebar"></li>
                        <li className="bg-dark body"> </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </TabPane>
            </TabContent>
          </div>
        </div>
      </div>
    </>
  );
};

export default Themecustomizer;
