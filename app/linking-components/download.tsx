import React, { useContext } from "react";
import { Button } from "@blueprintjs/core";
import { AppContext } from "..";

function downloadObjectAsCSV(exportObj, exportName) {
  let csvContent =
    "data:text/csv;charset=utf-8," +
    exportObj.map((e) => e.join(",")).join("\n");
  var downloadAnchorNode = document.createElement("a");
  downloadAnchorNode.setAttribute("href", csvContent);
  downloadAnchorNode.setAttribute("download", exportName + ".csv");
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

function DownloadButton() {
  const { state } = useContext(AppContext);
  const { linked_terms } = state;

  const onClick = () => {
    if (linked_terms.length > 0) {
      let today = new Date().toISOString();
      downloadObjectAsCSV(linked_terms, `linked-terms-${today}`);
    }
  };

  return (
    <Button
      icon="download"
      onClick={onClick}
      intent="primary"
      style={{ borderRadius: "20px", marginTop: "10px" }}
      disabled={linked_terms.length == 0}
    >
      Download
    </Button>
  );
}

export { DownloadButton };
