import React from 'react';
import { Mines } from './Mines';
import { Reset } from './Reset';
import { Time } from './Time';

let style = {
  display: 'flex',
  height: '30px'
};

export class GameState extends React.Component {
  render () {
    return (
      <div style={style}>
        <Mines mineCount={this.props.mineCount} />
        <Reset
          gameLost={this.props.gameLost}
          gameWon={this.props.gameWon} />
        <Time />
      </div>
    );
  }
}

GameState.propTypes = {
  mineCount: React.PropTypes.number.isRequired,
  gameLost: React.PropTypes.bool.isRequired,
  gameWon: React.PropTypes.bool.isRequired
};
