import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";
import { Global } from "@emotion/react";

import COLORS from "../theme/colors";

import "../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Global styles={globalStyles} />
      <Component {...pageProps} />

      <div css={styles.portals}>
        <div id="portal-modals"></div>
      </div>
    </ApolloProvider>
  );
}

const styles = {
  portals: {},
};

const globalStyles = {
  "body, html": {
    backgroundColor: COLORS.darkBackground,
    width: "100%",
    height: "100%",
  },

  // Kinda hackish I know, I bet there's a better way of constructing a base document than this
  "#__next": {
    height: "100%",
  },
};

export default MyApp;
