'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactChartjs = require('react-chartjs-2');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var data = {
  labels: ['Tank', 'Support', 'Mage', 'Marksman', 'Fighter', 'Assassin'],
  datasets: [{
    label: 'Rune user role distribution',
    backgroundColor: 'rgba(255,99,132,0.2)',
    borderColor: 'rgba(255,99,132,1)',
    borderWidth: 1,
    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
    hoverBorderColor: 'rgba(255,99,132,1)',
    data: [11, 7, 5, 0, 3, 3]
  }]
};

exports.default = _react2.default.createClass({
  displayName: 'BarExample',

  render: function render() {
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'h2',
        null,
        'Horizontal Bar Example'
      ),
      _react2.default.createElement(_reactChartjs.HorizontalBar, { data: data })
    );
  }
});