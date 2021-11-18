import React, { useState, useEffect } from 'react'
import HttpService from '../services/HttpService'



// cost getasvgdata = ("coin") =>{
//   new Prommiss((resolve , reject)=>{
//     resolve(data)
//   })
// }


// getasvgdata("btc").then(data=>{})//   new Prommiss((resolve , reject)=>{
//     resolve(data)
//   })
// }


// getasvgdata("btc").then(data=>{})

const useSVGChart = (coin = 'BNBUSDT', timeframe = "30m", limit = 336) => {

  const [state, setState] = useState('')

  useEffect(() => {
    new HttpService("",
      {
        "uniqueId": "123",
        "action": "priceChart",
        "data": {
          "symbol": coin,
          "timeframe": "30m",
          "limit": 1440,
          "responseType": "url",
          "height": 70,
          "width": 200,

          // "symbol": coin,
          // "timeframe": timeframe,
          // "limit": limit,
          // "responseType": "url",
          // "height": 50
        }
      }).Post(res => {
        if (res?.success === true) {
          setState(res.data.url)
        }
      })
  }, [])
  // let base64ToString = Buffer.from(state, "base64").toString();
  // return base64ToString
  return state
}

export default useSVGChart