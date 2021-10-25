import { Button } from "@blueprintjs/core";
import React, { useContext } from "react";
import { PageSnippets } from "./snippets";
import { KnownTerms } from "./terms";
import { LinkageBin, LinkedTerms } from "./linking-components";
import { AppContext } from ".";
import "./page-layout.styl";

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
      style={{ color: "white" }}
      onClick={onClick}
      minimal={true}
    >
      Return to Search
    </Button>
  );
}

function PaperTitle() {
  const { state, runAction } = useContext(AppContext);
  const { paper_title } = state;

  return <h1 className="paper-title">{paper_title}</h1>;
}

function LinkingPage() {
  return (
    <div className="linking-page">
      <PaperTitle />
      <BackArrow />
      <div className="top">
        <KnownTerms />
        <LinkageBin />
      </div>
      <div className="bottom">
        <PageSnippets />
        <LinkedTerms />
      </div>
    </div>
  );
}

export { LinkingPage };
