import React, { Component } from 'react';
import axios from 'axios';
import nv from 'nvd3';
import d3 from 'd3';

class Linechart extends Component {

    constructor() {
        super();
        this.plotData();
    }

    fetchGBTC() {
        return axios.get('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=GBTC&apikey=UV9NRN76MYRD6R9Q')
            .then((resp) => {
                let i = 0;
                let mod = Object.entries(resp.data['Time Series (Daily)']);
                let nm = mod.slice(0,31).reverse();
                const data = nm.map((d) => {
                    return {
                        x: i++,
                        y: d[1]['4. close']
                    }
                });
                return data;
            });
    }

    fetchBC() {
        return axios.get('https://api.coindesk.com/v1/bpi/historical/close.json')
            .then((resp) => {
                let i = 0;
                const data = Object.entries(resp.data.bpi).map((d) => {
                    return {
                        x: i++,
                        y: d[1]
                    }
                });
                return data;
            });
    }

    plotData() {
        nv.addGraph(() => {
            var chart = nv.models.lineChart()
                .yDomain([0, 12000])
                .margin({
                    top: 150,
                    right: 150,
                    left: 150
                });

            chart.xAxis
                .axisLabel("Day");

            chart.yAxis
                .axisLabel('Price (USD)');

            let dataArray = [];
            let dA = this.fetchBC().then((d) => {
                dataArray.push({
                    key: 'Bitcoin',
                    values: d
                });
                d3.select("#Linechart").datum(() => dataArray).call(chart);
            });

            let dB = this.fetchGBTC().then((d) => {
                dataArray.push({
                    key: 'GBTC',
                    values: d
                });
                d3.select("#Linechart").datum(() => dataArray).call(chart);
            });

            return chart;
        });
    }



    render() {
        return (
            <div className="App">
                <svg id="Linechart" className="Linechart"></svg>
            </div>
        );
    }
}

export default Linechart;
