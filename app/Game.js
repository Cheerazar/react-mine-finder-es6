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
    minesPlaced = 0;
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

function revealedNums(board) {
  const vectors = {
    northwest: {
      up: 1,
      right: -1
    },

    north: {
      up: 1,
      right: 0
    },

    northeast: {
      up: 1,
      right: 1
    },

    east: {
      up: 0,
      right: 1,
    },

    southeast: {
      up: -1,
      right: 1
    },

    south: {
      up: -1,
      right: 0
    },

    southwest: {
      up: -1,
      right: -1
    },

    west: {
      up: 0,
      right: -1
    }
  };

  return board.map((row) => {
    return row.map((cell) => {
      // Should make sure to not set numRevealed to anything if the cell is a mine
      // probably a potential optimization.
      if (!cell.isMine) {
        cell.numRevealed = Object.keys(vectors).reduce((total, curr) => {
          // need to check to make sure the board[row] is actually on the board, otherwise when you do board[row][cell] where board[row] is undefined you can't access the [cell] index on undefined
          let neighborRow = board[cell.row + vectors[curr].up];
          let neighborCell = neighborRow ? neighborRow[cell.cell + vectors[curr].right] : undefined;
          if (neighborCell && neighborCell.isMine) {
            total++;
          }

          return total;
        }, 0);
      } else {
        cell.numRevealed = 0;
      }

      return cell;
    });
  })
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

  board = insertMines(board, mines);
  return revealedNums(board);
}

function floodReveal (board, row, cell) {
  let cellsMax = board[row].length;
  let rowsMax = board.length;

  var recurse = function (row, cell) {
    let currentCell;

    // verify that the cell that is being accessed is on the board
    if (row >= 0 && row < rowsMax && cell >= 0 && cell < cellsMax) {
      currentCell = board[row][cell];
    }

    // if the currentCell is already revealed, exit this recursive path
    // else if this cell is normal and not a mine set the status to revealed
    if (currentCell && currentCell.status === 'revealed') {
      return;
    } else if (currentCell && currentCell.status === 'normal' && !currentCell.isMine) {
      currentCell.status = 'revealed';

      // recurse over each direction north, east, south, and west
      if (currentCell.numRevealed === 0) {
        // south
        recurse(row + 1, cell);
        // east
        recurse(row, cell + 1);
        // north
        recurse(row - 1, cell);
        // west
        recurse(row, cell - 1);
      }
    }
  };

  recurse(row, cell);

  return board;
}

class Game extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      board: makeBoard(),
      isStarted: false,
      gameWon: false,
      gameLost: false,
      mineCount: 10
    };
  }

  isGameWon () {
    if (!this.state.gameLost) {
      // need to go over every cell, so flatten the board
      // if that cell is a mine and revealed return false
      // if that cell is not a mine and is not revealed return false
      // else return true
      let isGameWon = this.state.board.reduce((a, b) => {
        return a.concat(b);
      }).every(cell => {
        if (cell.isMine && cell.status === 'revealed') {
          return false;
        } else if (!cell.isMine && cell.status !== 'revealed') {
          return false;
        } else {
          return true;
        }
      });

      if (isGameWon) {
        this.setState({
          gameWon: isGameWon
        });
      }
    }
  }

  // deal with right clicking on a square to mark with ?, flag, and back to normal
  markSquare (cellInfo) {
    // as I'm passing a reference around to the object within board, should I make
    // a copy of both the cell and board here to maintain immutable principles?
    let cellCopy = deepcopy(cellInfo);
    let newBoard = deepcopy(this.state.board);
    let newMineCount = this.state.mineCount;

    if (cellCopy.status === 'normal') {
      cellCopy.status = 'flag';
      newMineCount--;
    } else if (cellCopy.status === 'flag') {
      cellCopy.status = 'question-sign';
      newMineCount++;
    } else {
      cellCopy.status = 'normal';
    }

    newBoard[cellCopy.row][cellCopy.cell] = cellCopy;

    this.setState({
      board: newBoard,
      mineCount: newMineCount
    });
  }

  // deal with left clicking on a square to reveal it
  revealSquare (cellInfo) {
    let newBoard = deepcopy(this.state.board);
    let newCell = deepcopy(cellInfo);
    // if it's a mine or numRevealed > 0 reveal that square
    // else reveal all squares until hitting numRevealed's all around
    if (newCell.isMine || newCell.numRevealed > 0) {
      newCell.status = 'revealed';
      newBoard[newCell.row][newCell.cell] = newCell;
    } else {
      newBoard = floodReveal(newBoard, newCell.row, newCell.cell);
    }

    // always update the board, and then if the game is lost update the gameLost property, otherwise just pass add an empty object which won't change anything
    this.setState(assign({ board: newBoard }, (newCell.isMine ? { gameLost: true } : {})),
      this.isGameWon);
  }

  render () {
    return (
      <div style={style}>
        <Board
          board={this.state.board}
          markSquare={this.markSquare.bind(this)}
          revealSquare={this.revealSquare.bind(this)}
          mineCount={this.state.mineCount}
          gameLost={this.state.gameLost}
          gameWon={this.state.gameWon} />
      </div>
    );
  }
}

React.render(<Game />, document.getElementById('game'));
