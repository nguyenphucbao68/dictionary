import React, { useState, useRef, useEffect } from "react";
import Router from "next/router";
import Breadcrumb from "../../../layout/breadcrumb";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import Head from "next/head";
import Link from "next/link";
import useOutsideClick from "../../../lib/event";
import SkeletonSection from "./skeleton";
import settings from "../../../config/settingsConfig";
import { NextSeo, BreadcrumbJsonLd } from "next-seo";
import DataTable from "react-data-table-component";

Router.onRouteChangeStart = () => {
  document.getElementById("skeleton-reaction").classList.remove("hidden");
  document.getElementById("skeleton-reaction").classList.add("show");
  document.getElementById("reaction-info").classList.remove("show");
  document.getElementById("reaction-info").classList.add("hidden");
};
Router.onRouteChangeComplete = () => {
  document.getElementById("skeleton-reaction").classList.remove("show");
  document.getElementById("skeleton-reaction").classList.add("hidden");
  document.getElementById("reaction-info").classList.remove("hidden");
  document.getElementById("reaction-info").classList.add("show");
};
Router.onRouteChangeError = () => {
  document.getElementById("skeleton-reaction").classList.remove("show");
  document.getElementById("skeleton-reaction").classList.add("hidden");
  document.getElementById("reaction-info").classList.remove("hidden");
  document.getElementById("reaction-info").classList.add("show");
};
const SolubilityTable = () => {
  const ref = useRef();
  const [keyword, setKeyword] = useState("");
  const [listWord, setListWord] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const clickInputSearch = () => {
    if (keyword === "") return;
    setShowResults(true);
  };

  useOutsideClick(ref, () => {
    setShowResults(false);
  });

  const onChangeKeyWord = async (e) => {
    const keyword = e.target.value;
    if (keyword == "") return;
    setKeyword(e.target.value);
    try {
      const res = await fetch(`/api/index.php/reaction/search/s/${keyword}`);
      const obj = res.json();
      setListWord(await obj);
      setShowResults(true);
    } catch (error) {
      // console.log('err', error);
    }
  };

  return (
    <>
      <Head>
        <meta
          name="keywords"
          content={settings.chemistry.electron.keywordList()}
        />

        <link href="https://www.athoni.com" rel="publisher" />
      </Head>
      <BreadcrumbJsonLd
        itemListElements={[
          {
            position: 1,
            name: "Home",
            item: "https://www.athoni.com",
          },
          {
            position: 2,
            name: "Chemical Equations",
            item: "https://www.athoni.com/chemicalequations",
          },
        ]}
      />
      <NextSeo
        title={settings.chemistry.electron.titleTemplate}
        canonical={`https://www.athoni.com/chemicalequations`}
        openGraph={{
          type: "website",
          url: `https://www.athoni.com/chemicalequations`,
          title: settings.chemistry.electron.titleTemplate,
          images: [
            {
              url: "https://www.athoni.com/assets/images/athoni-bg.png",
              width: 800,
              height: 600,
              alt: "Athoni Dictionary",
            },
          ],
          site_name: "Athoni Dictionary",
        }}
        twitter={{
          handle: "@handle",
          site: "@site",
          cardType: "summary_large_image",
        }}
      />
      <Container fluid={true}>
        <Row className="appointment-sec mt-2">
          <Col md="12" className="chat-default">
            <Card>
              <CardBody className="search-words">
                <div className="dropdown">
                  <div className="input-group input-group-lg search-input">
                    <input
                      type="text"
                      className="form-control"
                      aria-label="Search Athoni's Dictionary"
                      id="keyword-search"
                      placeholder="Search Athoni's Dictionary"
                      onChange={onChangeKeyWord}
                      ref={ref}
                      onClick={clickInputSearch}
                      autoComplete="off"
                    />

                    <button
                      type="button"
                      className="btn btn-light"
                      aria-label="Search..."
                    >
                      <img
                        src={require("../../../public/assets/images/landing/search-icon.png")}
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
                    <div className="col-md-6">
                      {listWord
                        .filter((item, i) => i < listWord.length / 2)
                        .map((item, i) => (
                          <>
                            <Link
                              href=""
                              // href={``}
                              key={i}
                              onClick={() => setShowResults(false)}
                            >
                              <a className="dropdown-item">{item?.reaction}</a>
                            </Link>
                          </>
                        ))}
                    </div>
                    <div className="col-md-6">
                      {listWord
                        .filter((item, i) => i >= listWord.length / 2)
                        .map((item, i) => (
                          <>
                            <Link
                              href=""
                              // href={`/dict/${language}/${item?.word}`}
                              key={i}
                              onClick={() => setShowResults(false)}
                            >
                              <a className="dropdown-item">{item?.reaction}</a>
                            </Link>
                          </>
                        ))}
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      <Breadcrumb
        parent="Chemical Equations"
        urlParent="chemicalequations"
        title="Chemistry"
        urlChildren="configuration-electron"
        children="Configuration Electron"
      />
      <SkeletonSection />
      <Container fluid={true}>
        <Row>
          <Col md="12">
            <div className="card intro-text">
              <div className="card-body">
                <table className="config-electron-table">
                  <thead>
                    <tr>
                      <td
                        style={{
                          fontSize: "100%",
                          fontWeight: "bold",
                          color: "#fff",
                          backgroundColor: "#000",
                          width: "10%",
                          textAlign: "center",
                        }}
                      >
                        &nbsp;#
                      </td>
                      <td
                        style={{
                          fontSize: "100%",
                          fontWeight: "bold",
                          color: "#fff",
                          backgroundColor: "#000",
                          width: "45%",
                          textAlign: "center",
                        }}
                      >
                        Actomic
                      </td>
                      <td
                        style={{
                          fontSize: "100%",
                          fontWeight: "bold",
                          color: "#ffffff",
                          backgroundColor: "#000000",
                          width: "45%",
                          textAlign: "center",
                        }}
                      >
                        Electronic configurations
                      </td>
                    </tr>
                  </thead>
                  <tbody id="searchContent">
                    <tr>
                      <td>1</td>
                      <td>Hydrogen</td>
                      <td>
                        1s<sup>1</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Helium</td>
                      <td>
                        1s<sup>2</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Lithium</td>
                      <td>
                        [He]2s<sup>1</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>Beryllium</td>
                      <td>
                        [He]2s<sup>2</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>Boron</td>
                      <td>
                        [He]2s<sup>2</sup>2p<sup>1</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td>Carbon</td>
                      <td>
                        [He]2s<sup>2</sup>2p<sup>2</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>7</td>
                      <td>Nitrogen</td>
                      <td>
                        [He]2s<sup>2</sup>2p<sup>3</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>8</td>
                      <td>Oxygen</td>
                      <td>
                        [He]2s<sup>2</sup>2p<sup>4</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>9</td>
                      <td>Fluorine</td>
                      <td>
                        [He]2s<sup>2</sup>2p<sup>5</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>10</td>
                      <td>Neon</td>
                      <td>
                        [He]2s<sup>2</sup>2p<sup>6</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>11</td>
                      <td>Sodium</td>
                      <td>
                        [Ne]3s<sup>1</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>12</td>
                      <td>Magnesium</td>
                      <td>
                        [Ne]3s<sup>2</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>13</td>
                      <td>Aluminum</td>
                      <td>
                        [Ne]3s<sup>2</sup>3p<sup>1</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>14</td>
                      <td>Silicon</td>
                      <td>
                        [Ne]3s<sup>2</sup>3p<sup>2</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>15</td>
                      <td>Phosphorus</td>
                      <td>
                        [Ne]3s<sup>2</sup>3p<sup>3</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>16</td>
                      <td>Sulfur</td>
                      <td>
                        [Ne]3s<sup>2</sup>3p<sup>4</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>17</td>
                      <td>Chlorine</td>
                      <td>
                        [Ne]3s<sup>2</sup>3p<sup>5</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>18</td>
                      <td>Argon</td>
                      <td>
                        [Ne]3s<sup>2</sup>3p<sup>6</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>19</td>
                      <td>Potassium</td>
                      <td>
                        [Ar]4s<sup>1</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>20</td>
                      <td>Calcium</td>
                      <td>
                        [Ar]4s<sup>2</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>21</td>
                      <td>Scandium</td>
                      <td>
                        [Ar]3d<sup>1</sup>4s<sup>2</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>22</td>
                      <td>Titanium</td>
                      <td>
                        [Ar]3d<sup>2</sup>4s<sup>2</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>23</td>
                      <td>Vanadium</td>
                      <td>
                        [Ar]3d<sup>3</sup>4s<sup>2</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>24</td>
                      <td>Chromium</td>
                      <td>
                        [Ar]3d<sup>5</sup>4s<sup>1</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>25</td>
                      <td>Manganese</td>
                      <td>
                        [Ar]3d<sup>5</sup>4s<sup>2</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>26</td>
                      <td>Iron</td>
                      <td>
                        [Ar]3d<sup>6</sup>4s<sup>2</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>27</td>
                      <td>Cobalt</td>
                      <td>
                        [Ar]3d<sup>7</sup>4s<sup>2</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>28</td>
                      <td>Nickel</td>
                      <td>
                        [Ar]3d<sup>8</sup>4s<sup>2</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>29</td>
                      <td>Copper</td>
                      <td>
                        [Ar]3d<sup>10</sup>4s<sup>1</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>30</td>
                      <td>Zinc</td>
                      <td>
                        [Ar]3d<sup>10</sup>4s<sup>2</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>31</td>
                      <td>Gallium</td>
                      <td>
                        [Ar]3d<sup>10</sup>4s<sup>2</sup>4p<sup>1</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>32</td>
                      <td>Germanium</td>
                      <td>
                        [Ar]3d<sup>10</sup>4s<sup>2</sup>4p<sup>2</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>33</td>
                      <td>Arsenic</td>
                      <td>
                        [Ar]3d<sup>10</sup>4s<sup>2</sup>4p<sup>3</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>34</td>
                      <td>Selenium</td>
                      <td>
                        [Ar]3d<sup>10</sup>4s<sup>2</sup>4p<sup>4</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>35</td>
                      <td>Bromine</td>
                      <td>
                        [Ar]3d<sup>10</sup>4s<sup>2</sup>4p<sup>5</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>36</td>
                      <td>Krypton</td>
                      <td>
                        [Ar]3d<sup>10</sup>4s<sup>2</sup>4p<sup>6</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>37</td>
                      <td>Rubidium</td>
                      <td>
                        [Kr]5s<sup>1</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>38</td>
                      <td>Strontium</td>
                      <td>
                        [Kr]5s<sup>2</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>39</td>
                      <td>Yttrium</td>
                      <td>
                        [Kr]4d<sup>1</sup>5s<sup>2</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>40</td>
                      <td>Zirconium</td>
                      <td>
                        [Kr]4d<sup>2</sup>5s<sup>2</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>41</td>
                      <td>Niobium</td>
                      <td>
                        [Kr]4d<sup>4</sup>5s<sup>1</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>42</td>
                      <td>Molybdenum</td>
                      <td>
                        [Kr]4d<sup>5</sup>5s<sup>1</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>43</td>
                      <td>Technetium</td>
                      <td>
                        [Kr]4d<sup>5</sup>5s<sup>2</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>44</td>
                      <td>Ruthenium</td>
                      <td>
                        [Kr]4d<sup>7</sup>5s<sup>1</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>45</td>
                      <td>Rhodium</td>
                      <td>
                        [Kr]4d<sup>8</sup>5s<sup>1</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>46</td>
                      <td>Palladium</td>
                      <td>
                        [Kr]4d<sup>10</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>47</td>
                      <td>Silver</td>
                      <td>
                        [Kr]4d<sup>10</sup>5s<sup>1</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>48</td>
                      <td>Cadmium</td>
                      <td>
                        [Kr]4d<sup>10</sup>5s<sup>2</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>49</td>
                      <td>Indium</td>
                      <td>
                        [Kr]4d<sup>10</sup>5s<sup>2</sup>5p<sup>1</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>50</td>
                      <td>Tin</td>
                      <td>
                        [Kr]4d<sup>10</sup>5s<sup>2</sup>5p<sup>2</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>51</td>
                      <td>Antimony</td>
                      <td>
                        [Kr]4d<sup>10</sup>5s<sup>2</sup>5p<sup>3</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>52</td>
                      <td>Tellurium</td>
                      <td>
                        [Kr]4d<sup>10</sup>5s<sup>2</sup>5p<sup>4</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>53</td>
                      <td>Iodine</td>
                      <td>
                        [Kr]4d<sup>10</sup>5s<sup>2</sup>5p<sup>5</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>54</td>
                      <td>Xenon</td>
                      <td>
                        [Kr]4d<sup>10</sup>5s<sup>2</sup>5p<sup>6</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>55</td>
                      <td>Cesium</td>
                      <td>
                        [Xe]6s<sup>1</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>56</td>
                      <td>Barium</td>
                      <td>
                        [Xe]6s<sup>2</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>57</td>
                      <td>Lanthanum</td>
                      <td>
                        [Xe]5d<sup>1</sup>6s<sup>2</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>58</td>
                      <td>Cerium</td>
                      <td>
                        [Xe]4f<sup>1</sup>5d<sup>1</sup>6s<sup>2</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>59</td>
                      <td>Praseodymium</td>
                      <td>
                        [Xe]4f<sup>3</sup>6s<sup>2</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>60</td>
                      <td>Neodymium</td>
                      <td>
                        [Xe]4f<sup>4</sup>6s<sup>2</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>61</td>
                      <td>Promethium</td>
                      <td>
                        [Xe]4f<sup>5</sup>6s<sup>2</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>62</td>
                      <td>Samarium</td>
                      <td>
                        [Xe]4f<sup>6</sup>6s<sup>2</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>63</td>
                      <td>Europium</td>
                      <td>
                        [Xe]4f<sup>7</sup>6s<sup>2</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>64</td>
                      <td>Gadolinium</td>
                      <td>
                        [Xe]4f<sup>7</sup>5d<sup>1</sup>6s<sup>2</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>65</td>
                      <td>Terbium</td>
                      <td>
                        [Xe]4f<sup>9</sup>6s<sup>2</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>66</td>
                      <td>Dysprosium</td>
                      <td>
                        [Xe]4f<sup>10</sup>6s<sup>2</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>67</td>
                      <td>Holmium</td>
                      <td>
                        [Xe]4f<sup>11</sup>6s<sup>2</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>68</td>
                      <td>Erbium</td>
                      <td>
                        [Xe]4f<sup>12</sup>6s<sup>2</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>69</td>
                      <td>Thulium</td>
                      <td>
                        [Xe]4f<sup>13</sup>6s<sup>2</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>70</td>
                      <td>Ytterbium</td>
                      <td>
                        [Xe]4f<sup>14</sup>6s<sup>2</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>71</td>
                      <td>Lutetium</td>
                      <td>
                        [Xe]4f<sup>14</sup>5d<sup>1</sup>6s<sup>2</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>72</td>
                      <td>Hafnium</td>
                      <td>
                        [Xe]4f<sup>14</sup>5d<sup>2</sup>6s<sup>2</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>73</td>
                      <td>Tantalum</td>
                      <td>
                        [Xe]4f<sup>14</sup>5d<sup>3</sup>6s<sup>2</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>74</td>
                      <td>Tungsten</td>
                      <td>
                        [Xe]4f<sup>14</sup>5d<sup>4</sup>6s<sup>2</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>75</td>
                      <td>Rhenium</td>
                      <td>
                        [Xe]4f<sup>14</sup>5d<sup>5</sup>6s<sup>2</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>76</td>
                      <td>Osmium</td>
                      <td>
                        [Xe]4f<sup>14</sup>5d<sup>6</sup>6s<sup>2</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>77</td>
                      <td>Iridium</td>
                      <td>
                        [Xe]4f<sup>14</sup>5d<sup>7</sup>6s<sup>2</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>78</td>
                      <td>Platinum</td>
                      <td>
                        [Xe]4f<sup>14</sup>5d<sup>9</sup>6s<sup>1</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>79</td>
                      <td>Gold</td>
                      <td>
                        [Xe]4f<sup>14</sup>5d<sup>10</sup>6s<sup>1</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>80</td>
                      <td>Mercury</td>
                      <td>
                        [Xe]4f<sup>14</sup>5d<sup>10</sup>6s<sup>2</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>81</td>
                      <td>Thallium</td>
                      <td>
                        [Xe]4f<sup>14</sup>5d<sup>10</sup>6s<sup>2</sup>6p
                        <sup>1</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>82</td>
                      <td>Lead</td>
                      <td>
                        [Xe]4f<sup>14</sup>5d<sup>10</sup>6s<sup>2</sup>6p
                        <sup>2</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>83</td>
                      <td>Bismuth</td>
                      <td>
                        [Xe]4f<sup>14</sup>5d<sup>10</sup>6s<sup>2</sup>6p
                        <sup>3</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>84</td>
                      <td>Polonium</td>
                      <td>
                        [Xe]4f<sup>14</sup>5d<sup>10</sup>6s<sup>2</sup>6p
                        <sup>4</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>85</td>
                      <td>Astatine</td>
                      <td>
                        [Xe]4f<sup>14</sup>5d<sup>10</sup>6s<sup>2</sup>6p
                        <sup>5</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>86</td>
                      <td>Radon</td>
                      <td>
                        [Xe]4f<sup>14</sup>5d<sup>10</sup>6s<sup>2</sup>6p
                        <sup>6</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>87</td>
                      <td>Francium</td>
                      <td>
                        [Rn]7s<sup>1</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>88</td>
                      <td>Radium</td>
                      <td>
                        [Rn]7s<sup>2</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>89</td>
                      <td>Actinium</td>
                      <td>
                        [Rn]6d<sup>1</sup>7s<sup>2</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>90</td>
                      <td>Thorium</td>
                      <td>
                        [Rn]6d<sup>2</sup>7s<sup>2</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>91</td>
                      <td>Protactinium</td>
                      <td>
                        [Rn]5f<sup>2</sup>6d<sup>1</sup>7s<sup>2</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>92</td>
                      <td>Uranium</td>
                      <td>
                        [Rn]5f<sup>3</sup>6d<sup>1</sup>7s<sup>2</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>93</td>
                      <td>Neptunium</td>
                      <td>
                        [Rn]5f<sup>4</sup>6d<sup>1</sup>7s<sup>2</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>94</td>
                      <td>Plutonium</td>
                      <td>
                        [Rn]5f<sup>6</sup>7s<sup>2</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>95</td>
                      <td>Americium</td>
                      <td>
                        [Rn]5f<sup>7</sup>7s<sup>2</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>96</td>
                      <td>Curium</td>
                      <td>
                        [Rn]5f<sup>7</sup>6d<sup>1</sup>7s<sup>2</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>97</td>
                      <td>Berkelium</td>
                      <td>
                        [Rn]5f<sup>9</sup>7s<sup>2</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>98</td>
                      <td>Californium</td>
                      <td>
                        [Rn]5f<sup>10</sup>7s<sup>2</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>99</td>
                      <td>Einsteinium</td>
                      <td>
                        [Rn]5f<sup>11</sup>7s<sup>2</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>100</td>
                      <td>Fermium</td>
                      <td>
                        [Rn]5f<sup>12</sup>7s<sup>2</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>101</td>
                      <td>Mendelevium</td>
                      <td>
                        [Rn]5f<sup>13</sup>7s<sup>2</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>102</td>
                      <td>Nobelium</td>
                      <td>
                        [Rn]5f<sup>14</sup>7s<sup>2</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>103</td>
                      <td>Lawrencium</td>
                      <td>
                        [Rn]5f<sup>14</sup>7s<sup>2</sup>7p<sup>1</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>104</td>
                      <td>Rutherfordium</td>
                      <td>
                        [Rn]5f<sup>14</sup>6d<sup>2</sup>7s<sup>2</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>105</td>
                      <td>Dubnium</td>
                      <td>
                        *[Rn]5f<sup>14</sup>6d<sup>3</sup>7s<sup>2</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>106</td>
                      <td>Seaborgium</td>
                      <td>
                        *[Rn]5f<sup>14</sup>6d<sup>4</sup>7s<sup>2</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>107</td>
                      <td>Bohrium</td>
                      <td>
                        *[Rn]5f<sup>14</sup>6d<sup>5</sup>7s<sup>2</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>108</td>
                      <td>Hassium</td>
                      <td>
                        *[Rn]5f<sup>14</sup>6d<sup>6</sup>7s<sup>2</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>109</td>
                      <td>Meitnerium</td>
                      <td>
                        *[Rn]5f<sup>14</sup>6d<sup>7</sup>7s<sup>2</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>110</td>
                      <td>Darmstadtium</td>
                      <td>
                        *[Rn]5f<sup>14</sup>6d<sup>9</sup>7s<sup>1</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>111</td>
                      <td>Roentgenium</td>
                      <td>
                        *[Rn]5f<sup>14</sup>6d<sup>10</sup>7s<sup>1</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>112</td>
                      <td>Copernium</td>
                      <td>
                        *[Rn]5f<sup>14</sup>6d<sup>10</sup>7s<sup>2</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>113</td>
                      <td>Nihonium</td>
                      <td>
                        *[Rn]5f<sup>14</sup>6d<sup>10</sup>7s<sup>2</sup>7p
                        <sup>1</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>114</td>
                      <td>Flerovium</td>
                      <td>
                        *[Rn]5f<sup>14</sup>6d<sup>10</sup>7s<sup>2</sup>7p
                        <sup>2</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>115</td>
                      <td>Moscovium</td>
                      <td>
                        *[Rn]5f<sup>14</sup>6d<sup>10</sup>7s<sup>2</sup>7p
                        <sup>3</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>116</td>
                      <td>Livermorium</td>
                      <td>
                        *[Rn]5f<sup>14</sup>6d<sup>10</sup>7s<sup>2</sup>7p
                        <sup>4</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>117</td>
                      <td>Tennessine</td>
                      <td>
                        *[Rn]5f<sup>14</sup>6d<sup>10</sup>7s<sup>2</sup>7p
                        <sup>5</sup>
                      </td>
                    </tr>
                    <tr>
                      <td>118</td>
                      <td>Oganesson</td>
                      <td>
                        *[Rn]5f<sup>14</sup>6d<sup>10</sup>7s<sup>2</sup>7p
                        <sup>6</sup>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SolubilityTable;
