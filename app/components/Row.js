import React from 'react';
import { Square } from './Square';

let style = {
  display: 'flex',
  height: '30px'
};

export class Row extends React.Component {
  render () {
    let squares = this.props.cells.map((cell, index) => {
      return (
        <Square
          cell={cell}
          key={index}
          index={index}
          markSquare={this.props.markSquare}
          revealSquare={this.props.revealSquare}
          gameLost={this.props.gameLost}
          isStarted={this.props.isStarted}
          startTimer={this.props.startTimer} />
      );
    });

    return (
      <div style={style}>
        { squares }
      </div>
    );
  }
}

Row.propTypes = {
  cells: React.PropTypes.array.isRequired,
  markSquare: React.PropTypes.func.isRequired,
  revealSquare: React.PropTypes.func.isRequired,
  gameLost: React.PropTypes.bool.isRequired,
  isStarted: React.PropTypes.bool.isRequired,
  startTimer: React.PropTypes.func.isRequired
};
