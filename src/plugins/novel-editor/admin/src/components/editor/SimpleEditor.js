"use client";

import { EditorCommand, EditorCommandEmpty, EditorContent, EditorRoot } from "novel";
import { useEffect, useState } from "react";
import { useDebounceCallback } from "usehooks-ts";
import { defaultExtensions } from "./extensions";

const SimpleEditor = ( initialValue, onChange) => {
    
  const [content, setContent] = useState(initialValue);
  const [saveStatus, setSaveStatus] = useState("");

  console.log('333-110', onChange);
  useEffect(() => {
    onChange('hello from simpleEditor')
  }, [initialValue, onChange]);


  const debouncedUpdates = useDebounceCallback(async (editor) => {
    const json = editor.getJSON();
    console.log('333-11', json)
    onChange(json);
    setSaveStatus("Saved");
  }, 500);

  return (
    <EditorRoot>
      <EditorContent
        initialContent={content}
        extensions={defaultExtensions}
        onUpdate={({ editor }) => {
        //   console.log(editor.getJSON());
            debouncedUpdates(editor)
        }}
      >
        <EditorCommand className="z-50 h-auto max-h-[330px] overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all">
          <EditorCommandEmpty className="px-2 text-muted-foreground">No results</EditorCommandEmpty>
        </EditorCommand>
      </EditorContent>
    </EditorRoot>
  );
};
export default SimpleEditor;
//onUpdate or onTransaction