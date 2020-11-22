import { useEffect } from "react";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { QueryCache, ReactQueryCacheProvider } from "react-query";
import { Hydrate } from 'react-query/hydration'

import { darkTheme } from "../design/theme";
import { GlobalStyles } from "../design/globalStyles";

const queryCache = new QueryCache();

export default function MyApp(props) {
  const { Component, pageProps } = props;

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");

    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />

        <title>Deck</title>
      </Head>

      <ReactQueryCacheProvider queryCache={queryCache}>
        <Hydrate state={pageProps.dehydratedState}>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <GlobalStyles />

            <Component {...pageProps} />
          </ThemeProvider>

        </Hydrate>
      </ReactQueryCacheProvider>
    </>
  );
}
