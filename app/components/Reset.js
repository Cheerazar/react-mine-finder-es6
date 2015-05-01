import React from 'react';

let style = {
  height: '30px',
  width: '90px',
  display: 'flex'
};

export class Reset extends React.Component {
  render () {
    return (
      <div style={style}>
        { this.props.gameLost ? 'Boo lost the game!' : 'Hello from Reset!' }
      </div>
    );
  }
}

Reset.propTypes = {
  gameLost: React.PropTypes.bool.isRequired
};
