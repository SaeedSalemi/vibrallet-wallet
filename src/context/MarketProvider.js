import React, { createContext, useCallback, useEffect, useState } from 'react'
import HttpService from '../services/HttpService'

export const Context = createContext()

const MarketProvider = props => {

  const [state, setState] = useState({
    FCASList: [],
    MarketListing: [],
    MarketListingSort: 'symbol',
    MarketListingPageSize: 20,
    MarketListingPageNumber: 1
  })

  const dispatch = value => {
    setState({ ...state, ...value })
  }

  useEffect(() => {
    fetchData()
  }, [])

  const changeMarketSort = (sort) => {
    setState((state) => {
      state.MarketListingSort = sort
      return { ...state }
    })
    fetchData()
  }

  const fetchData = useCallback(() => {
    new HttpService(
      "", {
      "uniqueId": "123",
      "action": "marketListing",
      "data": {
        "pageSize": state.MarketListingPageSize,
        "pageNumber": state.MarketListingPageNumber,
        "sort": state.MarketListingSort
      }
    }
    ).Post(response => {
      if (response) {
        setState((state) => {
          state.MarketListing = response
          return { ...state }
        })

      }
    })
  }, [state])

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

  return <Context.Provider value={{ ...state, dispatch, changeMarketSort }}>
    {props.children}
  </Context.Provider>

}


export default MarketProvider