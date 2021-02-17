import settings from "../../config/settingsConfig";
import Link from "next/link";
import Router from "next/router";
import { useState, useRef } from "react";
import useOutsideClick from "../../lib/event";
import { generateEquation } from "../../service/chemistry";
import { Modal, ModalHeader } from "reactstrap";
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
            if (props.currentPage !== "home" && !isStringEmpty(keyword))
              Router.push("/qa/" + encodeURIComponent(cleanUpString(keyword)));
            return;
          case "lecttr":
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

  return (
    <>
      <div className="dropdown">
        <div className="input-group input-group-lg search-input">
          <DelayInput
            type="text"
            minLength={2}
            delayTimeout={300}
            className="form-control"
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
          />
          {currentSearch == "dictionary" ? (
            <a className="language-switcher" onClick={toggle}>
              English - English
            </a>
          ) : (
            ""
          )}
          <button
            type="button"
            className="btn btn-light"
            aria-label="Search..."
            onClick={onSubmitClick}
          >
            <img
              src={require("../../public/assets/images/landing/search-icon.png")}
              alt="Search Icon"
              width={31}
            />
          </button>
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
        </div>
      </div>
      <div className="btn-grp mt-4">
        <button
          onClick={setActiveSearch}
          area="chemistry"
          className={`btn btn-pill btn-secondary btn-air-success btn-lg wow pulse mr-3 ${
            currentSearch === "chemistry" ? "active" : ""
          }`}
        >
          <img
            src={require("../../public/assets/images/landing/icon/chemistry.webp")}
          />
          Chemistry
        </button>
        <button
          onClick={setActiveSearch}
          area="dictionary"
          className={`btn btn-pill btn-secondary btn-air-success btn-lg wow pulse mr-3 ${
            currentSearch === "dictionary" ? "active" : ""
          }`}
        >
          <img
            src={require("../../public/assets/images/landing/dictionaries-app-icon.png")}
          />
          Dictionary
        </button>
        <button
          onClick={setActiveSearch}
          area="hoidap"
          className={`btn btn-pill btn-secondary btn-air-success btn-lg wow pulse mr-3 ${
            currentSearch === "hoidap" ? "active" : ""
          }`}
        >
          <img src={require("../../public/assets/images/icon/selfomy.png")} />
          Hoi Dap
        </button>
        <button
          onClick={setActiveSearch}
          area="lecttr"
          className={`btn btn-pill btn-secondary btn-air-success btn-lg wow pulse mr-3 ${
            currentSearch === "lecttr" ? "active" : ""
          }`}
        >
          <img src={require("../../public/assets/images/icon/lecttr.png")} />
          Lecttr
        </button>
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
            English - Franch
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
