import { Button } from "@blueprintjs/core";
import React, { useContext } from "react";
import { PageSnippets } from "./snippets";
import { KnownTerms } from "./terms";
import { LinkageBin, LinkedTerms } from "./linking-components";
import { AppContext } from ".";
import "./page-layout.styl";
import { PaperHeading } from "./paper-meta";

function BackArrow() {
  const { state, runAction } = useContext(AppContext);

  const onClick = () => {
    runAction({ type: "set_docid", payload: { docid: "" } });
    runAction({ type: "reset_state" });
  };

  return (
    <Button
      icon="arrow-left"
      className="back-arrow"
      onClick={onClick}
      minimal={true}
    >
      Return to Search
    </Button>
  );
}

function LinkingPage() {
  return (
    <div className="linking-page">
      <PaperHeading />
      <BackArrow />
      <div className="page-content">
        <KnownTerms />
        <PageSnippets />
        <div className="linked">
          <LinkageBin />
          <LinkedTerms />
        </div>
      </div>
    </div>
  );
}

export { LinkingPage };
