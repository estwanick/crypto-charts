import axios from 'axios';

export function fetchGBTC (){
    return axios.get('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=GBTC&apikey=UV9NRN76MYRD6R9Q')
        .then((resp) => {
            let mod = Object.entries(resp.data['Time Series (Daily)']);
            let nm = mod.reverse();
            const data = nm.map((d) => {
                return {
                    x: new Date(d[0]),
                    y: parseFloat(d[1]['4. close'])
                }
            });
            return data;
        });
}

export function fetchBTSC (){
    return axios.get('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=BTSC&apikey=UV9NRN76MYRD6R9Q')
        .then((resp) => {
            let mod = Object.entries(resp.data['Time Series (Daily)']);
            let nm = mod.reverse();
            const data = nm.map((d) => {
                return {
                    x: new Date(d[0]),
                    y: parseFloat(d[1]['4. close'])
                }
            });
            return data;
        });
}
    
export function fetchBC() {
    return axios.get('https://api.coindesk.com/v1/bpi/historical/close.json?start=2017-01-01&end=2017-12-01')
        .then((resp) => {
            const data = Object.entries(resp.data.bpi).map((d) => {
                return {
                    x: new Date(d[0]),
                    y: d[1]
                }
            });
            return data;
        });
}


