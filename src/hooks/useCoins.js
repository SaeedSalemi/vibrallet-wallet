import React, { useState, useEffect, useLayoutEffect } from 'react'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import bscManager from '../blockchains/BscManager'
import ethManager from '../blockchains/EthManager'
import AppIcon from '../components/common/AppIcon'
import HttpService from '../services/HttpService'
import { useSelector } from 'react-redux'

const useCoins = (coinSymbol = "ETH") => {

  const [state, setState] = useState()
  useLayoutEffect(() => {
    new HttpService("", {
      "uniqueId": "abc1",
      "action": "quotedPrice",
      "data": {
        "symbol": coinSymbol
      }
    }).Post(res => {
      const coin = {
        [coinSymbol]: {
          price: parseFloat(res.data.rate).toFixed(2),
          change: parseFloat(res.data.percentChange).toFixed(2)
        }
      }
      setState({ ...state, coin })
    })
  }, [coinSymbol, state])

  return { state }



  // =============================================================================
  // const BSCIcon = () => (
  //   <AppIcon style={{ width: 25, height: 25 }} name="binance" />
  // )
  // const EthIcon = () => <FontAwesome5Icon size={25} color="#7037C9" name="ethereum" />

  // const wallet = useSelector(state =>
  //   state.wallets.data ? state.wallets.data[0] : null
  // )

  // const [state, setState] = useState({
  //   coins:
  //     [
  //       {
  //         title: 'Ethereum',
  //         slug: 'ETH',
  //         symbol: "ETHUSDT",
  //         price: '0',
  //         currency: '$',
  //         icon: <EthIcon />,
  //         increase: false,
  //         color: "purple",
  //         changeAmount: '6.2%',
  //         chart: 'sampleChart2',
  //         amount: 0,
  //         change: 0,
  //         balance: 0.01,
  //         vol: '0',
  //         lastPrice: '0',
  //         fav: false,
  //        

  //         // wallet: ethManager.getWalletFromMnemonic(wallet.backup)
  //         //   .then(wallet => {
  //         //     // saveToStorage(selectCoin, JSON.stringify(wallet))
  //         //   }).catch(ex => console.error('wallet', ex))
  //       },
  //       {
  //         title: 'Binance',
  //         slug: 'BSC',
  //         change: 0,
  //         price: '0',
  //         currency: '$',
  //         color: "yellow",
  //         increase: true,
  //         symbol: "BNBUSDT",
  //         icon: <BSCIcon />,
  //         changeAmount: '1.4%',
  //         chart: 'sampleChart3',
  //         amount: 0,
  //         balance: 0.01,
  //         vol: '0',
  //         lastPrice: '0',
  //         fav: false,
  //         hide: false,
  //         // wallet: bscManager.getWalletFromMnemonic(wallet.backup)
  //         //   .then(wallet => {
  //         //     // saveToStorage(selectCoin, JSON.stringify(wallet))
  //         //   }).catch(ex => console.error('wallet', ex))
  //       },
  //     ]
  // })

  // const [state, setState] = useState()
  // const setCoin = (value) => {
  //   setState({ ...state, coins: value })
  // }

  // const { coins } = state

  // useEffect(() => {
  //   for (let item of state.coins) {

  //     new HttpService("", {
  //       "uniqueId": "abc1",
  //       "action": "quotedPrice",
  //       "data": {
  //         "symbol": item.symbol
  //       }
  //     }).Post(res => {
  //       let inx = coins.findIndex((itm) => itm.slug === item.slug)
  //       state.coins[inx]['price'] = parseFloat(res.data.rate).toFixed(2)
  //       state.coins[inx]['change'] = parseFloat(res.data.percentChange).toFixed(2)
  //       setState({ ...state })
  //     })

  //   }
  // }, [coins])



  // return { coins, setCoin }

}


export default useCoins