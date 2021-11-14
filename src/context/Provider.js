import React, { createContext, useEffect, useState } from 'react'
import bitcoinManager from '../blockchains/BitcoinManager';
import bscManager from '../blockchains/BscManager';
import ethManager from '../blockchains/EthManager';
import useCoins from '../hooks/useCoins'
import useFCASRating from '../hooks/useFCASRating'
import useMarketListing from '../hooks/useMarketListing'
import HttpService from '../services/HttpService';

export const Context = createContext()

const MainProvider = props => {

  const [state, setState] = useState({
    user: {},
    wallet: {},
    coins: [],
    coinManager: { ETH: ethManager, BNB: bscManager, BTC: bitcoinManager }
  })
  // const { coins, setCoin } = useCoins()
  const { FCASList } = useFCASRating()
  const { MarketListing } = useMarketListing()

  useEffect(() => {
    new HttpService("", {
      "uniqueId": "abc1",
      "action": "supportedCoins",
    }).Post(response => {
      if (response.length > 0) {
        setState({ ...state, coins: response })
      }
    })
  }, [])

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