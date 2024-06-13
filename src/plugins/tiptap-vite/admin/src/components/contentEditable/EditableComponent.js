import React from 'react'
import { NodeViewWrapper, NodeViewContent } from '@tiptap/react'

const EditableComponent = () => {
  return (
    <NodeViewWrapper className="editable-component">
      <span className="label" contentEditable={false}>Editable Component</span>

      <NodeViewContent className="content" />
    </NodeViewWrapper>
  )
}

export default EditableComponent;