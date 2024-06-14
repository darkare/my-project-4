/* eslint-disable import/no-anonymous-default-export */
import { NodeViewWrapper } from "@tiptap/react";
import React from "react";


const CounterComponent = (props) => {
  const increase = () => {
    props.updateAttributes({
      count: props.node.attrs.count + 1,
    });
  };

  return (
    <NodeViewWrapper className="counter-component draggable">
      
      {/* <label draggable="true" data-drag-handle="" className="draggable">Counter Component</label> */}
    <div className="draggable" draggable="true" data-drag-handle="">
      <div className="content">
        <button type='button' onClick={increase}>
          This button has been clicked {props.node.attrs.count} times.
        </button>
      </div>
      </div>
    </NodeViewWrapper>
  );
};

export default CounterComponent;