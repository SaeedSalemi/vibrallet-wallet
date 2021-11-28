import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { createContext, useCallback, useEffect, useState } from 'react'
import HttpService from '../services/HttpService'

export const Context = createContext()

const MarketProvider = props => {

  const [state, setState] = useState({
    FCASList: [],
    FCASSort: 'name',

    MarketListing: [],
    MarketListingSort: 'name',
    MarketListingPageSize: 25,
    MarketListingPageNumber: 1
  })
  const [favCoins, setFavCoins] = useState([])

  const dispatch = value => {
    setState({ ...state, ...value })
  }



  useEffect(() => {
    AsyncStorage.getItem("marketFavCoins").then(res => {
      setFavCoins(JSON.parse(res))
    })
  }, [])

  useEffect(() => {
    if (favCoins) {
      if (favCoins.length) {
        AsyncStorage.setItem("marketFavCoins", JSON.stringify(favCoins))
      }
    }

  }, [favCoins])



  const adder = async (item) => {
    const index = favCoins.findIndex((itm) => itm.symbol === item.symbol)
    if (index < 0) {
      setFavCoins([...favCoins, item])
    } else {
      setFavCoins(favCoins.splice(index, 1))
    }
  }

  const deleteFav = (item) => {
    const index = favCoins.findIndex((itm) => itm.symbol === item.symbol)
    if (index >= 0) {
      setFavCoins(favCoins.splice(index, 1))
    }
  }



  // ==================

  useEffect(() => {
    fetchData()
    fetchFCASData()
  }, [])

  const marketPagination = (page) => {
    setState((state) => {
      state.MarketListingPageNumber += page
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
        // "filter": "btc"
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
        "pageSize": 50,
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

  return <Context.Provider value={{ ...state, adder, deleteFav, favCoins, dispatch, changeMarketSort, marketPagination, changeFCASSort }}>
    {props.children}
  </Context.Provider>

}


export default MarketProvider