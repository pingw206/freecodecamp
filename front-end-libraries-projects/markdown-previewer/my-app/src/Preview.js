import React from 'react';
import marked from 'marked';

const renderer = new marked.Renderer();
marked.setOptions({
  breaks: true,
}); 
//处理自动分行
// renderer.link = function (href, title, text) {
//   return `<a target="_blank" href="${href}">${text}</a>`;
// }
function Preview(props) {
  return (
    <div id="preview" dangerouslySetInnerHTML={{__html:marked(props.markdown,{renderer:renderer})}}/>
  );
}

export default Preview;