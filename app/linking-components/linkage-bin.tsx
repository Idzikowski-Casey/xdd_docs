import { Button, NonIdealState } from "@blueprintjs/core";
import React, { useState, useContext } from "react";
import { TermCard } from "../terms";
import { DndContainer } from "./drag";
import { AppContext } from "..";
import "./module.styl";

function DefaultFill() {
  return <NonIdealState icon="archive" title="Drag and drop terms" />;
}

/**
 * Bin for dropping in terms
 * @returns droppable bin
 */
function LinkageBin() {
  const { state, runAction } = useContext(AppContext);
  const [terms, setTerms] = useState([]);

  const onDrop = (data) => {
    if (terms.length < 2) {
      let newTerms = [...terms, data];
      setTerms(newTerms);
    }
  };

  const onLink = () => {
    runAction({ type: "set_linked_terms", payload: { linked_terms: terms } });
    setTerms([]);
  };

  const removeTerm = (i) => {
    let terms_ = [...terms];
    let newTerms = terms_.filter((term, index) => index != i);
    setTerms(newTerms);
  };

  const props = { onDrop, id: "terms-container" };
  return (
    <div>
      <h1>Linkage Bin</h1>
      <DndContainer {...props}>
        <div className="linkage-bin">
          <div className="link-terms">
            {terms.length == 0 ? (
              <DefaultFill />
            ) : (
              terms.map((term, i) => {
                return (
                  <TermCard
                    term={term}
                    key={i}
                    onRemove={() => removeTerm(i)}
                  />
                );
              })
            )}
          </div>
          <div className="link-btn">
            <Button
              intent="success"
              disabled={terms.length != 2}
              style={{ borderRadius: "20px" }}
              onClick={onLink}
            >
              Link these terms
            </Button>
          </div>
        </div>
      </DndContainer>
    </div>
  );
}

export { LinkageBin };
