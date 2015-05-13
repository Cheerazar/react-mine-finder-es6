import React from 'react';
import { Digit } from './Digit';

let style = {
  display: 'flex',
  height: '30px',
  width: '90px',
  backgroundColor: '#272e38'
};

export class Mines extends React.Component {
  render () {
    let strNumber = this.props.mineCount.toString();
    while (strNumber.length < 3) {
      strNumber = '0' + strNumber;
    }

    let mines = strNumber.split('').map((num, idx) => {
      return (
        <Digit
          key={idx}
          value={parseInt(num, 10)} />
      );
    });

    return (
      <div style={style}>
        { mines }
      </div>
    );
  }
}

Mines.propTypes = {
  mineCount: React.PropTypes.number.isRequired
};
