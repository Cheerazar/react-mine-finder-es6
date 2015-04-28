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
      <button type="button" style={styles} disabled>{ this.props.isMine ? 1 : 0 }</button>
    );
  }
}

Square.propTypes = {
  isMine: React.PropTypes.bool.isRequired
};
