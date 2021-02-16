import React, { useState, useRef, useEffect } from "react";
import Router from "next/router";
import Breadcrumb from "../../../layout/breadcrumb";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import Head from "next/head";
import SkeletonSection from "./skeleton";
import settings from "../../../config/settingsConfig";
import { NextSeo, BreadcrumbJsonLd } from "next-seo";
import { Search } from "../../../layout/search";

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
  return (
    <>
      <Head>
        <meta
          name="keywords"
          content={settings.chemistry.solubility.keywordList()}
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
        title={settings.chemistry.solubility.titleTemplate}
        canonical={`https://www.athoni.com/chemicalequations`}
        openGraph={{
          type: "website",
          url: `https://www.athoni.com/chemicalequations`,
          title: settings.chemistry.solubility.titleTemplate,
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
              <CardBody className="search-words landing-home">
                <Search />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      <Breadcrumb
        parent="Chemical Equations"
        urlParent="chemicalequations"
        title="Chemistry"
        urlChildren="table-solubility"
        children="Solubility Table"
      />
      <SkeletonSection />
      <Container fluid={true}>
        <Row>
          <Col md="12">
            <div className="card intro-text">
              <div className="card-body">
                <table
                  className="tg table table-condensed bang-tinh-tan"
                  style={{
                    float: "left",
                    marginRight: 20,
                    marginBottom: 20,
                    width: "98%",
                  }}
                >
                  <tbody>
                    <tr>
                      <th
                        className="tg-baqh"
                        rowSpan={2}
                        style={{
                          width: 100,
                          backgroundColor: "#003355",
                          color: "#FFFFFF",
                        }}
                      ></th>
                      <th
                        className="tg-baqh"
                        colSpan={14}
                        style={{ backgroundColor: "#003355", color: "#FFFFFF" }}
                      ></th>
                    </tr>
                    <tr>
                      <td className="tg-baqh td-bold">
                        H<br />I
                      </td>
                      <td className="tg-baqh td-bold">
                        K<br />I
                      </td>
                      <td className="tg-baqh td-bold">
                        Na
                        <br />I
                      </td>
                      <td className="tg-baqh td-bold">
                        Ag
                        <br />I
                      </td>
                      <td className="tg-baqh td-bold">
                        Mg
                        <br />
                        II
                      </td>
                      <td className="tg-baqh td-bold">
                        Ca
                        <br />
                        II
                      </td>
                      <td className="tg-baqh td-bold">
                        Ba
                        <br />
                        II
                      </td>
                      <td className="tg-baqh td-bold">
                        Zn
                        <br />
                        II
                      </td>
                      <td className="tg-baqh td-bold">
                        Hg
                        <br />
                        II
                      </td>
                      <td className="tg-baqh td-bold">
                        Pb
                        <br />
                        II
                      </td>
                      <td className="tg-baqh td-bold">
                        Cu
                        <br />
                        II
                      </td>
                      <td className="tg-baqh td-bold">
                        Fe
                        <br />
                        II
                      </td>
                      <td className="tg-baqh td-bold">
                        Fe
                        <br />
                        III
                      </td>
                      <td className="tg-baqh td-bold">
                        Al
                        <br />
                        III
                      </td>
                    </tr>
                    <tr>
                      <td className="tg-yw4l td-bold">- OH</td>
                      <td className="tg-yw4l" />
                      <td className="tg-yw4l tan" title="KOH">
                        t
                      </td>
                      <td className="tg-yw4l tan" title="NaOH">
                        t
                      </td>
                      <td className="tg-yw4l khong-ton-tai" title="AgOH">
                        -
                      </td>
                      <td
                        className="tg-yw4l khong-tan"
                        title="Mg(OH)<sub>2</sub>"
                      >
                        k
                      </td>
                      <td className="tg-yw4l it-tan" title="Ca(OH)<sub>2</sub>">
                        i
                      </td>
                      <td className="tg-yw4l tan" title="Ba(OH)<sub>2</sub>">
                        t
                      </td>
                      <td
                        className="tg-yw4l khong-tan"
                        title="Zn(OH)<sub>2</sub>"
                      >
                        k
                      </td>
                      <td className="tg-yw4l khong-ton-tai">-</td>
                      <td
                        className="tg-yw4l khong-tan"
                        title="Pb(OH)<sub>2</sub>"
                      >
                        k
                      </td>
                      <td
                        className="tg-yw4l khong-tan"
                        title="Cu(OH)<sub>2</sub>"
                      >
                        k
                      </td>
                      <td
                        className="tg-yw4l khong-tan"
                        title="Fe(OH)<sub>2</sub>"
                      >
                        k
                      </td>
                      <td
                        className="tg-yw4l khong-tan"
                        title="Fe(OH)<sub>3</sub>"
                      >
                        k
                      </td>
                      <td
                        className="tg-yw4l khong-tan"
                        title="Al(OH)<sub>3</sub>"
                      >
                        k
                      </td>
                    </tr>
                    <tr>
                      <td className="tg-yw4l td-bold">- Cl</td>
                      <td className="tg-yw4l tan-va-bay-hoi" title="HCl">
                        t/b
                      </td>
                      <td className="tg-yw4l tan" title="KCl">
                        t
                      </td>
                      <td className="tg-yw4l tan" title="NaCl">
                        t
                      </td>
                      <td className="tg-yw4l khong-tan" title="AgCl">
                        k
                      </td>
                      <td className="tg-yw4l tan" title="MgCl<sub>2</sub>">
                        t
                      </td>
                      <td className="tg-yw4l tan" title="CaCl<sub>2</sub>">
                        t
                      </td>
                      <td className="tg-yw4l tan" title="BaCl<sub>2</sub>">
                        t
                      </td>
                      <td className="tg-yw4l tan" title="ZnCl<sub>2</sub>">
                        t
                      </td>
                      <td className="tg-yw4l tan" title="HgCl<sub>2</sub>">
                        t
                      </td>
                      <td className="tg-yw4l tan" title="PbCl<sub>2</sub>">
                        i
                      </td>
                      <td className="tg-yw4l tan" title="CuCl<sub>2</sub>">
                        t
                      </td>
                      <td className="tg-yw4l tan" title="FeCl<sub>2</sub>">
                        t
                      </td>
                      <td className="tg-yw4l tan" title="FeCl<sub>3</sub>">
                        t
                      </td>
                      <td className="tg-yw4l tan" title="AlCl<sub>3</sub>">
                        t
                      </td>
                    </tr>
                    <tr>
                      <td className="tg-yw4l td-bold">
                        - NO<sub>3</sub>
                      </td>
                      <td
                        className="tg-yw4l tan-va-bay-hoi"
                        title="HNO<sub>3</sub>"
                      >
                        t/b
                      </td>
                      <td className="tg-yw4l tan" title="KNO<sub>3</sub>">
                        t
                      </td>
                      <td className="tg-yw4l tan" title="NaNO<sub>3</sub>">
                        t
                      </td>
                      <td className="tg-yw4l tan" title="AgNO<sub>3</sub>">
                        t
                      </td>
                      <td
                        className="tg-yw4l tan"
                        title="Mg(NO<sub>3</sub>)<sub>2</sub>"
                      >
                        t
                      </td>
                      <td
                        className="tg-yw4l tan"
                        title="Ca(NO<sub>3</sub>)<sub>2</sub>"
                      >
                        t
                      </td>
                      <td
                        className="tg-yw4l tan"
                        title="Ba(NO<sub>3</sub>)<sub>2</sub>"
                      >
                        t
                      </td>
                      <td
                        className="tg-yw4l tan"
                        title="Zn(NO<sub>3</sub>)<sub>2</sub>"
                      >
                        t
                      </td>
                      <td
                        className="tg-yw4l tan"
                        title="Hg(NO<sub>3</sub>)<sub>2</sub>"
                      >
                        t
                      </td>
                      <td
                        className="tg-yw4l tan"
                        title="Pb(NO<sub>3</sub>)<sub>2</sub>"
                      >
                        t
                      </td>
                      <td
                        className="tg-yw4l tan"
                        title="Cu(NO<sub>3</sub>)<sub>2</sub>"
                      >
                        t
                      </td>
                      <td
                        className="tg-yw4l tan"
                        title="Fe(NO<sub>3</sub>)<sub>2</sub>"
                      >
                        t
                      </td>
                      <td
                        className="tg-yw4l tan"
                        title="Fe(NO<sub>3</sub>)<sub>3</sub>"
                      >
                        t
                      </td>
                      <td
                        className="tg-yw4l tan"
                        title="Al(NO<sub>3</sub>)<sub>3</sub>"
                      >
                        t
                      </td>
                    </tr>
                    <tr>
                      <td className="tg-yw4l td-bold">
                        - CH<sub>3</sub>COO
                      </td>
                      <td
                        className="tg-yw4l tan-va-bay-hoi"
                        title="CH<sub>3</sub>COOH"
                      >
                        t/b
                      </td>
                      <td className="tg-yw4l tan" title="CH<sub>3</sub>COOK">
                        t
                      </td>
                      <td className="tg-yw4l tan" title="CH<sub>3</sub>COONa">
                        t
                      </td>
                      <td className="tg-yw4l tan" title="CH<sub>3</sub>COOAg">
                        t
                      </td>
                      <td
                        className="tg-yw4l tan"
                        title="(CH<sub>3</sub>COO)<sub>2</sub>Mg"
                      >
                        t
                      </td>
                      <td
                        className="tg-yw4l tan"
                        title="(CH<sub>3</sub>COO)<sub>2</sub>Ca"
                      >
                        t
                      </td>
                      <td
                        className="tg-yw4l tan"
                        title="(CH<sub>3</sub>COO)<sub>2</sub>Ba"
                      >
                        t
                      </td>
                      <td
                        className="tg-yw4l tan"
                        title="(CH<sub>3</sub>COO)<sub>2</sub>Zn"
                      >
                        t
                      </td>
                      <td
                        className="tg-yw4l tan"
                        title="(CH<sub>3</sub>COO)<sub>2</sub>Hg"
                      >
                        t
                      </td>
                      <td
                        className="tg-yw4l tan"
                        title="(CH<sub>3</sub>COO)<sub>2</sub>Pb"
                      >
                        t
                      </td>
                      <td
                        className="tg-yw4l tan"
                        title="(CH<sub>3</sub>COO)<sub>2</sub>Cu"
                      >
                        t
                      </td>
                      <td
                        className="tg-yw4l tan"
                        title="(CH<sub>3</sub>COO)<sub>2</sub>Fe"
                      >
                        t
                      </td>
                      <td className="tg-yw4l khong-ton-tai">-</td>
                      <td
                        className="tg-yw4l it-tan"
                        title="(CH<sub>3</sub>COO)<sub>3</sub>Al"
                      >
                        i
                      </td>
                    </tr>
                    <tr>
                      <td className="tg-yw4l td-bold">= S</td>
                      <td
                        className="tg-yw4l tan-va-bay-hoi"
                        title="H<sub>2</sub>S"
                      >
                        t/b
                      </td>
                      <td className="tg-yw4l tan" title="K<sub>2</sub>S">
                        t
                      </td>
                      <td className="tg-yw4l tan" title="Na<sub>2</sub>S">
                        t
                      </td>
                      <td className="tg-yw4l khong-tan" title="Ag<sub>2</sub>S">
                        k
                      </td>
                      <td className="tg-yw4l khong-ton-tai">-</td>
                      <td className="tg-yw4l tan" title="CaS">
                        t
                      </td>
                      <td className="tg-yw4l tan" title="BaS">
                        t
                      </td>
                      <td className="tg-yw4l khong-tan" title="ZnS">
                        k
                      </td>
                      <td className="tg-yw4l khong-tan" title="HgS">
                        k
                      </td>
                      <td className="tg-yw4l khong-tan" title="PbS">
                        k
                      </td>
                      <td className="tg-yw4l khong-tan" title="CuS">
                        k
                      </td>
                      <td className="tg-yw4l khong-tan" title="FeS">
                        k
                      </td>
                      <td
                        className="tg-yw4l khong-tan"
                        title="Fe<sub>2</sub>S<sub>3</sub>"
                      />
                      <td className="tg-yw4l khong-ton-tai">-</td>
                    </tr>
                    <tr>
                      <td className="tg-yw4l td-bold">
                        = SO<sub>3</sub>
                      </td>
                      <td
                        className="tg-yw4l tan-va-bay-hoi"
                        title="H<sub>2</sub>SO<sub>3</sub>"
                      >
                        t/b
                      </td>
                      <td
                        className="tg-yw4l tan"
                        title="K<sub>2</sub>SO<sub>3</sub>"
                      >
                        t
                      </td>
                      <td
                        className="tg-yw4l tan"
                        title="Na<sub>2</sub>SO<sub>3</sub>"
                      >
                        t
                      </td>
                      <td
                        className="tg-yw4l khong-tan"
                        title="Ag<sub>2</sub>SO<sub>3</sub>"
                      >
                        k
                      </td>
                      <td
                        className="tg-yw4l khong-tan"
                        title="MgSO<sub>3</sub>"
                      >
                        k
                      </td>
                      <td
                        className="tg-yw4l khong-tan"
                        title="CaSO<sub>3</sub>"
                      >
                        k
                      </td>
                      <td
                        className="tg-yw4l khong-tan"
                        title="BaSO<sub>3</sub>"
                      >
                        k
                      </td>
                      <td
                        className="tg-yw4l khong-tan"
                        title="ZnSO<sub>3</sub>"
                      >
                        k
                      </td>
                      <td
                        className="tg-yw4l khong-tan"
                        title="HgSO<sub>3</sub>"
                      >
                        k
                      </td>
                      <td
                        className="tg-yw4l khong-tan"
                        title="PbSO<sub>3</sub>"
                      >
                        k
                      </td>
                      <td
                        className="tg-yw4l khong-tan"
                        title="CuSO<sub>3</sub>"
                      >
                        k
                      </td>
                      <td
                        className="tg-yw4l khong-tan"
                        title="FeSO<sub>3</sub>"
                      >
                        k
                      </td>
                      <td className="tg-yw4l khong-ton-tai">-</td>
                      <td className="tg-yw4l khong-ton-tai">-</td>
                    </tr>
                    <tr>
                      <td className="tg-yw4l td-bold">
                        = SO<sub>4</sub>
                      </td>
                      <td
                        className="tg-yw4l tan-va-khong-bay-hoi"
                        title="H<sub>2</sub>SO<sub>4</sub>"
                      >
                        t/kb
                      </td>
                      <td
                        className="tg-yw4l tan"
                        title="K<sub>2</sub>SO<sub>4</sub>"
                      >
                        t
                      </td>
                      <td
                        className="tg-yw4l tan"
                        title="Na<sub>2</sub>SO<sub>4</sub>"
                      >
                        t
                      </td>
                      <td
                        className="tg-yw4l it-tan"
                        title="Ag<sub>2</sub>SO<sub>4</sub>"
                      >
                        i
                      </td>
                      <td className="tg-yw4l tan" title="MgSO<sub>4</sub>">
                        t
                      </td>
                      <td className="tg-yw4l it-tan" title="CaSO<sub>4</sub>">
                        i
                      </td>
                      <td
                        className="tg-yw4l khong-tan"
                        title="BaSO<sub>4</sub>"
                      >
                        k
                      </td>
                      <td className="tg-yw4l tan" title="ZnSO<sub>4</sub>">
                        t
                      </td>
                      <td
                        className="tg-yw4l khong-ton-tai"
                        title="HgSO<sub>4</sub>"
                      >
                        -
                      </td>
                      <td
                        className="tg-yw4l khong-tan"
                        title="PbSO<sub>4</sub>"
                      >
                        k
                      </td>
                      <td className="tg-yw4l tan" title="CuSO<sub>4</sub>">
                        t
                      </td>
                      <td className="tg-yw4l tan" title="FeSO<sub>4</sub>">
                        t
                      </td>
                      <td
                        className="tg-yw4l tan"
                        title="Fe2(SO<sub>4</sub>)<sub>3</sub>"
                      >
                        t
                      </td>
                      <td
                        className="tg-yw4l tan"
                        title="Al2(SO<sub>4</sub>)<sub>3</sub>"
                      >
                        t
                      </td>
                    </tr>
                    <tr>
                      <td className="tg-yw4l td-bold">
                        = CO<sub>3</sub>
                      </td>
                      <td
                        className="tg-yw4l tan-va-bay-hoi"
                        title="H<sub>2</sub>CO<sub>3</sub>"
                      >
                        t/b
                      </td>
                      <td
                        className="tg-yw4l tan"
                        title="K<sub>2</sub>CO<sub>3</sub>"
                      >
                        t
                      </td>
                      <td
                        className="tg-yw4l tan"
                        title="Na<sub>2</sub>CO<sub>3</sub>"
                      >
                        t
                      </td>
                      <td
                        className="tg-yw4l khong-tan"
                        title="Ag<sub>2</sub>CO<sub>3</sub>"
                      >
                        k
                      </td>
                      <td
                        className="tg-yw4l khong-tan"
                        title="MgCO<sub>3</sub>"
                      >
                        k
                      </td>
                      <td
                        className="tg-yw4l khong-tan"
                        title="CaCO<sub>3</sub>"
                      >
                        k
                      </td>
                      <td
                        className="tg-yw4l khong-tan"
                        title="BaCO<sub>3</sub>"
                      >
                        k
                      </td>
                      <td
                        className="tg-yw4l khong-tan"
                        title="ZnCO<sub>3</sub>"
                      >
                        k
                      </td>
                      <td className="tg-yw4l khong-ton-tai">-</td>
                      <td
                        className="tg-yw4l khong-tan"
                        title="PbCO<sub>3</sub>"
                      >
                        k
                      </td>
                      <td
                        className="tg-yw4l khong-tan"
                        title="CuCO<sub>3</sub>"
                      >
                        k
                      </td>
                      <td
                        className="tg-yw4l khong-tan"
                        title="FeCO<sub>3</sub>"
                      >
                        k
                      </td>
                      <td className="tg-yw4l khong-ton-tai">-</td>
                      <td className="tg-yw4l khong-ton-tai">-</td>
                    </tr>
                    <tr>
                      <td className="tg-yw4l td-bold">
                        = SiO<sub>3</sub>
                      </td>
                      <td
                        className="tg-yw4l khong-tan-va-khong-bay-hoi"
                        title="H<sub>2</sub>SiO<sub>3</sub>"
                      >
                        k/kb
                      </td>
                      <td
                        className="tg-yw4l tan"
                        title="K<sub>2</sub>SiO<sub>3</sub>"
                      >
                        t
                      </td>
                      <td
                        className="tg-yw4l tan"
                        title="Na<sub>2</sub>SiO<sub>3</sub>"
                      >
                        t
                      </td>
                      <td className="tg-yw4l khong-ton-tai">-</td>
                      <td
                        className="tg-yw4l khong-tan"
                        title="MgSiO<sub>3</sub>"
                      >
                        k
                      </td>
                      <td
                        className="tg-yw4l khong-tan"
                        title="CaSiO<sub>3</sub>"
                      >
                        k
                      </td>
                      <td
                        className="tg-yw4l khong-tan"
                        title="BaSiO<sub>3</sub>"
                      >
                        k
                      </td>
                      <td
                        className="tg-yw4l khong-tan"
                        title="ZnSiO<sub>3</sub>"
                      >
                        k
                      </td>
                      <td className="tg-yw4l khong-ton-tai">-</td>
                      <td
                        className="tg-yw4l khong-tan"
                        title="PbSiO<sub>3</sub>"
                      >
                        k
                      </td>
                      <td className="tg-yw4l khong-ton-tai">-</td>
                      <td
                        className="tg-yw4l khong-tan"
                        title="FeSiO<sub>3</sub>"
                      >
                        k
                      </td>
                      <td
                        className="tg-yw4l khong-tan"
                        title="Fe<sub>2</sub>(SiO<sub>3</sub>)<sub>3</sub>"
                      >
                        k
                      </td>
                      <td
                        className="tg-yw4l khong-tan"
                        title="Al<sub>2</sub>(SiO<sub>3</sub>)<sub>3</sub>"
                      >
                        k
                      </td>
                    </tr>
                    <tr>
                      <td className="tg-yw4l td-bold">
                        ≡ PO<sub>4</sub>
                      </td>
                      <td
                        className="tg-yw4l tan-va-khong-bay-hoi"
                        title="H<sub>3</sub>PO<sub>4</sub>"
                      >
                        t/kb
                      </td>
                      <td
                        className="tg-yw4l tan"
                        title="K<sub>3</sub>PO<sub>4</sub>"
                      >
                        t
                      </td>
                      <td
                        className="tg-yw4l tan"
                        title="Na<sub>3</sub>PO<sub>4</sub>"
                      >
                        t
                      </td>
                      <td
                        className="tg-yw4l khong-tan"
                        title="Ag<sub>3</sub>PO<sub>4</sub>"
                      >
                        k
                      </td>
                      <td
                        className="tg-yw4l khong-tan"
                        title="Mg<sub>3</sub>(PO<sub>4</sub>)<sub>2</sub>"
                      >
                        k
                      </td>
                      <td
                        className="tg-yw4l khong-tan"
                        title="Ca<sub>3</sub>(PO<sub>4</sub>)<sub>2</sub>"
                      >
                        k
                      </td>
                      <td
                        className="tg-yw4l khong-tan"
                        title="Ba<sub>3</sub>(PO<sub>4</sub>)<sub>2</sub>"
                      >
                        k
                      </td>
                      <td
                        className="tg-yw4l khong-tan"
                        title="Zn<sub>3</sub>(PO<sub>4</sub>)<sub>2</sub>"
                      >
                        k
                      </td>
                      <td
                        className="tg-yw4l khong-tan"
                        title="Hg<sub>3</sub>(PO<sub>4</sub>)<sub>2</sub>"
                      >
                        k
                      </td>
                      <td
                        className="tg-yw4l khong-tan"
                        title="Pb<sub>3</sub>(PO<sub>4</sub>)<sub>2</sub>"
                      >
                        k
                      </td>
                      <td
                        className="tg-yw4l khong-tan"
                        title="Cu<sub>3</sub>(PO<sub>4</sub>)<sub>2</sub>"
                      >
                        k
                      </td>
                      <td
                        className="tg-yw4l khong-tan"
                        title="Fe<sub>3</sub>(PO<sub>4</sub>)<sub>2</sub>"
                      >
                        k
                      </td>
                      <td
                        className="tg-yw4l khong-tan"
                        title="Fe3PO<sub>4</sub>"
                      >
                        k
                      </td>
                      <td
                        className="tg-yw4l khong-tan"
                        title="Al3PO<sub>4</sub>"
                      >
                        k
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div style={{ float: "left", clear: "both" }}>
                  <p style={{ fontSize: 20 }}>
                    <span
                      style={{ float: "left", margin: 5 }}
                      className="label tan"
                    >
                      Soluble
                    </span>
                    <span
                      style={{ float: "left", margin: 5 }}
                      className="label khong-tan"
                    >
                      Insoluble
                    </span>
                    <span
                      style={{ float: "left", margin: 5 }}
                      className="label it-tan"
                    >
                      Slightly soluble
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SolubilityTable;
