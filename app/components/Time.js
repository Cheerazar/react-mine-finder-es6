import React from 'react';

let style = {
  display: 'flex',
  height: '30px',
  width: '90px'
};

export class Time extends React.Component {
  render () {
    return (
      <div style={style}>
        Hello from Time!
      </div>
    );
  }
}
