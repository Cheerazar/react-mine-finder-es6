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
    let rows = Array.apply(null, new Array(this.props.rows)).map((item, index) => {
      return (
        <Row cells={this.props.cells} key={index} />
      );
    });

    return (
      <div style={style}>
        <GameState />
        { rows }
      </div>
    );
  }
}

Board.propTypes = {
  rows: React.PropTypes.number.isRequired,
  cells: React.PropTypes.number.isRequired
};
