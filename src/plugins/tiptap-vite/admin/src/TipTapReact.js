import "./tiptap.css";

import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import {
  EditorProvider,
  EditorContent,
  useEditor,
  BubbleMenu,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect, useState } from "react";
import Bold from "@tiptap/extension-bold";
import MenuBar from "./MenuBar";
import CounterExtension from "./components/counter/CounterExtension";
import EditableExtension from "./components/contentEditable/EditableExtension";
const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
  CounterExtension,
  EditableExtension,
];

const DEFAULT_CONTENT = `
<h2>
  Hi there,
</h2>
<editable-component>
    <p>This is editable. You can create a new component by pressing Mod+Enter.</p>
</editable-component>
<counter-component count="6"></counter-component>
<p>
  this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
</p>
<ul>
  <li>
    That’s a bullet list with one …
  </li>
  <li>
    … or two list items.
  </li>
</ul>
<p>
  Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
</p>
<pre><code class="language-css">body {
display: none;
}</code></pre>
<p>
  I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
</p>
<blockquote>
  Wow, that’s amazing. Good work, boy! 👏
  <br />
  — Mom
</blockquote>
`;

const TiptapReact = ({ onChange, name, value }) => {
  const [content, setContent] = useState({});
  const editor = useEditor({
    extensions: [StarterKit, CounterExtension, EditableExtension, Bold],
    content: `
    <p>
      This is still the text editor you’re used to, but enriched with node views.
    </p>
    <counter-component count="6"></counter-component>
    <p>
      Did you see that? That’s a React component. We are really living in the future.
    </p>
    <editable-component>
      <p>This is editable. You can create a new component by pressing Mod+Enter.</p>
    </editable-component>
    <p>
      Did you see that? That’s a React component. We are really living in the future.
    </p>
    `,
  });
  useEffect(() => {
    return () => {
      if (editor) {
        editor.destroy();
      }
    };
  }, [editor]);
  return (
    <>
      <EditorContent editor={editor} />
      <BubbleMenu editor={editor}>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor?.isActive("bold") ? "is-active" : ""}
        >
          Bold
        </button>
      </BubbleMenu>
    </>
  );
};

export default TiptapReact;
