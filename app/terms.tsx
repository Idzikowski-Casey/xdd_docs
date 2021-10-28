import React, { useContext, useEffect, useState } from "react";
import { Tag, Collapse, Button, Icon } from "@blueprintjs/core";
import { AppContext } from ".";
import { DndChild } from "./linking-components";
import "./pages.styl";

/**
 * Reinventing the CollapsePanel from ui-components b/c
 * of strange next.js errors
 * @param param0
 * @returns Collapse
 */
function CollapsePanel({ isOpen = false, title, ...rest }) {
  const [open, setOpen] = useState(isOpen);

  const icon = !open ? "chevron-right" : "chevron-down";
  const onClick = () => {
    setOpen(!open);
  };

  const styles = {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
  };

  return (
    <div className="">
      <Button
        onClick={onClick}
        minimal={true}
        rightIcon={icon}
        style={{
          ...styles,
        }}
        className="button-text"
      >
        <p>{title}</p>
      </Button>
      <Collapse isOpen={open}>{rest.children}</Collapse>
    </div>
  );
}

export function TermCard(props) {
  const { runAction } = useContext(AppContext);
  const { term, onRemove = undefined } = props;

  const onClick = () => {
    console.log(term);
    runAction({ type: "set_snippet_term", payload: { snippet_term: term } });
  };

  return (
    <DndChild id={`drag-child-${term}`} data={term} style={{ width: "100%" }}>
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

function TermCollapse(props) {
  const { termCategory } = props;

  const categoryName = Object.keys(termCategory)[0];
  const terms = termCategory[categoryName];

  return (
    <CollapsePanel title={categoryName}>
      <div className="list-container">
        <div className="list collapse-body">
          {terms.map((term, i) => {
            return <TermCard term={term} key={i} />;
          })}
        </div>
      </div>
    </CollapsePanel>
  );
}

function KnownTerms() {
  const { state, runAction } = useContext(AppContext);
  const { known_terms } = state;

  return (
    <div className="known-terms">
      <h2>Known Terms</h2>
      <div className="known-terms-list">
        {Object.entries(known_terms).map(([key, value], i) => {
          let termCategory = { [key]: value };
          return <TermCollapse key={i} termCategory={termCategory} />;
        })}
      </div>
    </div>
  );
}

export { KnownTerms };
