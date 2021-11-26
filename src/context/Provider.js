import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState, useMemo } from 'react'
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
    coinManager: { ETH: ethManager, BNB: bscManager, BTC: bitcoinManager },
    preDefinedCoinsColors: { BTC: '#F47169', BNB: '#FFCC01', ETH: '#7037C9', },
  })
  // const { coins, setCoin } = useCoins()


  const wallet = useSelector(state => {
    state.wallets.data ? state.wallets.data[0] : null
  }
  )



  const getACoin = symbol => {
    return state.coins.find(coin => coin.symbol === symbol)
  }



  const supportedCoins = async () => {
    try {
      const result = await AsyncStorage.getItem("supportedCoins")

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
          if (response) {

            const items = response
            for (let item of items) {
              item.balance = 0
              item.color = state.preDefinedCoinsColors[item.symbol]
              item.hide = false
            }
            setState({ ...state, coins: items })
            setToStorage("supportedCoins", JSON.stringify(items))
          }
        })
      }
    }
    catch (e) {
      console.log(e)
    }

  }

  useEffect(() => {
    supportedCoins()
  }, [])

  const setCoin = (value) => {
    setState({ ...state, coins: value })
  }
  const dispatch = value => setState({ ...state, ...value })

  const hideCoinHandler = (symbol) => {
    let coins = state.coins.map(item => {
      if (item.symbol === symbol) {
        item.hide = !item.hide
      }
      return item
    })
    setState({ ...state, coins })
  }

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
                let selectedCoin = state.coinManager[coinSymbol];
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

  // FCASList, MarketListing,
  return (
    <Context.Provider value={{ ...state, getCoinBalance, setCoin, hideCoinHandler, dispatch, getACoin }}>
      {props.children}
    </Context.Provider>
  )
}

export default MainProvider