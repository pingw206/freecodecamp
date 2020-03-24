import React from 'react';
import marked from 'marked';

marked.setOptions({
  breaks: true,
}); 
// If true, add <br> on a single line break 



const rendererMy = new marked.Renderer();
rendererMy.link = function (href, title, text) {
  return `<a target="_blank" href="${href}">${text}</a>`;
}
//反引号 ``是ES6语法中用来拼接字符串和变量的--模板字符串
//link没发现有什么用？？？

const Preview = (props) => {
  return (
      <div id='preview' dangerouslySetInnerHTML={{__html: marked(props.markdown, { renderer: rendererMy })}} />
    )
}
//renderer自定义渲染内容，并把之前的规则设置覆盖掉;这里是覆盖掉的是props.markdown 
//dangerouslySetInnerHTML通过传递包含key为__html的对象来设置HTML 


export default Preview;