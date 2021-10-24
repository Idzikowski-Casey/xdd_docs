import React from "react";
import { AppContextProvider, AppPages } from "../app";

function App() {
  return (
    <AppContextProvider>
      <AppPages />
    </AppContextProvider>
  );
}

export default App;
