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
        <Mines />
        <Reset />
        <Time />
      </div>
    );
  }
}
