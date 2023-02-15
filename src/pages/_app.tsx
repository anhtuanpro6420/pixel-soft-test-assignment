/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import "@Styles/index.scss";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StyledEngineProvider injectFirst>
      <CssBaseline />
      <Component {...pageProps} />
    </StyledEngineProvider>
  );
}

export default MyApp;
