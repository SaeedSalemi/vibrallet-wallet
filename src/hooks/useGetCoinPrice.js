import React, { useEffect, useState } from 'react'
import HttpService from '../services/HttpService'

export const useGetCoinPrice = (symbol) => {
  const [state, setState] = useState()
  useEffect(() => {
    new HttpService("", {
      "uniqueId": "abc1",
      "action": "quotedPrice",
      "data": {
        "symbol": `${symbol}USDT`
      }
    }).Post(res => {
      if (res) {
        setState(parseFloat(res.data.rate))
      }
    })
  }, [])
  return state
}