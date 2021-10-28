import React, { useContext } from "react";
import { AppContext } from ".";
import "./pages.styl";

function PaperHeading() {
  const { state, runAction } = useContext(AppContext);
  const { paper } = state;
  const { title, url, doi, year, publisher, journal } = paper;

  let onClick = () => {
    window.open(url, "_blank").focus();
  };

  return (
    <div className="paper-meta">
      <div>
        <h2 className="paper-title">{title}</h2>
        <div className="doi">
          <a onClick={onClick}>{doi}</a>
        </div>
        <div className="journal">
          {journal}, {publisher}. {year}
        </div>
      </div>
    </div>
  );
}

export { PaperHeading };
