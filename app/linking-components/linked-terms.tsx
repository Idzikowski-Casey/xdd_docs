import React, { useContext } from "react";
import { Tag, NonIdealState } from "@blueprintjs/core";
import { AppContext } from "..";

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
  let des =
    "Link terms by dragging a dropping terms into the above linkage bin";
  return (
    <div className="non-ideal-state">
      <NonIdealState
        icon="arrow-up"
        title="Link terms above!"
        description={des}
      />
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
      <h1>Linked Terms</h1>
      <div className="linked-terms-container">
        {linked_terms.length == 0 ? (
          <DefaultFill />
        ) : (
          linked_terms.map((terms, i) => {
            return (
              <li key={i}>
                <LinkedTermsTag terms={terms} onRemove={() => onRemove(i)} />
              </li>
            );
          })
        )}
      </div>
    </div>
  );
}

export { LinkedTerms };
