import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { Button, FormGroup, Label, Input, Alert } from 'reactstrap';


class App extends Component {
  constructor(props){
    super(props);
    this.handleStartGameClick = this.handleStartGameClick.bind(this);
    this.handleChangesInNewWord = this.handleChangesInNewWord.bind(this);
    this.state = {isGameStarted: false,
                  newWordValue: '', 
                  currentWordValue: '',
                  currentGameStatus: Number}
  }


  handleStartGameClick = () => {
    this.setState({currentGameStatus: -1});
    axios.post('https://localhost:44330/api/Game/startgame')
      .then(res => {
        if(res.data)
        {
          this.setState({isGameStarted: true});
        }
      })
  }

  handleChangesInNewWord(event){
    this.setState({newWordValue: event.target.value});
  }

  handleGetCurrentWordInGame = () => {
    if(this.state.newWordValue.length > 1)
    {
      alert("Ops, you cant not add more than one letter!");
    }
    else
    {      
      axios.post('https://localhost:44330/api/Game/addletter?word=' + this.state.currentWordValue + this.state.newWordValue)
        .then(res => {
          this.setState({currentWordValue: res.data.currentWord});
          this.setState({currentGameStatus: res.data.gameStatus});
          this.setState({newWordValue: ''});
          if(res.data.gameStatus === 1)
          {
            alert("Insert coin!, Close alert to play again.");
            this.setState({currentWordValue: ''});
            this.setState({newWordValue: ''});
          }
          else if(res.data.gameStatus === 0)
          {
            alert("You win!, close alert to play again.");
            this.setState({currentWordValue: ''});
            this.setState({newWordValue: ''});
          }
      })
    }
  }

  render() {
    const isGameStarted = this.state.isGameStarted;
    return (
      <div className="App">
        <header className="App-header">
          <div id="game-board">
            {!isGameStarted || 
              this.state.currentGameStatus === 1 || 
              this.state.currentGamestatus === 0 ? (
              
              <Button onClick = {this.handleStartGameClick} color="primary">Start new game!</Button>
            ) : (
                <div id="game-board-started">
                  <FormGroup>
                    <Label for="current-word-element">Current word: </Label>
                    <Alert color="primary">
                      <strong>{this.state.currentWordValue.toUpperCase()}</strong>
                    </Alert>
                    <br>
                    </br>
                    <br>
                    </br>
                    <Label for="new-letter-element">Insert new letter: </Label>
                    <Input type="text" value={this.state.newWordValue} name="current-word-element" id="new-letter-element" onChange={this.handleChangesInNewWord}></Input>
                    <br>
                    </br>
                    <Button onClick = {this.handleGetCurrentWordInGame} color="primary">Submit new letter</Button>
                  </FormGroup>
                  </div>
                )}
          </div>
        </header>
      </div>
    );
  }
}

export default App;
