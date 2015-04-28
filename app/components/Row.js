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
        <Square isMine={cell} key={index} />
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
  cells: React.PropTypes.array.isRequired
};
