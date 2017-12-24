import React from 'react';
import {Radar} from 'react-chartjs-2';

const data = {
  labels: ['Attack', 'Defense', 'Toughness', 'Mobility', 'Utility'],
  datasets: [
    {
      label: 'Rune Average stats',
      backgroundColor: 'rgba(179,181,198,0.2)',
      borderColor: 'rgba(179,181,198,1)',
      pointBackgroundColor: 'rgba(179,181,198,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(179,181,198,1)',
      data: [2, 3, 2, 2, 0]
    },
    {
      label: 'Champion Stats',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      pointBackgroundColor: 'rgba(255,99,132,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255,99,132,1)',
      data: [1, 2, 1.5, 1, 1]
    }
  ]
};

module.exports = React.createClass({
  displayName: 'RadarExample',

  render() {
    return (
      <div>
        <h2>Radar Example</h2>
        <Radar data={data} />
      </div>
    );
  }
});