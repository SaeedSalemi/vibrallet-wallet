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

const useSVGChart = (coin = 'BNB', timeframe = "30m", limit = 336) => {

  const [state, setState] = useState('')

  useEffect(() => {

    try {
      new HttpService("",
        {
          "uniqueId": "123",
          "action": "priceChart",
          "data": {
            "symbol": coin,
            "timeframe": "30m",
            "limit": 1440,
            "responseType": "url",
            "height": 30,
            "width": 250,
          }
        }).Post(res => {
          if (res?.success === true) {
            setState(res.data.url)
          }
        })
    } catch (error) {
      console.log('error', error)
      setState("")
    }

  }, [])
  // let base64ToString = Buffer.from(state, "base64").toString();
  // return base64ToString
  return state
}

export default useSVGChart