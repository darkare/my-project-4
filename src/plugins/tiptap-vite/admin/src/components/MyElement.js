import { LitElement, html } from 'lit';
import StarterKit from '@tiptap/starter-kit';
import BubbleMenu from '@tiptap/extension-bubble-menu'
import { Editor } from '@tiptap/core';

export class MyElement extends LitElement {
  static properties = {
    _editor: {state: true},
    text: { type: String },
    view : { type: Object},
    editor : { type: Object},
    node : { type: Object},
    getPos : { type: Function},
  }

  firstUpdated() { 
    this._editor =  new Editor({
      element: this.renderRoot.querySelector('.tiptap-element'),
      extensions: [
        StarterKit,
        BubbleMenu.configure({
          element: this.renderRoot.querySelector('.bubble-menu'),
        }), 
      ],
      onUpdate: () => { 
        this.node.attrs.text = this._editor.getJSON().content
      },
      content: this.text
    });
  } 

  render() {
    return html`
      <div style="border: 4px solid orange; padding: 1em;">
        <p>HERE is the lit element can't edit this (not in editor)</p>
        <div class="tiptap-element"></div> 
      </div>
      <div class="bubble-menu">
         <button @click="${() => this._editor.chain().focus().toggleBold().run()}">
          Bold
        </button>
      </div>
    `;
  }

}
customElements.define('my-element', MyElement);
