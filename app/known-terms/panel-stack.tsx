import React, { useState } from "react";
import { Card, PanelStack2, PanelStack2Props } from "@blueprintjs/core";

function PanelStack(props) {
  const [currentStack, setCurrentStack] = useState<Array<any>>([
    props.initialPanel,
  ]);

  const addToPanelStack = React.useCallback(
    (newPanel) => setCurrentStack((stack) => [...stack, newPanel]),
    []
  );
  const removeFromPanelStack = React.useCallback(
    () => setCurrentStack((stack) => stack.slice(0, -1)),
    []
  );

  return (
    <Card style={{ margin: "0", padding: "0" }}>
      <PanelStack2
        className={props.className}
        onOpen={addToPanelStack}
        onClose={removeFromPanelStack}
        renderActivePanelOnly={true}
        showPanelHeader={true}
        stack={currentStack}
      />
    </Card>
  );
}

export { PanelStack };
