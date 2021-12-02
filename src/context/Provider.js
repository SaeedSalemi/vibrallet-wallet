import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState, useMemo, useCallback } from 'react'
import { useSelector } from 'react-redux';
import bitcoinManager from '../blockchains/BitcoinManager';
import bscManager from '../blockchains/BscManager';
import ethManager from '../blockchains/EthManager';
import HttpService from '../services/HttpService';

export const Context = createContext()

const MainProvider = props => {


  const [state, setState] = useState({
    user: {},
    wallet: {},
    coins: [],
    coinManager: { ETH: ethManager, BNB: bscManager, BTC: bitcoinManager },
    preDefinedCoinsColors: { BTC: '#F47169', BNB: '#FFCC01', ETH: '#7037C9', },
    // countries: []
    userProfile: '',

    MarketListing: [],
    MarketListingSort: 'name',
    MarketListingPageSize: 10,
    MarketListingPageNumber: 1,
    MarketListingFilter: '',


    FCASList: [],
    FCASSort: 'name',
    FCASPageSize: 10,
    FCASPageNumber: 1,
  })

  // Market Fav Coins
  const [favCoins, setFavCoins] = useState([])
  const [fcasFavCoins, setFcasFavCoins] = useState([])
  // const "fcasFav" = 'FCAS_FAV_COIN_STORAGE'

  const wallet = useSelector(state => { state.wallets.data ? state.wallets.data[0] : null })

  const dispatch = value => setState({ ...state, ...value })

  useEffect(() => {
    AsyncStorage.getItem('userImage').then(res => {
      if (res) {
        setState({ ...state, userProfile: `data:image/gif;base64,${res}` })
      }
    }).catch(errr => {
      console.log('set base 64 user profile image', errr)
    })
  }, [state.userProfile])


  useEffect(() => {

    AsyncStorage.getItem("supportedCoins").then(result => {
      if (result !== null) {
        let supportedCoinData = JSON.parse(result)
        if (supportedCoinData && supportedCoinData.length > 0) {
          setState({ ...state, coins: supportedCoinData })
        }
      }
    })

    getRegisteredUser()

  }, [])

  useEffect(() => {
    fetchData()
    fetchFCASData()
  }, [])

  // ===================== Profile 

  const setUserData = (user) => {
    setState((state) => {
      state.user = user
      return { ...state }
    })
  }
  const setUserProfile = profile => {
    setState({ ...state, userProfile: profile })
  }

  const getRegisteredUser = () => {
    AsyncStorage.getItem("regUser").then(userData => {

      const userInfo = {}
      if (userData) {
        let parsedUserData = JSON.parse(userData)
        if (parsedUserData.username)
          userInfo.username = parsedUserData.username
        if (parsedUserData.email)
          userInfo.email = parsedUserData.email
        if (parsedUserData.country)
          userInfo.country = parsedUserData.country
        if (parsedUserData.phone)
          userInfo.phone = parsedUserData.phone
      }

      setUserData(userInfo)

    }).catch(error => {
      console.log('error in reg user', error)
    })
  }

  //============================= Market ===============
  useEffect(() => {
    AsyncStorage.getItem("marketFavCoins").then(res => {
      setFavCoins(JSON.parse(res))
    }).catch(error => {
      console.log('error form Market FAV coins', error)
    })
  }, [])

  useEffect(() => {
    if (favCoins !== null) {
      AsyncStorage.setItem("marketFavCoins", JSON.stringify(favCoins)).then().catch()
    }
  }, [favCoins])

  const setMarketSearchFilter = (text) => {
    state.MarketListingFilter = text
    fetchData(true)
  }

  const adder = (item) => {
    const index = favCoins.findIndex((itm) => itm.symbol === item.symbol)
    if (index < 0) {
      setFavCoins([...favCoins, item])
    } else {
      setFavCoins(favCoins.splice(index, 1))
    }
  }

  const deleteFav = (item) => {
    setFavCoins(favCoins.filter((itm) => itm.symbol !== item.symbol))
  }

  const marketPagination = () => {
    state.MarketListingPageNumber = state.MarketListingPageNumber + 1
    fetchData()
  }

  const changeMarketSort = (sort) => {
    state.MarketListingSort = sort
    fetchData(true)
  }


  const fetchData = (clear = false) => {
    if (clear) {
      state.MarketListing = []
      state.MarketListingPageNumber = 1

    }

    const data = {
      "uniqueId": "123",
      "action": "marketListing",
      "data": {
        "pageSize": state.MarketListingPageSize,
        "pageNumber": state.MarketListingPageNumber,
        "sort": state.MarketListingSort,
        "filter": state.MarketListingFilter
      }
    }

    new HttpService(
      "", data
    ).Post((response) => {
      if (response) {
        setState((state) => {
          state.MarketListing = [...state.MarketListing, ...response]
          return { ...state }
        })

      }
    }, err => {
      console.log('MARKET FETCH Error', err)
    })
  }

  // ============================== FCAS

  useEffect(() => {
    AsyncStorage.getItem("fcasFav").then(res => {
      setFcasFavCoins(JSON.parse(res))
    }).catch(err => {
      console.log('error form FCAS FAV coins', err)
    })
  }, [])


  useEffect(() => {
    if (fcasFavCoins !== null) {
      AsyncStorage.setItem("fcasFav", JSON.stringify(fcasFavCoins)).then().catch()
    }
  }, [fcasFavCoins])

  const adderFCASFAV = (item) => {
    alert(item.symbol)
    const index = fcasFavCoins.findIndex((itm) => itm.symbol === item.symbol)
    if (index < 0) {
      setFcasFavCoins([...fcasFavCoins, item])
      console.log('added to fcas list', fcasFavCoins, item)
    } else {
      setFcasFavCoins(fcasFavCoins.splice(index, 1))
    }
  }

  const deleteFCASFav = (item) => {
    setFcasFavCoins(fcasFavCoins.filter((itm) => itm.symbol !== item.symbol))
  }


  const fcasPagination = () => {
    state.FCASPageNumber = state.FCASPageNumber + 1
    fetchFCASData()
  }

  const changeFCASSort = (sort) => {
    state.FCASSort = sort
    fetchFCASData(true)
  }

  const fetchFCASData = (clear = false) => {
    if (clear) {
      state.FCASList = []
      state.FCASPageNumber = 1
    }

    const data = {
      "uniqueId": "123",
      "action": "fcasListing",
      "data": {
        "pageSize": state.FCASPageSize,
        "pageNumber": state.FCASPageNumber,
        "sort": state.FCASSort
      }
    }
    new HttpService(
      "", data
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
          state.FCASList = [...state.FCASList, ...items]
          return { ...state }
        })
      }
    }, err => {
      console.log('FCAS FETCH Error', err)
    })
  }

  // ================================================ COINS

  const getACoin = symbol => {
    return state.coins.find(coin => coin.symbol === symbol)
  }


  const setCoin = (value) => {
    setState({ ...state, coins: value })
  }


  // const supportedCoins = async () => {
  //   try {
  //     const result = await AsyncStorage.getItem("supportedCoins")

  //     if (result !== null) {
  //       let supportedCoinData = JSON.parse(result)
  //       if (supportedCoinData && supportedCoinData.length > 0) {
  //         setState({ ...state, coins: supportedCoinData })
  //       }
  //     } else {

  //       new HttpService("", {
  //         "uniqueId": "abc1",
  //         "action": "supportedCoins",
  //       }).Post(response => {
  //         if (response) {
  //           // if (wallet) {
  //           const items = response
  //           for (let item of items) {
  //             item.balance = 0
  //             item.color = state.preDefinedCoinsColors[item.symbol]
  //             item.hide = false
  //             item.fav = false
  //             let _w = generateWalletData(item.symbol)
  //             console.log('_w', _w)
  //           }
  //           setState({ ...state, coins: items })

  //           AsyncStorage.setItem("supportedCoins", JSON.stringify(items)).then().catch()
  //         }
  //       })
  //     }
  //   }
  //   catch (e) {
  //     console.log(e)
  //   }

  // }

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
                console.log('----------> In the Provider: ', coinSymbol);
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
    }).catch(error => {
      console.log('error in supported coins', error)
    })
    return balance
  }

  return (
    <Context.Provider value={{
      ...state, setUserData, getCoinBalance, setCoin, hideCoinHandler, dispatch, getACoin, setUserProfile,
      adder, deleteFav, favCoins, fcasFavCoins, changeMarketSort, marketPagination, setMarketSearchFilter, fetchData,
      fetchFCASData, adderFCASFAV, deleteFCASFav, fcasPagination, changeFCASSort
    }}>
      {props.children}
    </Context.Provider>
  )
}

export default MainProvider