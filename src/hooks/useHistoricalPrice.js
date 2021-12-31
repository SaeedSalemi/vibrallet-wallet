import { useQuery } from 'react-query';
import HttpService from './../services/HttpService'

const fetchHistoricalPrice = () => {

  return new Promise((resovle, reject) => {

    const data = {
      "uniqueId": "abc",
      "action": "historicalPrice",
      "data": {
        "symbol": `BTCUSDT`,
        "timeframe": '4h',
        "limit": 6
      }
    }

    new HttpService("", data).Post(xhr_response => {
      if (xhr_response) {


        const response = xhr_response.data.rates.map(item => {
          return {
            date: moment(item.key),
            value: item.value
          }
        });
        resovle(response);

      }
    }, err => {
      console.log('error in use historical price', err);
      reject(err)
    })
  })

};

const useHistoricalPrice = () => useQuery('historical_prices', fetchHistoricalPrice);
export default useHistoricalPrice;