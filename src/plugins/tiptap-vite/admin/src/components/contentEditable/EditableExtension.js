import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'

import EditableComponent from './EditableComponent'

const EditableExtension =  Node.create({
  name: 'editableExtension',
  group: 'block',
  content: 'inline*',

  parseHTML() {
    return [
      {
        tag: 'editable-component',
      },
    ]
  },

  addKeyboardShortcuts() {
    return {
      'Mod-Enter': () => {
        return this.editor.chain().insertContentAt(this.editor.state.selection.head, { type: this.type.name }).focus().run()
      },
    }
  },

  renderHTML({ HTMLAttributes }) {
    return ['react-component', mergeAttributes(HTMLAttributes), 0]
  },

  addNodeView() {
    return ReactNodeViewRenderer(EditableComponent)
  },
})

export default EditableExtension;