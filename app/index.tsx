import React, { useContext } from "react";
import { LinkingPage } from "./linking-page";
import { LandingSearch } from "./search";
export * from "./context";
import { AppContext } from ".";
import "./pages.styl";

function AppPages() {
  const { state } = useContext(AppContext);

  let predicate: boolean = state["docid"].length > 0;
  let searchClassName = predicate ? "hidden-left" : "visable-opacity";
  let linkingClassName = predicate ? "visable" : "hidden-right";

  return (
    <div className="page-container">
      <div className={searchClassName}>
        <LandingSearch />
      </div>
      <div className={linkingClassName}>
        <LinkingPage />
      </div>
    </div>
  );
}

export { AppPages };
