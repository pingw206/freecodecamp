import React from 'react';

function Editor(props) {
  return (
    <textarea id="editor" value={props.markdown} onChange={props.onChange} type="text"/>
  );
} 

export default Editor;