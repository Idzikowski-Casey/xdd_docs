import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";

import LandingPage from "../pages/index";
import { LandingSearch } from "../app/search";
import { LinkingPage } from "../app/linking-page";

/// Large Scale page testing

//afterEach(cleanup);
describe("landing-page", () => {
  it("renders without crashing", () => {
    render(<LandingPage />);
  });
});

describe("paper search", () => {
  it("renders without crashing", () => {
    render(<LandingSearch />);
  });
  it("contains expected content", () => {
    const { container, getByText, getByPlaceholderText } = render(
      <LandingSearch />
    );

    expect(getByText("xDD")).toBeInTheDocument();
    expect(
      getByPlaceholderText("Search by term, phrase, or DOI")
    ).toBeInTheDocument();
  });
  it("search input working", () => {
    const { getByPlaceholderText } = render(<LandingSearch />);
    const input = getByPlaceholderText("Search by term, phrase, or DOI");
    fireEvent.change(input, { target: { value: "rocks are" } });
    expect(input.value).toBe("rocks are");
  });
});

describe("linkage-page", () => {
  it("renders without crashing", () => {
    render(<LinkingPage />);
  });
});
