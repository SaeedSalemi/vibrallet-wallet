import React, { createContext, useCallback, useEffect, useState } from 'react'
import HttpService from '../services/HttpService'

export const Context = createContext()

const MarketProvider = props => {

  const [state, setState] = useState({
    FCASList: [],
    FCASSort: 'name',

    MarketListing: [],
    MarketListingSort: 'name',
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
        "pageNumber": 1,
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
        "pageSize": 15,
        "pageNumber": 1,
        "sort": state.FCASSort
      }
    }
    ).Post(response => {
      if (response) {

        const items = response.map(item => {

          new HttpService("",
            {
              "uniqueId": "123",
              "action": "priceChart",
              "data": {
                "symbol": `${item.symbol}`,
                "timeframe": "30m",
                "limit": 440,
                "responseType": "url",
                "height": 50,
                "width": 250,
              }
            }).Post(res => {
              if (res?.success === true) {
                item.svgUri = res.data.url
                console.log('item of fcas chart', item)
              }
            })
          return item
        })

        setState((state) => {
          state.FCASList = items
          return { ...state }
        })


      }

      // if (response) {
      //   setState((state) => {
      //     state.FCASList = response
      //     return { ...state }
      //   })

      // }
    })
  }, [state])

  return <Context.Provider value={{ ...state, dispatch, changeMarketSort, marketPagination, changeFCASSort }}>
    {props.children}
  </Context.Provider>

}


export default MarketProvider