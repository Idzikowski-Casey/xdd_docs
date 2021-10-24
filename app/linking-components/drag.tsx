import React from "react";
import "./module.styl";

export function DndContainer(props) {
  const {
    children,
    onDrop = (data) => console.log(data),
    id,
    data_id = "child_id",
  } = props;

  const drop = (e) => {
    e.preventDefault();
    const child = JSON.parse(e.dataTransfer.getData(data_id));

    onDrop(child, id);
  };

  const dragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div id={id} onDrop={drop} onDragOver={dragOver}>
      {children}
    </div>
  );
}

export function DndChild(props) {
  const { children, id, data, draggable = true, data_id = "child_id" } = props;

  const dragStart = (e) => {
    const target = e.target;
    const d = JSON.stringify(data);
    e.dataTransfer.setData(data_id, d);
  };

  const dragOver = (e) => {
    e.stopPropagation();
  };

  const dragProps = draggable
    ? { id, onDragStart: dragStart, onDragOver: dragOver, draggable }
    : {};

  return (
    <div {...dragProps} className="drag-child">
      {children}
    </div>
  );
}
