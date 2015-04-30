import React from 'react';

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
    if (cell.status !== 'revealed' && e.type === 'click') {
      this.props.revealSquare(cell);
    } else if (cell.status !== 'revealed' && e.type === 'contextmenu') {
      this.props.markSquare(cell);
    }
  }

  render () {
    return (
      <button
        onContextMenu={this.handleClick.bind(this)}
        onClick={this.handleClick.bind(this)}
        type="button" style={styles}>
        { this.props.cell.status !== 'revealed' ? undefined : 1 }
      </button>
    );
  }
}

Square.propTypes = {
  cell: React.PropTypes.object.isRequired,
  markSquare: React.PropTypes.func.isRequired,
  revealSquare: React.PropTypes.func.isRequired
};
