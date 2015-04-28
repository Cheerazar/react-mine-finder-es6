import React from 'react';
import { Board } from './components/Board';

let style = {
  margin: 'auto',
  display: 'flex',
  border: '1px solid black',
  width: 250,
  height: 270
};

class Game extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      rows: 8,
      cells: 8,
      mines: 10
    };
  }

  render () {
    return (
      <div style={style}>
        <Board rows={this.state.rows} cells={this.state.cells} />
      </div>
    );
  }
}

React.render(<Game />, document.getElementById('game'));
