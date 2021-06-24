import React, { Component } from 'react';
// eslint-disable-next-line no-unused-vars
import { connect, useSelector } from 'react-redux';
import TypeHere from '../components/TypeHere.jsx';
import * as actions from '../actions/actions';
import TextContainer from './TextContainer.jsx'
import Word from '../components/Word.jsx'
import Letter from '../components/Letter.jsx'
import Wpm from '../components/Wpm.jsx'

const mapStateToProps = state => ({
    currentLetter: state.reducer.currentLetter,
    displayText: state.reducer.displayText,
    lastLetter: state.reducer.lastLetter,
    index: state.reducer.index,
    box: state.reducer.box,
    modeApi: state.reducer.modeApi,
    mode: state.reducer.mode,
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
      this.time = 0;
      this.stats = [0,0,0,0];
    }
    

    fetchDisplayText() {
        return (fetch(this.props.modeApi[this.props.mode])
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
      // console.log('currentLetter',this.props.currentLetter,'last',this.props.lastLetter,this.props.index-1)
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
        const wrongdivs = document.getElementsByClassName('incorrect')
        const wrongLetters = [];
        for(let i = 0; i < wrongdivs.length; i++) {
          wrongLetters.push(wrongdivs[i].innerHTML)
        }
        // console.log(wrongLetters)

        // if(wrongLetters.length !== 0) {
        //   fetch()
        // }

        const numIncorrect = document.getElementsByClassName('incorrect').length
        const totalTime = (Date.now() - this.time) / 1000;
        const grossWpm = Math.floor((this.props.displayText.length / 5)/ (totalTime / 60));
        const netWpm = Math.floor(grossWpm - (numIncorrect/(totalTime / 60)));
        const accuracy = Math.floor(100 * (this.props.displayText.length - numIncorrect) / this.props.displayText.length)
        this.stats = [Math.floor(totalTime), grossWpm, netWpm, accuracy, document.cookie.split('=')[1]]
        fetch('/updatestats', {
          method: 'PUT',
          headers: {
            'Content-Type': 'Application/JSON'
          },
          body: JSON.stringify([new Date().toISOString().split('T')[0], grossWpm, netWpm, accuracy, document.cookie.split('=')[1]])
        })
          .then(resp => resp.json())
          .then(data => {
            console.log(data);
          })
          .catch(err => console.log('Updating stats error in maincontainer: ERROR: ', err));
        document.getElementById("inputbox").value=''
        this.props.clearText();
        this.fetchDisplayText().then(() => this.time = Date.now())
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
            id='start'
            onClick={
              () => {this.fetchDisplayText();
                this.time = Date.now();
                this.props.clearText();
                document.getElementById("inputbox").value=''
                document.getElementById('start').classList.add('hide')
            }}>click here to start</button>
          </div>
          <div id='wpm'>
            <Wpm
              stats={this.stats}
            />
          </div>
        </div>
      );
    }
  
  }
  

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);