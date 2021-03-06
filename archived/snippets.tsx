import React, { useState, useEffect } from "react";
import BasePage from "../components/base-page";
import dynamic from "next/dynamic";
import "@macrostrat/ui-components/lib/esm/index.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import { InputGroup, Button } from "@blueprintjs/core";
import { useSearchString } from "../components/search";

/* The below async function creates a dynamically-loaded components that
support next.js server-side rendering */

const loadResultView = async function() {
  const mod = await import("../components/snippets-results");
  return mod.ResultView;
};
const ResultView = dynamic(loadResultView, { ssr: false });

export default function SnippetsPage() {
  const [inputValue, setInputValue] = useState("");
  const [searchString, updateSearchString] = useSearchString("/snippets");

  function handleInputValueChange(e) {
    setInputValue(e.target.value);
  }

  function initiateSearch() {
    updateSearchString(inputValue);
  }

  return (
    <BasePage title="Snippets Search" fixedHeader={true}>
      <div className="search-bar">
        <InputGroup
          className="main-search"
          placeholder="Enter a search term"
          leftIcon="search"
          large
          value={inputValue}
          onChange={handleInputValueChange}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              initiateSearch();
            }
          }}
        />

        <Button
          icon="arrow-right"
          large
          onClick={() => {
            initiateSearch();
          }}
        />
      </div>
      <div>
        <ResultView searchString={searchString} />
      </div>
    </BasePage>
  );
}
