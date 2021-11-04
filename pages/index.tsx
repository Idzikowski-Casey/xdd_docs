import React from "react";
import { AppContextProvider, AppPages } from "../app";
import Head from "next/head";

function App() {
  return (
    <div>
      <Head>
        <title>xDD Term Linkage</title>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <AppContextProvider>
        <AppPages />
      </AppContextProvider>
    </div>
  );
}

export default App;
