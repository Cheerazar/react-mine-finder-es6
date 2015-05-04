import React from 'react';

let style = {
  height: '30px',
  width: '90px',
  display: 'flex'
};

export class Reset extends React.Component {
  render () {
    let gameStatus;

    if (this.props.gameLost) {
      gameStatus = 'Boo lost the game!';
    } else if (this.props.gameWon) {
      gameStatus = 'Yay won the game!';
    } else {
      gameStatus = 'Reset!'
    }
    return (
      <div style={style}>
        { gameStatus }
      </div>
    );
  }
}

Reset.propTypes = {
  gameLost: React.PropTypes.bool.isRequired,
  gameWon: React.PropTypes.bool.isRequired
};
