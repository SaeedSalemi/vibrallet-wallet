import React, { useState, useEffect } from 'react'
import HttpService from '../services/HttpService'

const useSVGChart = (coin = 'BNBUSDT', width = 10, height = 10, timeframe = "30m", limit = 336) => {

  const [state, setState] = useState('')

  useEffect(() => {
    new HttpService("",
      {
        "uniqueId": "123",
        "action": "priceChart",
        "data": {
          "symbol": coin,
          "timeframe": timeframe,
          "limit": limit,
          "width": width,
          "height": height
        }
      }).Post(res => {
        if (res?.success === true) {
          setState(res.data.url)
        }
      })
  }, [state])


  return state
}

export default useSVGChart