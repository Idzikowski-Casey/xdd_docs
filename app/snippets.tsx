import React, { useState, useContext, useEffect } from "react";
import { AppContext } from ".";
import axios from "axios";
import { SearchBar } from "./search";
import { Card, Callout, Spinner, Button } from "@blueprintjs/core";

const route = "https://xdd.wisc.edu/api/snippets";

export function NoResults() {
  return (
    <Callout intent="danger" title="No Results">{`Looks like there are no 
  snippets associated with term searched. Try another term by either clicking on a known term or typing one
  in yourself.`}</Callout>
  );
}

export function DefaultCallout({ title, description }) {
  return (
    <Callout intent="primary" title={title}>
      {description}
    </Callout>
  );
}

function NewTermCallout({ term, onClick }) {
  return (
    <Callout intent="success" title="New term?">
      It looks like you've entered a new term not in the known term set! Would
      you like to add <b>{term}</b> to the set?{" "}
      <Button intent="success" onClick={onClick}>
        Add {term}
      </Button>
    </Callout>
  );
}

const Highlight = ({ highlight }) => {
  return (
    <Card className="snippet-card">
      <li dangerouslySetInnerHTML={{ __html: highlight }} />;
    </Card>
  );
};

const ListRenderer = ({ highlights, term }) => {
  const { state, runAction } = useContext(AppContext);
  let description =
    "Keyword search through the paper and see in context where the entered term is mentioned";
  if (highlights == null)
    return (
      <DefaultCallout
        title="Search paper snippets by term"
        description={description}
      />
    );

  const isNewTerm = !isKnownTerm(term, state.known_terms);

  if (highlights.length == 0) return <NoResults />;
  console.log(`Is ${term} new?`, isNewTerm);

  const onClick = () => {
    runAction({ type: "add_new_term", payload: { snippet_term: term } });
  };

  return (
    <ul className="list">
      {isNewTerm ? <NewTermCallout term={term} onClick={onClick} /> : null}
      {highlights.map((highlight, index) => {
        return <Highlight highlight={highlight} key={index} />;
      })}
    </ul>
  );
};

async function getSnippets(props) {
  const res = await axios.get(route, {
    params: { docid: props.docid, term: props.snippets_term },
  });
  let highlight = [];
  if (res.data.success) {
    res.data.success.data.map((dat) => {
      highlight = [...highlight, ...dat.highlight];
    });
  }
  return highlight;
}

const isKnownTerm = (term, knownTerms) => {
  let terms_ = Object.values(knownTerms);
  let terms = [];
  terms_.map((termss) => {
    terms = [...terms, ...termss];
  });
  console.log(terms);
  terms = terms.map((term) => term.toLowerCase());
  term = term.toLowerCase();

  return terms.includes(term);
};

function PageSnippets() {
  const { state, runAction } = useContext(AppContext);
  const { docid, snippet_term } = state;
  const [loading, setLoading] = useState(false);
  const [term, setTerm] = useState(snippet_term);
  const [snippets, setSnippets] = useState(null);

  const onClick = async (snippets_term = term) => {
    setLoading(true);
    let data = await getSnippets({ docid, snippets_term });
    setSnippets(data);
    setLoading(false);
  };

  useEffect(() => {
    if (snippet_term.length > 0) {
      setTerm(snippet_term);
      onClick(snippet_term);
    }
  }, [snippet_term]);

  const onChange = (e) => {
    setTerm(e.target.value);
  };

  return (
    <div className="snippets-container">
      <h1 style={{ marginBottom: "5px" }}>Paper Snippets</h1>
      <SearchBar
        initiateSearch={onClick}
        inputValue={term}
        placeholder="Search paper snippets by term"
        handleInputValueChange={onChange}
      />
      <div className="list-container short">
        {loading ? (
          <Spinner />
        ) : (
          <ListRenderer highlights={snippets} term={term} />
        )}
      </div>
    </div>
  );
}

export { PageSnippets };
