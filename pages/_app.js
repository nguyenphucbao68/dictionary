import Head from "next/head";
import "../public/assets/css/reset.css";
// import "../public/assets/css/styleReact.min.css";
// import "../public/content.min.css";
// import "../public/test.css";
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="theme-color" content="#000000" />
        {/* Google font*/}
        {/* <link
          href="https://fonts.googleapis.com/css?family=Rubik:400,400i,500,500i,700,700i&display=swap"
          rel="stylesheet"
          onLoad="this.media='all'"
        /> */}
        {/* <link
          href="https://fonts.googleapis.com/css?family=Roboto:300,300i,400,400i,500,500i,700,700i,900&display=swap"
          rel="stylesheet"
          onLoad="this.media='all'"
        /> */}
        <link rel="icon" href="/favicon.ico" />

        <meta httpEquiv="x-dns-prefetch-control" content="on" />
        {/* <link rel="dns-prefetch" href="//fonts.googleapis.com" /> */}
        {/* <link rel="dns-prefetch" href="//cdnjs.cloudflare.com" /> */}
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        {/* <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="true"
        /> */}
        <link
          rel="preconnect"
          href="https://www.googletagmanager.com"
          crossOrigin="true"
        />
        {/* <link
          rel="preconnect"
          href="https://fonts.gstatic.com/"
          crossOrigin="true"
        /> */}
        {/* <link
          rel="preconnect"
          href="https://cdnjs.cloudflare.com/"
          crossOrigin="true"
        /> */}
        <meta name="revisit-after" content="1 days" />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-CK92BFCYQB"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-CK92BFCYQB');`
              .replace(/(?:\r\n|\r|\n)/g, "")
              .trim(),
          }}
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
