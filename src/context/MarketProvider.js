import React, { createContext, useCallback, useEffect, useState } from 'react'
import HttpService from '../services/HttpService'

export const Context = createContext()

const MarketProvider = props => {

  const [state, setState] = useState({
    FCASList: [],
    FCASSort: 'name',

    MarketListing: [],
    MarketListingSort: 'symbol',
    MarketListingPageSize: 15,
    MarketListingPageNumber: 1
  })

  const dispatch = value => {
    setState({ ...state, ...value })
  }

  useEffect(() => {
    fetchData()
    fetchFCASData()
  }, [])

  const marketPagination = (page) => {
    setState((state) => {
      state.MarketListingPageNumber = page
      return { ...state }
    })
    fetchData()
  }

  const changeFCASSort = (sort) => {
    setState((state) => {
      state.FCASSort = sort
      return { ...state }
    })
    fetchData()
  }

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
        "sort": state.MarketListingSort,
        "filter": "btc"
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


  const fetchFCASData = useCallback(() => {
    new HttpService(
      "", {
      "uniqueId": "123",
      "action": "fcasListing",
      "data": {
        "pageSize": 1000,
        "pageNumber": 1,
        "sort": state.FCASSort
      }
    }
    ).Post(response => {
      if (response) {
        setState((state) => {
          state.FCASList = response
          return { ...state }
        })

      }
    })
  }, [state])

  return <Context.Provider value={{ ...state, dispatch, changeMarketSort, marketPagination, changeFCASSort }}>
    {props.children}
  </Context.Provider>

}


export default MarketProvider