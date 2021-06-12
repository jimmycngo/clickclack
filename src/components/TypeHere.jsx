import React from 'react';

const TypeHere = props => (
  <div>
    <textarea 
    id='inputbox' 
    spellCheck='false' 
    autoFocus={true} onBlur={({ target }) => target.focus()}
    onChange= {
      (e) =>{
        props.currentText(e.target.value);
        console.log(e.nativeEvent.data);
        if (e.nativeEvent.data === null) {
          props.deleteText()
        }
      }
    }

    ></textarea>
  </div>
);

export default TypeHere;