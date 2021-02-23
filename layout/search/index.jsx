import settings from "../../config/settingsConfig";
import Link from "next/link";
import Router from "next/router";
import { useState, useRef, useEffect } from "react";
import useOutsideClick from "../../lib/event";
import { generateEquation } from "../../service/chemistry";
import { Modal, ModalHeader, Nav, NavItem, NavLink } from "reactstrap";
import { DelayInput } from "react-delay-input";

export const Search = (props) => {
  //const [currentSearch, setCurrentSearch] = useState("dictionary");
  const [currentSearch, setCurrentSearch] = useState(props.searchMode);
  const setActiveSearch = (e) => {
    const area = e.currentTarget.getAttribute("area");
    setCurrentSearch(area);
  };

  const ref = useRef();
  const [keyword, setKeyword] = useState(props.keyword);
  const [listWord, setListWord] = useState([]);
  const [listReactions, setListReactions] = useState({});
  const [qaSuggest, setQASuggest] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [curLanguage, setCurLanguage] = useState(settings.defaultLanguageData);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  let currentSearchLabel = "Search with Athoni";

  switch (currentSearch) {
    case "chemistry":
      currentSearchLabel = "Type a chemistry equation here";
      break;
    case "dictionary":
      currentSearchLabel = "Type a word here";
      break;
    case "hoidap":
      currentSearchLabel = "Nhập câu hỏi/bài tập của bạn vào đây";
      break;
    case "lecttr":
      currentSearchLabel = "Nhập lý thuyết/bài viết bạn muốn tìm vào đây";
      break;
  }

  const isStringEmpty = (string) => {
    if (string?.length === 0 || string?.replace(/\s/g, "").length === 0)
      return true;
    return false;
  };

  const cleanUpString = (string) => {
    return string.replace(/\s\s+/g, " ").trim();
  };

  const clickInputSearch = () => {
    //show suggestion
    if (isStringEmpty(keyword)) {
      return setShowResults(false);
    }
    return setShowResults(true);
  };

  const onSubmitClick = () => {
    switch (currentSearch) {
      case "chemistry":
        break;
      case "dictionary":
        break;
      case "hoidap":
        if (!isStringEmpty(keyword))
          Router.push("/qa/" + encodeURIComponent(cleanUpString(keyword)));
        return;
      case "lecttr":
        break;
    }
  };

  const onSubmitEnter = (e) => {
    const keyword = e.target?.value;
    if (!isStringEmpty(keyword)) {
      setKeyword(keyword);
    }
    if (e.key === "Enter") {
      switch (currentSearch) {
        case "chemistry":
          break;
        case "dictionary":
          break;
        case "hoidap":
          if (!isStringEmpty(keyword))
            Router.push("/qa/" + encodeURIComponent(cleanUpString(keyword)));
          return;
        case "lecttr":
          if (!isStringEmpty(keyword))
            Router.push("/post/" + encodeURIComponent(cleanUpString(keyword)));
          break;
      }
    }
  };

  useOutsideClick(ref, () => {
    setShowResults(false);
  });

  useEffect(() => {
    ref.current.focus();
  }, []);

  const onChangeKeyWord = async (e) => {
    const keyword = e.target?.value;
    if (!isStringEmpty(keyword)) {
      setKeyword(keyword);

      try {
        var restAPI = "";
        switch (currentSearch) {
          case "chemistry":
            restAPI = `/api/index.php/reaction/search/s/${keyword}`;
            break;
          case "dictionary":
            restAPI = `/api/index.php/search/${curLanguage}/${keyword}/8`;
            break;
          case "hoidap":
            restAPI = `/api/index.php/search/hoidap-suggest/${encodeURIComponent(
              cleanUpString(keyword),
            )}`;
            if (props.currentPage !== "home" && !isStringEmpty(keyword))
              Router.push("/qa/" + encodeURIComponent(cleanUpString(keyword)));
            break;
          case "lecttr":
            restAPI = `/api/index.php/search/hoidap-suggest/${encodeURIComponent(
              cleanUpString(keyword),
            )}}`;
            if (props.currentPage !== "home" && !isStringEmpty(keyword))
              Router.push(
                "/post/" + encodeURIComponent(cleanUpString(keyword)),
              );
            break;
        }
        const res = await fetch(restAPI);
        const obj = res.json();
        if (currentSearch == "chemistry") {
          setListReactions(await obj);
        } else if (currentSearch == "dictionary") {
          setListWord(await obj);
        } else if (currentSearch == "hoidap") {
          setQASuggest(await obj);
        }

        setShowResults(true);
      } catch (error) {
        console.log("err", error);
      }
    }
  };

  const LoadDropDownItem = (data, type) => {
    if (type == "l") {
      data = data.filter((item, i) => i < data.length / 2);
    } else if (type == "r") {
      data = data.filter((item, i) => i >= data.length / 2);
    }
    var listRecords = [];
    if (currentSearch == "chemistry") {
      data.map((item) => {
        listRecords.push(generateEquation(listReactions[item]));
      });
    } else if (currentSearch == "dictionary") {
      data.map((item) => {
        listRecords.push(
          <Link
            href={`/dict/${curLanguage}/${item?.word}`}
            key={item.word}
            onClick={() => setShowResults(false)}
          >
            <a className="dropdown-item">
              {item.word == keyword ? (
                <strong>{item?.word}</strong>
              ) : (
                item?.word
              )}
            </a>
          </Link>,
        );
      });
    }
    return listRecords;
  };

  const LoadSearchSuggestion = (data) => {
    var listRecords = [];
    if (currentSearch == "hoidap") {
      data &&
        data.map((item, i) => {
          listRecords.push(
            <Link
              href={`/qa/${encodeURIComponent(
                cleanUpString(item.fields?.title.toString()),
              )}`}
              key={i}
              onClick={() => setShowResults(false)}
            >
              <a className="dropdown-item">
                {item.fields?.title == keyword ? (
                  <strong>{item.fields?.title}</strong>
                ) : (
                  item.fields?.title
                )}
              </a>
            </Link>,
          );
        });
    } else if (currentSearch == "lecttr") {
      data &&
        data.map((item, i) => {
          listRecords.push(
            <Link
              href={`/qa/${encodeURIComponent(
                cleanUpString(item.fields?.title.toString()),
              )}`}
              key={i}
              onClick={() => setShowResults(false)}
            >
              <a className="dropdown-item">
                {item.fields?.title == keyword ? (
                  <strong>{item.fields?.title}</strong>
                ) : (
                  item.fields?.title
                )}
              </a>
            </Link>,
          );
        });
    }
    return listRecords;
  };

  return (
    <>
      <div className="dropdown">
        <div className="input-group input-group-lg search-input">
          <DelayInput
            type="text"
            minLength={2}
            maxLength={300}
            delayTimeout={300}
            className="form-control search-input"
            aria-label={currentSearchLabel}
            placeholder={currentSearchLabel}
            id="keyword-search"
            onChange={onChangeKeyWord}
            inputRef={ref}
            value={props.keyword}
            onClick={clickInputSearch}
            forceNotifyByEnter="true"
            onKeyDown={onSubmitEnter}
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            autoFocus
          />
          {/* <button
            type="button"
            className="btn bg-transparent d-block d-sm-none"
            style={{ marginLeft: "-59px", zIndex: 100 }}
            onClick={onSubmitClick}
          >
            <i
              className="icofont icofont-search"
              style={{ fontSize: "31px" }}
            ></i>
          </button> */}
          <div className="input-group-append">
            {currentSearch == "dictionary" ? (
              <a
                className="language-switcher d-none d-sm-block"
                onClick={toggle}
              >
                English - English
              </a>
            ) : (
              ""
            )}
            <button
              type="button"
              className="btn btn-primary search-input-btn"
              aria-label="Search..."
              onClick={onSubmitClick}
            >
              {/* <img
              src={require("../../public/assets/images/landing/search-icon.png")}
              alt="Search Icon"
              width={31}
            /> */}
              <i
                className="icofont icofont-search"
                style={{ fontSize: "20px" }}
              ></i>
            </button>
          </div>
          {currentSearch == "dictionary" ? (
            <a className="language-switcher d-block d-sm-none" onClick={toggle}>
              English - English
            </a>
          ) : (
            ""
          )}
        </div>
        <div
          className={`dropdown-menu row ${showResults && "show"}`}
          id="related-words"
          aria-labelledby="dropdownMenuButton"
        >
          {
            /* eslint-disable */
            (currentSearch == "dictionary" && listWord.length == 0) ||
            (currentSearch == "chemistry" &&
              Object.keys(listReactions).length == 0) ? (
              <>
                <div className="col-md-12">
                  <p>No results</p>
                </div>
              </>
            ) : (
              <>
                <div className="col-md-6" id="first-col">
                  {currentSearch == "chemistry"
                    ? LoadDropDownItem(Object.keys(listReactions), "l")
                    : currentSearch == "dictionary"
                    ? LoadDropDownItem(listWord, "l")
                    : ""}
                </div>
                <div className="col-md-6" id="second-col">
                  {currentSearch == "chemistry"
                    ? LoadDropDownItem(Object.keys(listReactions), "r")
                    : currentSearch == "dictionary"
                    ? LoadDropDownItem(listWord, "r")
                    : ""}
                </div>
              </>
            )
            /* eslint-enable */
          }
          {
            /* eslint-disable */
            (currentSearch == "hoidap" && qaSuggest?.hits?.hits?.length == 0) ||
            (currentSearch == "lecttr" &&
              qaSuggest?.hits?.hits?.length == 0) ? (
              <>
                {/* <div className="col-md-12">
                  <p>No results</p>
                </div> */}
              </>
            ) : (
              <>
                <div className="col-md-12" id="first-col">
                  {currentSearch == "hoidap"
                    ? LoadSearchSuggestion(qaSuggest?.hits?.hits)
                    : currentSearch == "lecttr"
                    ? LoadSearchSuggestion(qaSuggest?.hits?.hits)
                    : ""}
                </div>
              </>
            )
            /* eslint-enable */
          }
        </div>
      </div>
      <div className="mt-3">
        {props.currentPage == "home" ? (
          <Nav className={`nav-pills nav-link-home`}>
            <NavItem className={`nav-link-home`}>
              <NavLink
                href="#"
                onClick={setActiveSearch}
                area="chemistry"
                className={`${currentSearch === "chemistry" ? "active" : ""}`}
              >
                <img
                  className="mr-1"
                  style={{ height: "19px" }}
                  src={require("../../public/assets/images/landing/icon/chemistry.webp")}
                />
                {`Chemistry`}
              </NavLink>
            </NavItem>
            <NavItem className={`nav-link-home`}>
              <NavLink
                href="#"
                onClick={setActiveSearch}
                area="dictionary"
                className={`${currentSearch === "dictionary" ? "active" : ""}`}
              >
                <img
                  className="mr-1"
                  style={{ height: "19px" }}
                  src={require("../../public/assets/images/landing/dictionaries-app-icon.png")}
                />
                Dictionary
              </NavLink>
            </NavItem>
            <NavItem className={`nav-link-home`}>
              <NavLink
                href="#"
                onClick={setActiveSearch}
                area="hoidap"
                className={`${currentSearch === "hoidap" ? "active" : ""}`}
              >
                <img
                  className="mr-1"
                  style={{ height: "19px" }}
                  src={require("../../public/assets/images/icon/selfomy.png")}
                />
                {`Homework`}
              </NavLink>
            </NavItem>
            <NavItem className={`nav-link-home`}>
              <NavLink
                href="#"
                onClick={setActiveSearch}
                area="lecttr"
                className={`${currentSearch === "lecttr" ? "active" : ""}`}
              >
                <img
                  className="mr-1"
                  style={{ height: "19px" }}
                  src={require("../../public/assets/images/icon/lecttr.png")}
                />
                {`Lectures`}
              </NavLink>
            </NavItem>
          </Nav>
        ) : (
          <Nav className={`border-tab`} tabs>
            <NavItem className={``}>
              <NavLink
                href="#"
                onClick={setActiveSearch}
                area="chemistry"
                className={`${currentSearch === "chemistry" ? "active" : ""}`}
              >
                <img
                  className="mr-1"
                  style={{ height: "19px" }}
                  src={require("../../public/assets/images/landing/icon/chemistry.webp")}
                />
                {`Chemistry`}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href="#"
                onClick={setActiveSearch}
                area="dictionary"
                className={`${currentSearch === "dictionary" ? "active" : ""}`}
              >
                <img
                  className="mr-1"
                  style={{ height: "19px" }}
                  src={require("../../public/assets/images/landing/dictionaries-app-icon.png")}
                />
                Dictionary
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href="#"
                onClick={setActiveSearch}
                area="hoidap"
                className={`${currentSearch === "hoidap" ? "active" : ""}`}
              >
                <img
                  className="mr-1"
                  style={{ height: "19px" }}
                  src={require("../../public/assets/images/icon/selfomy.png")}
                />
                {`Homework`}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href="#"
                onClick={setActiveSearch}
                area="lecttr"
                className={`${currentSearch === "lecttr" ? "active" : ""}`}
              >
                <img
                  className="mr-1"
                  style={{ height: "19px" }}
                  src={require("../../public/assets/images/icon/lecttr.png")}
                />
                {`Lectures`}
              </NavLink>
            </NavItem>
          </Nav>
        )}
      </div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          <h5 className="modal-title" id="LanguageSwitcherLabel">
            LanguageSwitcher
          </h5>
        </ModalHeader>
        {/* <ModalBody> */}
        <div className="list-group">
          <a href="#" className="list-group-item list-group-item-action active">
            English - Vietnamese
          </a>
          <a href="#" className="list-group-item list-group-item-action">
            English - English
          </a>
          <a href="#" className="list-group-item list-group-item-action">
            English - French
          </a>
        </div>
        {/* </ModalBody> */}
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            data-dismiss="modal"
          >
            Close
          </button>
          <button type="button" className="btn btn-primary">
            Save changes
          </button>
        </div>
      </Modal>
    </>
  );
};
