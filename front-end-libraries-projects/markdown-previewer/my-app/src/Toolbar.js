import React from 'react';

function Toolbar(props) {
  return (
    <div className='toolbar'>
      {props.text}
      <i onClick={props.onClick} className={props.icon}></i>
    </div>
  );
} 

export default Toolbar;