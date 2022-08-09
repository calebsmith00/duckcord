import "../styles/globals.css";
import type { AppProps } from "next/app";
import type { NextPageContext } from "next";

async function getSocket() {
  return await fetch("http://localhost:3000/api/socket");
}

getSocket();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}
