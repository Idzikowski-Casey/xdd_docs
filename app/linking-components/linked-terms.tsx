import React, { useContext } from "react";
import { Tag, NonIdealState, Card } from "@blueprintjs/core";
import { AppContext, appCTX, stateCTX } from "..";
import { DownloadButton } from "./download";

function LinkedTermsTag({ terms, onRemove }) {
  const [term1, term2] = terms;

  return (
    <Tag
      onRemove={onRemove}
      className="link-term-tag"
      large={true}
    >{`[ ${term1}, ${term2} ]`}</Tag>
  );
}

function DefaultFill() {
  let des = "Link terms by dragging a dropping terms into the above bin.";
  return (
    <div className="non-ideal-state">
      <div style={{ marginBottom: "5vh" }} />
      <NonIdealState title="No terms linked" description={des} />
    </div>
  );
}

function LinkedTerms() {
  const { state, runAction } = useContext<appCTX>(AppContext);

  const { linked_terms }: Partial<stateCTX> = state;
  const onRemove = (i) => {
    runAction({ type: "remove_linked_term", payload: { index: i } });
  };

  return (
    <div className="linked-terms">
      <h2>Linked Terms</h2>
      <Card className="linked-terms-container" elevation={1}>
        <div>
          {linked_terms.length == 0 ? (
            <DefaultFill />
          ) : (
            <div>
              {linked_terms.map((terms, i) => {
                return (
                  <li key={i}>
                    <LinkedTermsTag
                      terms={terms}
                      onRemove={() => onRemove(i)}
                    />
                  </li>
                );
              })}
            </div>
          )}
        </div>
        <div>
          <DownloadButton />
        </div>
      </Card>
    </div>
  );
}

export { LinkedTerms };
