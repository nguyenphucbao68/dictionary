import Head from "next/head";
import { useEffect } from "react";
import { wrapper } from "../store";
import ReactGA from "react-ga";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    ReactGA.initialize("G-CK92BFCYQB");
    ReactGA.pageview("/");
  }, []);
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="theme-color" content="#000000" />
        {/* Google font*/}
        <link
          href="https://fonts.googleapis.com/css?family=Rubik:400,400i,500,500i,700,700i&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Roboto:300,300i,400,400i,500,500i,700,700i,900&display=swap"
          rel="stylesheet"
        />
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />

        <link
          rel="stylesheet"
          type="text/css"
          href="/assets/css/getBootstrap.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="/assets/css/styleReact.min.css"
        />
        <link rel="stylesheet" href="/test.css" />
        <link rel="preload" href="/assets/css/styleReact.min.css" as="style" />
        <link
          rel="preload"
          href="/assets/css/getBootstrap.min.css"
          as="style"
        />
        <link rel="preload" href="/test.css" as="style" />
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//cdnjs.cloudflare.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com/"
          crossOrigin="true"
        />
        <link
          rel="preconnect"
          href="https://cdnjs.cloudflare.com/"
          crossOrigin="true"
        />
        <link
          rel="preload"
          as="font"
          href="/assets/fonts/font-awesome/fontawesome-webfont.woff2"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          as="font"
          href="/assets/fonts/pe7-icon/Pe-icon-7-stroke.woff"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          as="font"
          href="/assets/fonts/ico/icofont.ttf"
          crossOrigin="anonymous"
        />
      </Head>
      <Component {...pageProps} />
      <link
        rel="stylesheet"
        type="text/css"
        href="//cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/leaflet.css"
      />
    </>
  );
}

export default wrapper.withRedux(MyApp);
