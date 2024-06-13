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
    <NodeViewWrapper className="counter-component">
      <label>Counter Component</label>

      <div className="content">
        <button type='button' onClick={increase}>
          This button has been clicked {props.node.attrs.count} times.
        </button>
      </div>
    </NodeViewWrapper>
  );
};

export default CounterComponent;