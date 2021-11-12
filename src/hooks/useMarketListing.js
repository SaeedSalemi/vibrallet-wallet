import React, { useState, useEffect } from 'react'
import HttpService from '../services/HttpService'
const useMarketListing = () => {

  const [state, setState] = useState([])

  useEffect(() => {
    new HttpService(
      "", {
      "uniqueId": "123",
      "action": "marketListing",
    }
    ).Post(response => {
      if (response)
        setState(response)
    })
  }, [])

  return { MarketListing: state }
}

export default useMarketListing