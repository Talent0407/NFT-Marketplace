import "../styles/globals.scss";
import React, { useEffect } from "react";
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp