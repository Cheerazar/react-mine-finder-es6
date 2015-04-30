import React from 'react';
import { Board } from './components/Board';
import assign from 'object-assign';
import deepcopy from 'deepcopy';

let style = {
  margin: 'auto',
  display: 'flex',
  border: '1px solid black',
  width: 250,
  height: 270
};

function findRandom (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function insertMines (board, numOfMines) {
  let rows = board.length;

  // instead of creating cells variable, determine number of cells here,
  // as cells isn't used anywhere else in this function
  let numOfCells = rows * board[0].length;
  let allPlaced = false;

  let randomCell, randomRow, randomPosition, minedBoard, position, minesPlaced;
  // Keep making boards with random placements until all are placed
  while (!allPlaced) {
    minedBoard = deepcopy(board);
    minesPlaced = 1;
    for (position = 0; position < numOfCells; position++) {
      // find random number between (numOfCells - position) + position
      randomPosition = findRandom(position, numOfCells);
      // extract the randomPosition's corresponding row and cell
      randomRow = Math.floor(randomPosition / rows);
      randomCell = randomPosition % rows;

      // make it a mine if not one already and indicate that it has been placed
      if (!minedBoard[randomRow][randomCell].isMine) {
        minedBoard[randomRow][randomCell].isMine = true;
        minesPlaced++;
      }

      // If all mines have been placed exit board construction
      if (minesPlaced === numOfMines) {
        allPlaced = true;
        break;
      }
    }
  }

  return minedBoard;
}

function makeBoard(rows = 8, cells = 8, mines = 10) {
  let board = [];
  let rowModel = [];
  let mineModel = {
    isMine: false,
    status: 'normal'
  };

  // create the array that will be the model for each row
  for (let row = 0; row < rows; row++) {
    board[row] = [];

    // fill each cell with a unique object to make sure object reference issues don't arise
    for (let cell = 0; cell < cells; cell++) {
      board[row][cell] = assign({}, mineModel, {
        row: row,
        cell: cell
      });
    }
  }

  return insertMines(board, mines);
}

class Game extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      board: makeBoard(),
      isStarted: false
    };
  }

  // deal with right clicking on a square to mark with ?, flag, and back to normal
  markSquare (cellInfo) {
    // as I'm passing a reference around to the object within board, should I make
    // a copy of both the cell and board here to maintain immutable principles?
    let cellCopy = deepcopy(cellInfo);
    let newBoard = deepcopy(this.state.board);

    if (cellCopy.status === 'normal') {
      cellCopy.status = 'flag';
    } else if (cellCopy.status === 'flag') {
      cellCopy.status = 'question-sign';
    } else {
      cellCopy.status = 'normal';
    }

    newBoard[cellCopy.row][cellCopy.cell] = cellCopy;

    this.setState({
      board: newBoard
    });
  }

  // deal with left clicking on a square to reveal it
  revealSquare (cellInfo) {

  }

  render () {
    return (
      <div style={style}>
        <Board
          board={this.state.board}
          markSquare={this.markSquare.bind(this)}
          revealSquare={this.revealSquare.bind(this)} />
      </div>
    );
  }
}

React.render(<Game />, document.getElementById('game'));
