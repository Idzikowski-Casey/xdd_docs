import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";

import {
  LandingSearch,
  SearchBar,
  ListRenderer,
  PubCard,
  extractDoi,
  isTitle,
} from "../app/search";

let pub = {
  type: "fulltext",
  _gddid: "5904727acf58f132d5940949",
  title: "Rocks are the Keys to Their Hearts!",
  volume: "39",
  journal: "Rocks & Minerals",
  link: [
    {
      url:
        "https://www.tandfonline.com/doi/full/10.1080/00357529.1964.11765992",
      type: "publisher",
    },
  ],
  publisher: "Taylor and Francis",
  author: [],
  pages: "235--292",
  number: "5-6",
  identifier: [
    {
      type: "doi",
      id: "10.1080/00357529.1964.11765992",
    },
  ],
  year: "1964",
};

afterEach(cleanup);

describe("Search Page", () => {
  it("renders without crash", () => {
    render(<LandingSearch />);
  });
  it("isTitle function works", () => {
    expect(isTitle(pub.title)).toBe(true);
    expect(isTitle(extractDoi(pub.identifier))).toBe(false);
  });
});

describe("Search Bar Component", () => {
  it("renders without crashing", () => {
    render(<SearchBar />);
  });
});

describe("ListRenderer Component", () => {
  const nullData = null;
  const noData = [];
  const data = [{ ...pub }];
  it("renders wihtout crashing", () => {
    const { unmount } = render(<ListRenderer data={nullData} />);
    unmount();
    render(<ListRenderer data={noData} />);
    unmount();
    render(<ListRenderer data={data} />);
    unmount();
  });
  it("output correct based on data state", () => {
    const { unmount, getByTestId, getByText } = render(
      <ListRenderer data={nullData} />
    );
    // data null: look for DefaultCallout
    expect(getByTestId("default-callout")).toBeInTheDocument();
    unmount();
    render(<ListRenderer data={noData} />);
    expect(getByTestId("no-results-callout")).toBeInTheDocument();
    unmount();
    render(<ListRenderer data={data} />);
    expect(getByText(pub.title)).toBeInTheDocument();
  });
});

describe("PubCard Component", () => {
  it("renders without crashing", () => {
    render(<PubCard pub={pub} />).unmount();
  });
  it("contains the correct information", () => {
    const utils = render(<PubCard pub={pub} />);
    expect(utils.getByText(pub.title)).toBeInTheDocument();
    expect(utils.getByText(pub.journal)).toBeInTheDocument();
    expect(utils.getByText(extractDoi(pub.identifier))).toBeInTheDocument();
    utils.unmount();
  });
});
