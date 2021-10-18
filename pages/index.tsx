import React, { useState } from "react";
import { useSearchString } from "../components/search";
import { InputGroup, Button, Card, Icon } from "@blueprintjs/core";
import axios from "axios";
import "./pages.styl";

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

function PubCard({ pub }) {
  const { title, journal, author, identifier, ...rest } = pub;
  const doi = extractDoi(identifier);

  const onClick = () => {
    console.log(rest);
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

function LandingSearch() {
  const [inputValue, setInputValue] = useState("");
  const [searchString, setSearchString] = useSearchString("/");
  const [data, setData] = useState([]);

  console.log(data);

  function handleInputValueChange(e) {
    setInputValue(e.target.value);
  }

  async function initiateSearch() {
    setSearchString(inputValue);
    const data = await get(inputValue);
    if (data["success"]) {
      setData(data["success"]["data"]);
    }
  }

  return (
    <div className="landing-search">
      <h1 className="xdd-title">xDD</h1>
      <h4 className="xdd-subtitle">
        A Digitial assistant to extract knowledge from the published literature
      </h4>
      <InputGroup
        style={{ borderRadius: "20px" }}
        placeholder="Enter a search term"
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
      <div className="list-container">
        <ul className="list">
          {data.length > 1
            ? data.map((pub, i) => {
                return (
                  <li>
                    <PubCard key={i} pub={pub} />
                  </li>
                );
              })
            : null}
        </ul>
      </div>
    </div>
  );
}

export default LandingSearch;
