// import Editor from "./editor/advanced-editor";

import React, { useState, useRef, useEffect } from "react";
import { defaultValue } from "../../../default-value";
import SimpleEditor from "./../components/editor/SimpleEditor";
import {
  EditorCommand,
  EditorCommandEmpty,
  EditorContent,
  EditorRoot,
} from "novel";
import { defaultExtensions } from "./editor/extensions";
import { useDebounceCallback } from "usehooks-ts";
import { Box, Typography } from "@strapi/design-system";
const NovelEditor = ({ onChange, name, value }) => {

  
  const [content, setContent] = useState( value? JSON.parse(value): defaultValue);

  useEffect(() => {
    console.log("111-10-useEffect", { name, content });
    onChange({ target: { name, value: JSON.stringify(content) } });
  }, [content, name, onChange]);

  // const handleChange = useRef((value) => {
  //   console.log("111-11", value);
  //   setContent(value);
  // });
  const debouncedUpdates = useDebounceCallback(async (editor) => {
    const json = editor.getJSON();
    console.log("111-12", json);
    setContent(json);
    // setSaveStatus("Saved");
  }, 500);

  return (
    <React.Fragment>
      <EditorRoot>
        <EditorContent
          initialContent={content}
          extensions={defaultExtensions}
          onUpdate={({ editor }) => {
            //   console.log(editor.getJSON());
            debouncedUpdates(editor);
          }}
        >
          <EditorCommand className="z-50 h-auto max-h-[330px] overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all">
            <EditorCommandEmpty className="px-2 text-muted-foreground">
              No results
            </EditorCommandEmpty>
          </EditorCommand>
        </EditorContent>
      </EditorRoot>
      {/* <SimpleEditor initialValue={content} onChange={handleChange} /> */}
    </React.Fragment>
    // <React.Fragment>
    //   <EditorRoot>
    //     <EditorContent
    //       initialContent={content}
    //       extensions={defaultExtensions}
    //       onUpdate={({ editor }) => {
    //         debouncedUpdates(editor);
    //       }}
    //     >
    //       <Box
    //         style={{
    //           zIndex: 50,
    //           maxHeight: "330px",
    //           overflowY: "auto",
    //           borderRadius: 6, // equivalent to 'rounded-md' in Tailwind
    //           border: "1px solid #D1D5DB", // replace #D1D5DB with the color for 'border-muted'
    //           backgroundColor: "#F3F4F6", // replace #F3F4F6 with the color for 'bg-background'
    //           padding: "16px 4px", // equivalent to 'py-2 px-1' in Tailwind
    //           boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)", // equivalent to 'shadow-md' in Tailwind
    //           transition: "all 0.2s ease-in-out", // equivalent to 'transition-all' in Tailwind
    //         }}
    //       >
    //         <Typography variant="body" textColor="neutral600" paddingLeft={2}>
    //           No results
    //         </Typography>
    //       </Box>
    //     </EditorContent>
    //   </EditorRoot>
    // </React.Fragment>
  );
};

export default NovelEditor;
