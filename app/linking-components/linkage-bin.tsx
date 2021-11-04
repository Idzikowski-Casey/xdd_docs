import { Button, Card, NonIdealState } from "@blueprintjs/core";
import React, { useState, useContext } from "react";
import { TermCard } from "../known-terms/terms";
import { DndContainer } from "./drag";
import { AppContext, appCTX } from "..";

function DefaultFill() {
  let title = `Drag and drop terms to link`;
  let des = `To link terms, drag 2 links into this bin from known or recent
              terms.`;
  return (
    <div style={{ marginTop: "30px" }} className="non-ideal-state">
      <NonIdealState icon="archive" title={title} description={des} />
    </div>
  );
}

/**
 * Bin for dropping in terms
 * @returns droppable bin
 */
function LinkageBin() {
  const { runAction } = useContext<appCTX>(AppContext);
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
      <h2>Linkage Bin</h2>
      <DndContainer {...props}>
        <Card className="linkage-bin" elevation={1}>
          <div>
            {terms.length == 0 ? (
              <DefaultFill />
            ) : (
              <div className="link-terms">
                {terms.map((term, i) => {
                  return (
                    <TermCard
                      term={term}
                      key={i}
                      snippet={false}
                      onRemove={() => removeTerm(i)}
                      width="100%"
                    />
                  );
                })}
              </div>
            )}
          </div>
          <div>
            <Button
              intent="success"
              disabled={terms.length != 2}
              style={{ borderRadius: "20px", margin: "10px" }}
              onClick={onLink}
            >
              Link these terms
            </Button>
          </div>
        </Card>
      </DndContainer>
    </div>
  );
}

export { LinkageBin };
