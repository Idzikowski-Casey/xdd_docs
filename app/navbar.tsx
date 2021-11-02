import React, { useContext } from "react";
import { Button, Navbar } from "@blueprintjs/core";
import { Tooltip2 } from "@blueprintjs/popover2";
import { AppContext } from ".";
import "./pages.styl";

function BackArrow() {
  const { state, runAction } = useContext(AppContext);

  console.log(state);

  const onClick = () => {
    runAction({ type: "set_docid", payload: { docid: "" } });
    runAction({ type: "reset_state" });
  };

  return (
    <Button icon="arrow-left" onClick={onClick} minimal={true}>
      Return to Search
    </Button>
  );
}

function LinkPageNavbar() {
  const { state, runAction } = useContext(AppContext);
  const { paper, docid } = state;
  const { title, url, doi, year, publisher, journal } = paper;

  let onClick = () => {
    window.open(url, "_blank").focus();
  };
  let onClickXdd = () => {
    let xdd_route: string = `https://xdd.wisc.edu/api/articles?docid=${docid}&known_terms=true`;
    window.open(xdd_route, "_bank").focus();
  };

  return (
    <Navbar style={{ position: "fixed", top: "0" }}>
      <div style={{ width: "95vw" }}>
        <Navbar.Group align="left">
          <BackArrow />
          <Navbar.Divider />
        </Navbar.Group>
        <Navbar.Group>
          <h2 className="paper-title">{title}</h2>
        </Navbar.Group>
        <Navbar.Group align="right">
          <Tooltip2 content="Publisher page">
            <Button onClick={onClick} minimal={true} icon="book" />
          </Tooltip2>
          <Tooltip2 content="xDD route">
            <Button onClick={onClickXdd} minimal={true}>
              xDD
            </Button>
          </Tooltip2>
        </Navbar.Group>
      </div>
    </Navbar>
  );
}

export { LinkPageNavbar };
