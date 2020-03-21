import React from 'react';

const Toolbar = (props) => {
  return (
    <div className="toolbar">
      <i title="no-stack-dub-sack"/>      
      {props.text}
      <i onClick={props.onClick} className={props.icon}></i>
    </div>
 )
}
  export default Toolbar;