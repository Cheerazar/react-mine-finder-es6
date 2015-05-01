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
    } else {
      glyph = cell.status === 'revealed' && cell.isMine ? 'X' : undefined;
    }

    return (
      <button
        onContextMenu={this.handleClick.bind(this)}
        onClick={this.handleClick.bind(this)}
        type="button"
        style={styles}
        disabled={cell.status !== 'normal' ? true : false }>
        { glyph }
      </button>
    );
  }
}

Square.propTypes = {
  cell: React.PropTypes.object.isRequired,
  markSquare: React.PropTypes.func.isRequired,
  revealSquare: React.PropTypes.func.isRequired
};
