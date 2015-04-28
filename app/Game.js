import React from 'react';
import { Board } from './components/Board';

let style = {
  margin: 'auto',
  display: 'flex',
  border: '1px solid black',
  width: 250,
  height: 270
};

function makeBoard(rows = 8, cells = 8, mines = 10) {
  let board = [];
  let rowModel = [];

  // create the array that will be the model for each row
  for (let i = 0; i < cells; i++) {
    rowModel[i] = false;
  }

  // Use the rowModel to fill the board
  for (let j = 0; j < rows; j++) {
    board[j] = rowModel.slice(0);
  }

  // TODO: insert mines randomly into board (use fisher-yates?)
  return board;
}

class Game extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      board: makeBoard(),
      isStarted: false
    };
  }

  render () {
    return (
      <div style={style}>
        <Board board={this.state.board} />
      </div>
    );
  }
}

React.render(<Game />, document.getElementById('game'));
