import React, { Component } from 'react';
import Highcharts from 'highcharts/highstock';
import { fetchBC, fetchGBTC, fetchBTSC } from '../service/price.js';

class HighLinechart extends Component {

    componentDidMount() {
        this.plotData();
    }

    plotData() {
        this.chart = Highcharts.stockChart(this.container, {
            xAxis: {
                type: 'datetime'
            },
            title: {
                text: 'Compare Bitcoin and Bitcoin Trackers'
            },
            zoomType: "xy",
            navigator: {
                enabled: true
            },
            rangeSelector: {
                enabled: true
            },
            scrollbar: {
                enabled: true
            },
            legend: {
                layout: 'vertical',
                align: 'left',
                x: 120,
                verticalAlign: 'top',
                y: 80,
                floating: true,
                backgroundColor: '#FFFFFF'
            },
        });

        fetchBC().then((d) => {
            this.chart.addSeries({
                name: 'Bitcoin',
                data: d,
                tooltip: {
                    valueDecimals: 2
                }
            }, true);
        });

        fetchGBTC().then((d) => {
            this.chart.addSeries({
                name: 'GBTC',
                data: d,
                tooltip: {
                    valueDecimals: 2
                }
            }, true);
        });

        fetchBTSC().then((d) => {
            this.chart.addSeries({
                name: 'BTSC',
                data: d,
                tooltip: {
                    valueDecimals: 2
                }
            }, true);
        });

    }

    checkedBox(event) {
        console.log(event.target.name);
        console.log(event.target.checked);
    }

    render() {
        return (
            <div>
                <div className="chart" ref={ ref => this.container = ref }></div>
                <div>
                    <div>
                        <input type="checkbox" name="bitcoin" onChange={this.checkedBox.bind(this)}/>
                        <label>Bitcoin</label>
                    </div>
                    <div>
                        <input type="checkbox" name="gbtc" onChange={this.checkedBox.bind(this)}/>
                        <label>GBTC</label>
                    </div>
                    <div>
                        <input type="checkbox" name="btsc" onChange={this.checkedBox.bind(this)}/>
                        <label>BTSC</label>
                    </div>
                </div>
            </div>
        );
    }
}

export default HighLinechart;
