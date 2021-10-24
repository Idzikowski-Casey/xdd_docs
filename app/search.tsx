import React, { useState, useContext } from "react";
import { InputGroup, Button, Card, Icon, Spinner } from "@blueprintjs/core";
import axios from "axios";
import { NoResults, DefaultCallout } from "./snippets";
import "./pages.styl";
import { AppContext } from ".";

function extractDoi(identifier) {
  let doi: string;
  identifier.map((obj) => {
    if (obj["type"] == "doi") {
      doi = obj["id"];
    }
  });
  return doi;
}

function Authors(props) {
  const { authorList } = props;
  return (
    <div className="author-container">
      {authorList.map((author, i) => {
        return (
          <div key={i} className="author">
            {author["name"]}
          </div>
        );
      })}
    </div>
  );
}

function SearchBar(props) {
  const {
    inputValue,
    initiateSearch,
    handleInputValueChange,
    placeholder = "Enter a search term",
  } = props;
  return (
    <InputGroup
      style={{ borderRadius: "20px" }}
      placeholder={placeholder}
      leftIcon="search"
      fill={true}
      value={inputValue}
      rightElement={<RightElement onClick={initiateSearch} />}
      onChange={handleInputValueChange}
      onKeyPress={(event) => {
        if (event.key === "Enter") {
          initiateSearch();
        }
      }}
    />
  );
}

function PubCard({ pub }) {
  const { title, journal, author, identifier, ...rest } = pub;
  const { state, runAction } = useContext(AppContext);
  const doi = extractDoi(identifier);

  const onClick = () => {
    let docid = rest._gddid;
    runAction({ type: "set_paper_title", payload: { paper_title: title } });
    runAction({ type: "set_docid", payload: { docid } });
  };

  return (
    <Card className="pubcard" onClick={onClick} interactive={true}>
      <Icon icon="book" style={{ marginTop: "5px", marginRight: "5px" }} />
      <div className="pub-info">
        <div className="pub-title">{title}</div>
        {/* <Authors authorList={author} /> */}
        <div className="doi">{doi}</div>
        <div className="journal">{journal}</div>
      </div>
    </Card>
  );
}

function RightElement({ onClick }) {
  return (
    <Button
      minimal={true}
      icon="arrow-right"
      onClick={onClick}
      style={{ borderTopRightRadius: "20px", borderBottomRightRadius: "20px" }}
    />
  );
}

async function get(searchString) {
  let route = `https://xdd.wisc.edu/api/articles`;
  const res = await axios.get(route, {
    params: { title_like: searchString, max: 20 },
  });
  return res["data"];
}

function ListRenderer({ data }) {
  let title = "Search publications";
  let des =
    "Search the xDD database for a publication to get started. Simply type key words or phrases";
  if (data == null) return <DefaultCallout title={title} description={des} />;
  if (data.length == 0) return <NoResults />;
  return (
    <ul className="list">
      {data.length > 1
        ? data.map((pub, i) => {
            return (
              <li key={i}>
                <PubCard key={i} pub={pub} />
              </li>
            );
          })
        : null}
    </ul>
  );
}

function LandingSearch() {
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleInputValueChange(e) {
    setInputValue(e.target.value);
  }

  async function initiateSearch() {
    if (inputValue.length > 0) {
      setLoading(true);
      const data = await get(inputValue);
      if (data["success"]) {
        setData(data["success"]["data"]);
        setLoading(false);
      }
    } else {
      setData(null);
    }
  }

  return (
    <div className="landing-search">
      <h1 className="xdd-title">xDD</h1>
      <h4 className="xdd-subtitle">
        A Digitial assistant to extract knowledge from the published literature
      </h4>
      <SearchBar
        initiateSearch={initiateSearch}
        inputValue={inputValue}
        handleInputValueChange={handleInputValueChange}
      />
      <div className="list-container tall">
        {loading ? <Spinner /> : <ListRenderer data={data} />}
      </div>
    </div>
  );
}

export { LandingSearch, SearchBar };