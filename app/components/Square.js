import React from 'react';
import { Glyphicon } from 'react-bootstrap';

let styles = {
  display: 'flex',
  outline: '1px solid #ddd',
  background: '#f0f0f0',
  flexGrow: 1,
  height: '30px',
  width: '30px'
};

export class Square extends React.Component {
  handleClick (e) {
    e.preventDefault();
    let cell = this.props.cell;

    // start game timer
    if (!this.props.isStarted) {
      this.props.startTimer();
    }

    if (cell.status === 'normal' && e.type === 'click') {
      this.props.revealSquare(cell);
    } else if (cell.status !== 'revealed' && e.type === 'contextmenu') {
      this.props.markSquare(cell);
    }
  }

  render () {
    let cell = this.props.cell;
    let glyph;

    if (cell.status !== 'normal' && cell.status !== 'revealed') {
      glyph = <Glyphicon glyph={cell.status} />;
    } else if (cell.status === 'revealed' && cell.isMine) {
      glyph = 'X';
    } else if (cell.status === 'revealed' && cell.numRevealed > 0) {
      glyph = cell.numRevealed;
    } else if (cell.status === 'revealed' && cell.numRevealed === 0) {
      glyph = 'O';
    } else {
      // will probably need to update the styles to make the button unclickable
      glyph = undefined;
    }

    return (
      <button
        onContextMenu={this.handleClick.bind(this)}
        onClick={this.handleClick.bind(this)}
        type="button"
        style={styles}
        disabled={cell.status !== 'normal' || this.props.gameLost ? true : false }>
        { glyph }
      </button>
    );
  }
}

Square.propTypes = {
  cell: React.PropTypes.object.isRequired,
  markSquare: React.PropTypes.func.isRequired,
  revealSquare: React.PropTypes.func.isRequired,
  gameLost: React.PropTypes.bool.isRequired,
  isStarted: React.PropTypes.bool.isRequired,
  startTimer: React.PropTypes.func.isRequired
};
