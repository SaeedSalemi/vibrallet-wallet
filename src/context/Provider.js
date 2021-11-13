import React, { createContext, useEffect, useState } from 'react'
import useCoins from '../hooks/useCoins'
import useFCASRating from '../hooks/useFCASRating'
import useMarketListing from '../hooks/useMarketListing'
import HttpService from '../services/HttpService';

export const Context = createContext()

const MainProvider = props => {

  const [state, setState] = useState({
    user: {},
    wallet: {},
    coins: []
  })
  const [render, setRender] = useState(false)
  // const { coins, setCoin } = useCoins()
  const { FCASList } = useFCASRating()
  const { MarketListing } = useMarketListing()

  useEffect(() => {
    getCoins()
  }, [])

  const getCoins = () => {
    new HttpService("", {
      "uniqueId": "abc1",
      "action": "supportedCoins",
    }).Post(res => {
      setState({ ...state, coins: res })
    })
  }

  const setCoin = (value) => {
    setState({ ...state, coins: value })
  }
  const dispatch = value => setState({ ...state, ...value })

  return (
    <Context.Provider value={{ ...state, FCASList, MarketListing, setCoin, dispatch }}>
      {props.children}
    </Context.Provider>
  )
}

export default MainProvider