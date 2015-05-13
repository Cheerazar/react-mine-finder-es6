import React from 'react';
import { Digit } from './Digit';

let style = {
  display: 'flex',
  height: '30px',
  width: '90px',
  backgroundColor: '#272e38'
};

export class Time extends React.Component {
  render () {
    let strNumber = this.props.time.toString();
    while (strNumber.length < 3) {
      strNumber = '0' + strNumber;
    }

    let digits = strNumber.split('').map((num, idx) => {
      return (
        <Digit
          key={idx}
          value={parseInt(num, 10)} />
      );
    });

    return (
      <div style={style}>
        { digits }
      </div>
    );
  }
}

Time.propTypes = {
  time: React.PropTypes.number.isRequired
};
