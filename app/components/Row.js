import React from 'react';
import { Square } from './Square';

let style = {
  display: 'flex',
  height: '30px'
};

export class Row extends React.Component {
  render () {
    let squares = Array.apply(null, new Array(this.props.cells)).map((item, index) => {
      return (
        <Square key={index} />
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
  cells: React.PropTypes.number.isRequired
};
