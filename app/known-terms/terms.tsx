import React, { useContext, useState } from "react";
import { Tag, Button } from "@blueprintjs/core";
import { AppContext } from "..";
import { DndChild } from "../linking-components";
import { PanelStack } from ".";
import "./module.styl";

function VocabHeader({ isOpen = false, title, ...rest }) {
  const styles = {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    fontSize: "18px",
  };

  return (
    <div className="">
      <Button
        onClick={rest.onClick}
        minimal={true}
        rightIcon="chevron-right"
        style={{
          ...styles,
        }}
        className="button-text"
      >
        {title}
      </Button>
    </div>
  );
}

export function TermCard(props) {
  const { runAction } = useContext(AppContext);
  const { term, onRemove = undefined, snippet = true, width } = props;

  const onClick = () => {
    if (snippet) {
      runAction({ type: "set_snippet_term", payload: { snippet_term: term } });
    }
  };

  return (
    <DndChild id={`drag-child-${term}`} data={term} width={width}>
      <Tag
        onClick={onClick}
        round={true}
        large={true}
        onRemove={onRemove}
        className="term-tag"
      >
        {term}
      </Tag>
    </DndChild>
  );
}

function filterTerms(terms, filter) {
  if (filter == "") return terms;

  let filteredTerms = {};
  // known terms is a object of lists
  Object.entries(terms).map(([key, value], i) => {
    value.map((word) => {
      word.toLowerCase().includes(filter);
    });
  });

  return filteredTerms;
}

function VocabPanel(props) {
  const { state, runAction } = useContext(AppContext);
  const { known_terms } = state;
  const { openPanel } = props;

  const openNewPanel = (selectedVocab) => {
    openPanel({
      props: { selectedVocab },
      renderPanel: TermsPanel,
      title: selectedVocab,
    });
  };

  return (
    <div className="known-terms-list">
      {Object.entries(known_terms).map(([key, value], i) => {
        return (
          <VocabHeader key={i} title={key} onClick={() => openNewPanel(key)} />
        );
      })}
    </div>
  );
}

function TermsPanel(props) {
  const { state, runAction } = useContext(AppContext);
  const { known_terms } = state;
  const { selectedVocab } = props;

  const terms = known_terms[selectedVocab];
  if (!terms) return <div></div>;
  return (
    <div className="terms-container">
      {terms.map((term, i) => {
        return <TermCard term={term} key={i} />;
      })}
    </div>
  );
}

const initialPanel = {
  props: {
    panelNumber: 1,
  },
  renderPanel: VocabPanel,
  title: "Choose a Vocabulary",
};

function KnownTerms() {
  const { state, runAction } = useContext(AppContext);
  const { known_terms } = state;

  const [search, setSearch] = useState("");
  const [terms, setTerms] = useState(known_terms);

  function handleInputValueChange(e) {
    setSearch(e.target.value);
  }

  function initiateSearch() {
    const filteredTerms = filterTerms(known_terms, search);
    setTerms(filterTerms);
  }

  return (
    <div className="known-terms">
      <div>
        <h2>Known Terms</h2>
      </div>
      <PanelStack initialPanel={initialPanel} className="terms-stack" />
    </div>
  );
}

export { KnownTerms };
