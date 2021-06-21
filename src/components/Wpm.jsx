import React from 'react';

const Wpm = props => (
  <div id='wpm'>
    <div id='statdescription'>
        total time
        <div id='statvalue'>{`${props.stats[0]}s`}</div>
    </div>
      
    <div id='statdescription'>
        gross wpm
        <div id='statvalue'>{props.stats[1]}</div>
    </div>

    <div id='statdescription'>
        net wpm      
        <div id='statvalue'>{props.stats[2]}</div>
    </div>

    <div id='statdescription'>
        accuracy      
        <div id='statvalue'>{`${props.stats[3]}%`}</div>
    </div>

  </div>
);
export default Wpm;