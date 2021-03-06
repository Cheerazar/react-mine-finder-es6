import React from 'react';
import { GameState } from './GameState';
import { Row } from './Row';

let style = {
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1
};

export class Board extends React.Component {
  render () {
    let rows = this.props.board.map((row, index) => {
      return (
        <Row
          cells={row}
          key={index}
          markSquare={this.props.markSquare}
          revealSquare={this.props.revealSquare}
          gameLost={this.props.gameLost}
          isStarted={this.props.isStarted}
          startTimer={this.props.startTimer} />
      );
    });

    return (
      <div style={style}>
        <GameState
          mineCount={this.props.mineCount}
          gameLost={this.props.gameLost}
          gameWon={this.props.gameWon}
          time={this.props.time} />
        { rows }
      </div>
    );
  }
}

Board.propTypes = {
  board: React.PropTypes.array.isRequired,
  markSquare: React.PropTypes.func.isRequired,
  revealSquare: React.PropTypes.func.isRequired,
  mineCount: React.PropTypes.number.isRequired,
  gameLost: React.PropTypes.bool.isRequired,
  gameWon: React.PropTypes.bool.isRequired,
  isStarted: React.PropTypes.bool.isRequired,
  time: React.PropTypes.number.isRequired,
  startTimer: React.PropTypes.func.isRequired
};
