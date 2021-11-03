import React, { useContext } from "react";
import { Tag, NonIdealState, Card } from "@blueprintjs/core";
import { AppContext } from "..";
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
  let des = "Link terms by dragging a dropping terms into the linkage bin";
  return (
    <div className="non-ideal-state">
      <div style={{ marginBottom: "5vh" }} />
      <NonIdealState title="Link terms!" description={des} />
    </div>
  );
}

function LinkedTerms() {
  const { state, runAction } = useContext(AppContext);

  const { linked_terms } = state;
  const onRemove = (i) => {
    runAction({ type: "remove_linked_term", payload: { index: i } });
  };

  return (
    <div>
      <Card className="linked-terms-container" elevation={1}>
        {linked_terms.length == 0 ? (
          <DefaultFill />
        ) : (
          <div>
            {linked_terms.map((terms, i) => {
              return (
                <li key={i}>
                  <LinkedTermsTag terms={terms} onRemove={() => onRemove(i)} />
                </li>
              );
            })}
            <DownloadButton />
          </div>
        )}
      </Card>
    </div>
  );
}

export { LinkedTerms };
