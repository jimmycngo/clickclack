import React, { Component } from 'react';
// eslint-disable-next-line no-unused-vars
import { connect, useSelector } from 'react-redux';
import TypeHere from '../components/TypeHere.jsx';
import * as actions from '../actions/actions';
import TextContainer from './TextContainer.jsx'
import Word from '../components/Word.jsx'
import Letter from '../components/Letter.jsx'

const mapStateToProps = state => ({
    currentLetter: state.reducer.currentLetter,
    displayText: state.reducer.displayText,
    lastLetter: state.reducer.lastLetter,
    index: state.reducer.index,
    box: state.reducer.box,
});

const mapDispatchToProps = dispatch => ({
    currentText: (input) => dispatch(actions.currentTextActionCreator(input)),
    getDisplayText: (input) => dispatch(actions.displayTextActionCreator(input)),
    clearText: () => dispatch(actions.clearTextActionCreator()),
    correctText: (input) => dispatch(actions.correctActionCreator(input)),
    incorrectText: (input) => dispatch(actions.incorrectActionCreator(input)),
    deleteText: (input) => dispatch(actions.deleteActionCreator(input)),
  });

class MainContainer extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
      super(props);
    }
    
    fetchDisplayText() {
        return (fetch('https://api.quotable.io/random')
        .then(data => data.json())
        .then(data => this.props.getDisplayText(data))
        .catch((err) => console.log('bruv fetch failed',err))
        )
    }

    createText () {
      const displayText = [];
      let letterText = [];
      let next = this.props.displayText.concat(' ')
      for (let i = 0; i < next.length; i++) {
        if(next[i] !== ' ') {
          letterText.push(<Letter 
          displayText={next[i]}
          spot={i}
          />)
        } 
        else {displayText.push(<Word 
          displayText={letterText}
          spot={i}
          />)
          letterText = [];
        }
      }
      return displayText
    }

    render() {
      //checks if current letter is correct
      console.log('currentLetter',this.props.currentLetter,'last',this.props.lastLetter,this.props.index-1)
      if(this.props.index !== 0) {
      if(this.props.currentLetter !== this.props.lastLetter && this.props.lastLetter !== ' ') {
        document.getElementById(this.props.index-1).classList.add('incorrect')
        document.getElementById(this.props.index-1).classList.remove('correct')
      } else if (this.props.lastLetter !== ' '){
        document.getElementById(this.props.index-1).classList.remove('incorrect')
        document.getElementById(this.props.index-1).classList.add('correct')
      }
    }
      //checks for length when done with quote
      if(this.props.index === this.props.displayText.length && this.props.box.length !== 0) {
        document.getElementById("inputbox").value=''
        this.props.clearText();
        this.fetchDisplayText();
      }

      return(
        <div id='mainbody'>
          <div id='textcontainer'>
            <TextContainer
            displayText={this.props.displayText}
            createText= {this.createText()}
            />
          </div>
          <div id='typehere'>
            <TypeHere
            currentText={this.props.currentText}
            deleteText={this.props.deleteText}
            />
            <button
            href='http://localhost:3000/'
            id='start'
            onClick={
              () => {this.fetchDisplayText();
              this.props.clearText();
              document.getElementById("inputbox").value=''
              document.getElementById('start').classList.add('hide')
            }}>click here to start</button>
          </div>
          
        </div>
      );
    }
  
  }
  

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);