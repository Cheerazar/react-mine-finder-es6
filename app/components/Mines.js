import React from 'react';

let style = {
  display: 'flex',
  height: '30px',
  width: '90px'
};

export class Mines extends React.Component {
  render () {
    return (
      <div style={style}>
        {this.props.mineCount}
      </div>
    );
  }
}

Mines.propTypes = {
  mineCount: React.PropTypes.number.isRequired
};
