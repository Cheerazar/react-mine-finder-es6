import React from 'react';
import assign from 'object-assign';

let styles = {
  div: {
    textAlign: 'left',
    position: 'relative',
    width: '30px',
    height: '30px',
    display: 'flex'
  },

  span: {
    backgroundColor: '#E82C0C',
    borderColor: '#E82C0C',
    position: 'absolute'
  },

  val1: ['d5', 'd7'],
  val2: ['d1', 'd2', 'd3', 'd5', 'd6'],
  val3: ['d1', 'd2', 'd3', 'd5', 'd7'],
  val4: ['d2', 'd4', 'd5', 'd7'],
  val5: ['d1', 'd2', 'd3', 'd4', 'd7'],
  val6: ['d1', 'd2', 'd3', 'd4', 'd6', 'd7'],
  val7: ['d1', 'd5', 'd7'],
  val8: ['d1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7'],
  val9: ['d1', 'd2', 'd3', 'd4', 'd5', 'd7'],
  val0: ['d1', 'd3', 'd4', 'd5', 'd6', 'd7'],

  d1: {
    height: '2px',
    width: '15px',
    top: '0px',
    left: '6px'
  },

  d2: {
    height: '3px',
    width: '15px',
    top: '13px',
    left: '6px'
  },

  d3: {
    height: '3px',
    width: '15px',
    top: '26px',
    left: '6px'
  },

  d4: {
    height: '10px',
    width: '3px',
    top: '2px',
    left: '1px'
  },

  d5: {
    height: '10px',
    width: '3px',
    top: '2px',
    right: '1px'
  },

  d6: {
    height: '10px',
    width: '3px',
    top: '16px',
    left: '1px'
  },

  d7: {
    height: '10px',
    width: '3px',
    top: '16px',
    right: '1px'
  }
};

export class Digit extends React.Component {
  render () {
    let spans = ['d1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7'].map((dash, index) => {
      let opacity = styles['val' + this.props.value].indexOf(dash) > -1 ? { opacity: 1 } : { opacity: 0 };
      return (
        <span style={assign({}, styles.span, styles[dash], opacity)} key={index} />
      );
    });

    return (
      <div style={styles.div}>
        { spans }
      </div>
    );
  }
}

Digit.propTypes = {
  value: React.PropTypes.number.isRequired
};
