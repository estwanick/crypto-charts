import React, { Component } from 'react';
import axios from 'axios';
import nv from 'nvd3';
import d3 from 'd3';

class Sparklines extends Component {

  constructor() {
    super();

    axios.get('https://api.coindesk.com/v1/bpi/historical/close.json')
    .then((resp) => {
      console.log(resp);
      let i = 0;
      const data = Object.entries(resp.data.bpi).map((d) => {
        return {
          x: i++,
          y: d[1]
        }
      });

      this.plotData(data);
    });

  }

  plotData(data) {
    nv.addGraph({
      generate: function() {
        var chart = nv.models.sparklinePlus();

        chart.x(function(d,i) { return i })
            .showLastValue(true)
            .xTickFormat(function(d) {
                return d3.time.format('%x')(new Date(data[d].x))
            });

        d3.select("#chart1")
                .datum(() => data)
                .call(chart);
          return chart;
      }
    });
  }

  render() {
    return (
      <div className="App">
        <svg id="chart1" className="sparkline"></svg>
      </div>
    );
  }
}

export default Sparklines;
