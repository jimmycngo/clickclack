import React, { Component } from 'react';
// eslint-disable-next-line no-unused-vars
import { connect, useSelector } from 'react-redux';



  
class TextContainer extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
      super(props);
    }

    render() {
      return(
        <div id='words'>
            {this.props.createText}
        </div>
      );
    }
  
  }
  

export default connect(null, null)(TextContainer);