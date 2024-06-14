import React from "react";
import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";

const EditableComponent = ({ editor }) => {
  // console.log("111-EditableComponent", { editor });
  return (
    <NodeViewWrapper className="editable-component">
 
      <div draggable="true" data-drag-handle='' className="label draggable" contentEditable={false}>
        Editable Component
      </div>

      <NodeViewContent className="content" />

    </NodeViewWrapper>
  );
};

export default EditableComponent;
