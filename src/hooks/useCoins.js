import React, { useState, useEffect, useLayoutEffect } from 'react'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import AppIcon from '../components/common/AppIcon'
import HttpService from '../services/HttpService'

const useCoins = () => {

  const BSCIcon = () => (
    <AppIcon style={{ width: 25, height: 25 }} name="binance" />
  )
  const EthIcon = () => <FontAwesome5Icon size={25} color="#7037C9" name="ethereum" />

  const [state, setState] = useState({
    coins:
      [
        {
          title: 'Ethereum',
          slug: 'ETH',
          symbol: "ETHUSDT",
          price: '0',
          currency: '$',
          icon: <EthIcon />,
          increase: false,
          color: "purple",
          changeAmount: '6.2%',
          chart: 'sampleChart2',
          amount: 0,
          change: 0,
          balance: 0.01,
          vol: '0',
          lastPrice: '0',
          fav: false,
          hide: false,
        },
        {
          title: 'Binance',
          slug: 'BSC',
          change: 0,
          price: '0',
          currency: '$',
          color: "yellow",
          increase: true,
          symbol: "BNBUSDT",
          icon: <BSCIcon />,
          changeAmount: '1.4%',
          chart: 'sampleChart3',
          amount: 0,
          balance: 0.01,
          vol: '0',
          lastPrice: '0',
          fav: false,
          hide: false,
        },
      ]
  })


  const { coins } = state

  useEffect(() => {
    for (let item of state.coins) {

      new HttpService("", {
        "uniqueId": "abc1",
        "action": "quotedPrice",
        "data": {
          "symbol": item.symbol
        }
      }).Post(res => {
        let inx = coins.findIndex((itm) => itm.slug === item.slug)
        state.coins[inx]['price'] = parseFloat(res.data.rate).toFixed(2)
        state.coins[inx]['change'] = parseFloat(res.data.percentChange).toFixed(2)
        setState({ ...state })
      })

    }
  }, [coins])



  return coins

}


export default useCoins