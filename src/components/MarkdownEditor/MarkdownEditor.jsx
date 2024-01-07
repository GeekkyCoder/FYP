import React, { useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';

const MarkdownEditor = ({ placeholder, setContent, content }) => {
  const editor = useRef(null);

  const config = useMemo(() => {
    return {
      readonly: false, // all options from https://xdsoft.net/jodit/docs/,
      placeholder: placeholder || 'Start typing about your phone...',
      allowResizeYallowResizeY: true,
      uploader: {
        insertImageAsBase64URI: false,
        url: false,
      },
    };
  }, [placeholder]);

  return (
    <JoditEditor
      ref={editor}
      value={content}
      config={config}
      tabIndex={1} // tabIndex of textarea
      onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
    />
  );
};

export default MarkdownEditor;
