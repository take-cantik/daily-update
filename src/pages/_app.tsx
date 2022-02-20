import "../../styles/reset.css";
import "../../styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { AuthInit } from "~/state/auth";

function myApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <AuthInit />
      <Component {...pageProps} />
    </RecoilRoot>
  );
}

export default myApp;
