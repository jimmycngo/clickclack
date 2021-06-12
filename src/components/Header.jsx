import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../actions/actions';

const Header = props => {

const mode = useSelector(state => state.mode)
const dispatch = useDispatch()



  return(  
    <div id='header' >
      <h1>clickclack</h1>
      <h3>{'settings'}</h3>
      {/* <button 
      onClick={() =>{
         use(dispatch(actions.changeModeActionCreator()))
        }
      }>mode</button> */}
    </div>
  )
};

export default Header;