import { mergeAttributes, Node } from '@tiptap/core';
import { MyElement } from './MyElement';

export const CustomText = Node.create({
  name: 'nodeView',
  group: "block",
  content: "block+",
  draggable: true,
  isolating: true,


  addAttributes() {
    return {
      text: {
        default: 'This text is passed from the editor to lit-element lorem ipsum dolor sit amet.',
      },
    };
  },
  parseHTML() {
    return [
      {
        tag: 'node-view',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['node-view', mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return ({ editor, node, getPos }) => {
      const { view } = editor;

      const dom = document.createElement('div');
      dom.classList.add('node-view');
      const content = document.createElement('div');
      content.classList.add('content');
      const myElement = document.createElement('my-element');
      myElement.text = node.attrs.text;
      myElement.view = view;
      myElement.editor = editor;
      myElement.node = node;
      myElement.getPos = getPos;

      dom.append(myElement);

      return {
        dom,
      };
    };
  }
});
