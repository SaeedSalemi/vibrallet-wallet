import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { createContext, useEffect, useState, useMemo, useCallback } from 'react'
import { showMessage } from 'react-native-flash-message';
import { useSelector } from 'react-redux';
import bitcoinManager from '../blockchains/BitcoinManager';
import bscManager from '../blockchains/BscManager';
import ethManager from '../blockchains/EthManager';
import { useReduxWallet } from '../hooks/useReduxWallet';
import useWalletConnect from '../hooks/useWalletConnect';
import HttpService from '../services/HttpService';
import { getToken } from '../utils/Functions';
import { Linking } from 'react-native'

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
    FCASSort: '-score',
    FCASPageSize: 10,
    FCASPageNumber: 1,
    FCASFilter: '',

    MarketScreenActiveFilter: 'Market'
  })

  let walletConnect = useWalletConnect({ coins: state.coins });

  // Market Fav Coins
  const [favCoins, setFavCoins] = useState([])
  const [fcasFavCoins, setFcasFavCoins] = useState([])
  // const "fcasFav" = 'FCAS_FAV_COIN_STORAGE'

  // const wallet = useSelector(state => { state.wallets.data ? state.wallets.data[0] : null })
  // console.log('wallet', wallet)

  const dispatch = value => setState({ ...state, ...value })

  const setCoinsToSupport = items => {
    state.coins = items
    setState({ ...state })
  }


  useEffect(() => {
    Linking.addEventListener('url', ({ url }) => {
      console.log('addEventListener =====> ', url);
      if (url.startsWith("wc:")) {
        walletConnect.pair(url);
      }
    });

    Linking.getInitialURL().then(url => {
      // console.log('startUrl ---------->>>>>>>>>>>>>>>>>> ', url);
      if (url != null &&  url.startsWith("wc:")) {
        walletConnect.pair(url);
      }
    });
  }, [])

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
      console.log('supported', result)
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


  const setMarketScreenActiveFilter = (tabScreen) => {
    state.MarketScreenActiveFilter = tabScreen
    setState({ ...state })
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
    if (favCoins === null) {
      AsyncStorage.setItem("marketFavCoins", JSON.stringify([]))
      setFavCoins([item])
    } else {
      const index = favCoins.findIndex((itm) => itm.symbol === item.symbol)
      if (index < 0) {
        setFavCoins([...favCoins, item])
      } else {
        setFavCoins(favCoins.splice(index, 1))
      }
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

  const setFCASSearchFilter = (text) => {
    state.FCASFilter = text
    fetchFCASData(true)
  }

  const adderFCASFAV = (item) => {
    if (fcasFavCoins === null) {
      AsyncStorage.setItem("fcasFavCoins", JSON.stringify([]))
      setFcasFavCoins([item])
    } else {
      const index = fcasFavCoins.findIndex((itm) => itm.symbol === item.symbol)
      if (index < 0) {
        setFcasFavCoins([...fcasFavCoins, item])
        console.log('added to fcas list', fcasFavCoins, item)
      } else {
        setFcasFavCoins(fcasFavCoins.splice(index, 1))
      }
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
        "sort": state.FCASSort,
        "filter": state.FCASFilter
      }
    }
    new HttpService(
      "", data
    ).Post(response => {
      if (response) {
        // const items = response.map(item => {
        //   new HttpService("",
        //     {
        //       "uniqueId": "123",
        //       "action": "priceChart",
        //       "data": {
        //         "symbol": `${item.symbol}`,
        //         "timeframe": "30m",
        //         "limit": 440,
        //         "responseType": "url",
        //         "height": 50,
        //         "width": 250,
        //       }
        //     }).Post(res => {
        //       if (res?.success === true) {
        //         item.svgUri = res.data.url
        //       }
        //     })
        //   return item
        // })

        setState((state) => {
          state.FCASList = [...state.FCASList, ...response]
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

  const getCoinBalance = coin => {
    return 0
    // if (!coinSymbol)
    //   return 0

    // let balance = 0
    // AsyncStorage.getItem("supportedCoins").then(data => {
    //   if (data !== null) {
    //     const parsedCoins = JSON.parse(data);
    //     for (let coin of parsedCoins) {
    //       if (coin["symbol"] === coinSymbol) {

    //         const wallet = useSelector(state => { state.wallets.data ? state.wallets.data[0] : null })
    //         console.log('wallet', wallet)
    //         if (wallet) {
    //           // let selectedCoin = state.coinManager[coinSymbol];
    //           // if (typeof selectedCoin.getWalletFromMnemonic === "function") {
    //           //   selectedCoin.getWalletFromMnemonic(wallet.backup)
    //           //     .then(wallet => {
    //           //       selectedCoin.getBalance(coin.address, false).then(result => {
    //           //         balance = parseFloat(result).toFixed(3)
    //           //         console.log('balance wallet', balance)
    //           //       })
    //           //     })
    //           //     .catch(ex => console.error('balance wallet error', ex))
    //           // }
    //         }
    //       }
    //       // if (coin.hasOwnProperty("balance")) {
    //       //   balance = parseFloat(coin["balance"]).toFixed(3)
    //       //   console.log('balance storage', balance)
    //       // } else {



    //       // }
    //     }
    //   }
    // }).catch(error => {
    //   console.log('error in supported coins', error)
    // })
    // return balance
  }


  return (
    <Context.Provider value={{
      ...state, setUserData, getCoinBalance, setCoin, hideCoinHandler, dispatch, getACoin, setUserProfile,
      adder, deleteFav, favCoins, fcasFavCoins, changeMarketSort, marketPagination, setMarketSearchFilter, fetchData,
      fetchFCASData, adderFCASFAV, deleteFCASFav, fcasPagination, changeFCASSort, setCoinsToSupport, setFCASSearchFilter, setMarketScreenActiveFilter,
      ...walletConnect
    }}>
      {props.children}
    </Context.Provider>
  )
}

export default MainProvider