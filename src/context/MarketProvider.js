import React, { createContext, useEffect, useState } from 'react'
import HttpService from '../services/HttpService'

export const Context = createContext()

const MarketProvider = props => {

  const [state, setState] = useState({
    FCASList: [],
    MarketListing: [],
    MarketListingSort: {
      p_symbol: 'symbol',
      n_symbol: '-symbol',

      p_percent_change_24h: 'percent_change_24h',
      n_percent_change_24h: '-percent_change_24h',

      p_price: 'price',
      n_price: '-price',
    },
  })

  const dispatch = value => setState({ ...state, ...value })

  useEffect(() => {

    new HttpService(
      "", {
      "uniqueId": "123",
      "action": "marketListing",
      "data": {
        "pageSize": 10,
        "pageNumber": 1,
        "sort": `${state.MarketListingSort.p_symbol}`
      }
    }
    ).Post(response => {
      console.log('market listing', response)
      if (response) {
        state.MarketListing = response
        setState({ ...state })
      }
    })

  }, [])

  useEffect(() => {
    new HttpService("", {
      "uniqueId": "123",
      "action": "fcasListing",
    }).Post(res => {
      if (res.length > 0) {
        state.FCASList = res
        setState({ ...state })
      }
    })
  }, [state.FCASList])

  return <Context.Provider value={{ ...state, dispatch }}>
    {props.children}
  </Context.Provider>

}


export default MarketProvider