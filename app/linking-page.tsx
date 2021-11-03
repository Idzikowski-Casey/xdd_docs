import { Button } from "@blueprintjs/core";
import React, { useContext } from "react";
import { PageSnippets } from "./snippets";
import { KnownTerms } from "./known-terms/terms";
import { LinkageBin, LinkedTerms } from "./linking-components";
import { AppContext } from ".";
import "./page-layout.styl";
import { LinkPageNavbar } from "./navbar";

function LinkingPage() {
  return (
    <div className="linking-page">
      <LinkPageNavbar />
      <div className="page-content">
        <KnownTerms />
        <div className="left">
          <div className="linked">
            <LinkageBin />
            <LinkedTerms />
          </div>
          <div className="end">
            <PageSnippets />
          </div>
        </div>
      </div>
    </div>
  );
}

export { LinkingPage };
