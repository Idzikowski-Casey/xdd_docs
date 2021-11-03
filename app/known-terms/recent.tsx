import React, { useContext } from "react";
import { TermCard } from ".";
import { AppContext, appCTX, stateCTX } from "..";
import { Callout, Card } from "@blueprintjs/core";

function NoRecentTerms() {
  return (
    <Callout style={{ width: "100%" }} title="No recent terms">
      This area populates with recent terms used in the snippets search on the
      right.
    </Callout>
  );
}

function RecentTerms() {
  const { state } = useContext<appCTX>(AppContext);
  const { recent_terms: terms }: Partial<stateCTX> = state;

  return (
    <Card className="recent-terms-container" elevation={1}>
      {terms.length > 0 ? (
        terms.map((term, i) => {
          return <TermCard term={term} key={i} width="33%" />;
        })
      ) : (
        <NoRecentTerms />
      )}
    </Card>
  );
}

export { RecentTerms };
