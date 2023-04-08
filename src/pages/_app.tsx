import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";
import Router from "next/router";
import ProgressBar from "@badrap/bar-of-progress";

const progrss = new ProgressBar({
  size: 4,
  color: "#34D399",
  className: "z-50",
  delay: 100,
});

Router.events.on("routeChangeStart", progrss.start);
Router.events.on("routeChangeComplete", progrss.finish);
Router.events.on("routeChangeError", progrss.finish);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </RecoilRoot>
  );
}

export default MyApp;
