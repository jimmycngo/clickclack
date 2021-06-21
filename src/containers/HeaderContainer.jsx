import React, { Component } from 'react';

import * as actions from '../actions/actions';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  mode: state.reducer.mode,
  modeList: state.reducer.modeList,
});


const mapDispatchToProps = dispatch => ({
  changeMode: () => dispatch(actions.changeModeActionCreator()),
});

class Header extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div id='header' >
      <h1>clickclack</h1>
      <h3 onClick={() =>{
        this.props.changeMode()
        document.getElementById('start').classList.remove('hide')
      }}>
        {this.props.modeList[this.props.mode]}
        <p id='clicktochangemode'>click to change mode</p>
      </h3>
    </div>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Header);