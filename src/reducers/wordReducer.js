import * as types from '../constants/actionTypes';

const initialState = {
 currentLetter: '',
 displayText: [],
 lastLetter: '',
 index: 0,
 box: '',
 modeList: ['quote', 'anime', 'lotr'],
 modeApi:['https://api.quotable.io/random','https://animechan.vercel.app/api/random', 'https://lotr-random-quote-api.herokuapp.com/api/quote'],
 mode: 0,
 currentMode: 'quote',
};

const wordReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CURRENT_TEXT: {
      let currentLetter = state.currentLetter;
      let lastLetter = state.lastLetter;
      let index = state.index;
      let box = state.box;
      // console.log(action.payload.length,state.index)
      if(action.payload.length === state.index + 1) {
      currentLetter = action.payload.slice(-1);
      lastLetter = state.displayText[index]
      index++
      box = action.payload;
      }
      return {
        ...state,
        currentLetter,
        lastLetter,
        index,
        box
      };
    }
    case types.DISPLAY_TEXT: {
      const displayText = [];
      //for random quote api
      if(state.mode === 0){
        console.log(action.payload['content'])
        for(const element of action.payload['content']) {
          displayText.push(element);
        }
      } else {
        console.log(action.payload['quote'])
        for(const element of action.payload['quote']) {
          displayText.push(element);
        }
      }
      //console.log('heres what i saved in displayText', displayText);
      return {
        ...state,
        displayText
      };
    }
    case types.CLEAR_TEXT: {
      return {
        ...state,
        currentLetter: '',
        displayText: [],
        lastLetter: '',
        index: 0,
        box: '',
      }
    }
    case types.TEXT_CORRECT: {
      return {
        ...state,
      }
    }
    case types.TEXT_INCORRECT: {
      return {
        ...state,
      }
    }
    case types.DELETE_TEXT: {
      console.log('delete me')
      if(state.lastLetter !== ' '){
        document.getElementById(state.index-1).classList.remove('incorrect')
        document.getElementById(state.index-1).classList.remove('correct')
      }
      const index = state.index - 1;
      const lastLetter = state.displayText[index-1];
      const box = state.box.slice(0,-1);
      const currentLetter = box.slice(-1)

      return {
        ...state,
        lastLetter,
        index,
        box,
        currentLetter,
      }
    }
    case types.CHANGE_MODE: {
      let mode = (state.mode + 1)%state.modeList.length;
      let currentMode = state.modeList[mode];

      return{
        ...state,
        currentLetter: '',
        displayText: [],
        lastLetter: '',
        index: 0,
        box: '',
        mode,
        currentMode,
      }
    }
    default: {
      return state;
    }
  }
};

export default wordReducer;


