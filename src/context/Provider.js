import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import bitcoinManager from '../blockchains/BitcoinManager';
import bscManager from '../blockchains/BscManager';
import ethManager from '../blockchains/EthManager';
import useFCASRating from '../hooks/useFCASRating'
import useMarketListing from '../hooks/useMarketListing'
import HttpService from '../services/HttpService';
import { setToStorage } from '../utils/Functions';

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

  const wallet = useSelector(state => {
    state.wallets.data ? state.wallets.data[0] : null
  }
  )

  useEffect(() => {
    AsyncStorage.getItem("supportedCoins")
      .then(result => {
        if (result !== null) {
          let supportedCoinData = JSON.parse(result)
          if (supportedCoinData && supportedCoinData.length > 0) {
            setState({ ...state, coins: supportedCoinData })
          }
        } else {
          new HttpService("", {
            "uniqueId": "abc1",
            "action": "supportedCoins",
          }).Post(response => {
            if (response.length > 0) {
              const setBalanceToResponse = response.forEach(coin => coin.balance = 0)
              setState({ ...state, coins: setBalanceToResponse })
              setToStorage("supportedCoins", JSON.stringify(setBalanceToResponse))
            }
          })
        }

      })
      .catch(error => console.log('error', error))
  }, [])

  const setCoin = (value) => {
    setState({ ...state, coins: value })
  }
  const dispatch = value => setState({ ...state, ...value })


  const getCoinBalance = coinSymbol => {
    if (!coinSymbol)
      return 0

    let balance = 0
    AsyncStorage.getItem("supportedCoins").then(data => {
      if (data !== null) {
        const parsedCoins = JSON.parse(data);
        for (let coin of parsedCoins) {
          if (coin["symbol"] === coinSymbol)
            if (coin.hasOwnProperty("balance")) {
              balance = parseFloat(coin["balance"]).toFixed(3)
            } else {

              if (wallet) {
                let selectedCoin = state.coinManager[coinSymbolxxz];
                if (typeof selectedCoin.getWalletFromMnemonic === "function") {
                  selectedCoin.getWalletFromMnemonic(wallet.backup)
                    .then(wallet => {
                      selectedCoin.getBalance(wallet?.address, false).then(result => {
                        balance = parseFloat(result).toFixed(3)
                      })
                    })
                    .catch(ex => console.error('balance wallet error', ex))
                }
              }

            }
        }
      }
    })

    return balance
  }


  return (
    <Context.Provider value={{ ...state, getCoinBalance, FCASList, MarketListing, setCoin, dispatch }}>
      {props.children}
    </Context.Provider>
  )
}

export default MainProvider