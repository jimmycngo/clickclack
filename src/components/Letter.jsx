import React from 'react';

const Letter = props => (
  <div id={props.spot}>
    {props.displayText}
  </div>
);

export default Letter;