import React from 'react';
import marked from 'marked';

const renderer = new marked.Renderer();

function Preview(props) {
  return (
    <div id="preview" dangerouslySetInnerHTML={{__html:marked(props.markdown,{renderer:renderer})}}/>
  );
}

export default Preview;