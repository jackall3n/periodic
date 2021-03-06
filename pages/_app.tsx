import '../styles/globals.css'
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Patrick+Hand&family=Poppins:ital,wght@0,100;0,300;0,400;0,500;0,600;0,700;1,100&family=Source+Serif+Pro:wght@300;400&display=swap"
          rel="stylesheet" />
      </Head>
      <Component {...pageProps} />
    </>

  )
}

export default MyApp
