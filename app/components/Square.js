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
  render () {
    return (
      <button
        onContextMenu={this.handleClick.bind(this)}
        type="button" style={styles}>
        { this.props.cell.isMine ? 1 : 0 }
      </button>
    );
  }
}

Square.propTypes = {
  cell: React.PropTypes.object.isRequired,
  updateSquare: React.PropTypes.func.isRequired
};
