import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState, useMemo, useCallback } from 'react'
import { useSelector } from 'react-redux';
import bitcoinManager from '../blockchains/BitcoinManager';
import bscManager from '../blockchains/BscManager';
import ethManager from '../blockchains/EthManager';
import HttpService from '../services/HttpService';
// import { setToStorage } from '../utils/Functions';

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
  })

  // Market Fav Coins
  const [favCoins, setFavCoins] = useState([])
  const [fcasFavCoins, setFcasFavCoins] = useState([])
  const FCAS_FAV_COINS_STORAGE = 'FCAS_FAV_COIN_STORAGE'

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
    supportedCoins()
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
    console.log('fetch data is loading')
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
        console.log('setMarketSearchFilter', { data: response });
        setState((state) => {
          state.MarketListing = [...state.MarketListing, ...response]
          return { ...state }
        })

      }
    }, err => {
    })
  }

  // ============================== FCAS

  useEffect(() => {
    AsyncStorage.getItem(FCAS_FAV_COINS_STORAGE).then(res => {
      setFcasFavCoins(JSON.parse(res))
    }).catch(err => {
      console.log('error get from storage FCAS', err)
    })
  }, [])


  useEffect(() => {
    if (fcasFavCoins !== null) {
      AsyncStorage.setItem(FCAS_FAV_COINS_STORAGE, JSON.stringify(fcasFavCoins)).then().catch()
    }
  }, [fcasFavCoins])

  const adderFCASFAV = (item) => {
    const index = fcasFavCoins.findIndex((itm) => itm.symbol === item.symbol)
    if (index < 0) {
      setFcasFavCoins([...fcasFavCoins, item])
    } else {
      setFcasFavCoins(fcasFavCoins.splice(index, 1))
    }

  }

  const deleteFCASFav = (item) => {
    const index = fcasFavCoins.findIndex((itm) => itm.symbol === item.symbol)
    if (index >= 0) {
      setFavCoins(fcasFavCoins.splice(index, 1))
    }
  }



  const changeFCASSort = (sort) => {
    setState((state) => {
      state.FCASSort = sort
      return { ...state }
    })
    // fetchData()
  }

  const fetchFCASData = useCallback(() => {
    // new HttpService(
    //   "", {
    //   "uniqueId": "123",
    //   "action": "fcasListing",
    //   "data": {
    //     "pageSize": 50,
    //     "pageNumber": 1,
    //     "sort": state.FCASSort
    //   }
    // }
    // ).Post(response => {
    //   if (response) {

    //     const items = response.map(item => {

    //       new HttpService("",
    //         {
    //           "uniqueId": "123",
    //           "action": "priceChart",
    //           "data": {
    //             "symbol": `${item.symbol}`,
    //             "timeframe": "30m",
    //             "limit": 440,
    //             "responseType": "url",
    //             "height": 50,
    //             "width": 250,
    //           }
    //         }).Post(res => {
    //           if (res?.success === true) {
    //             item.svgUri = res.data.url
    //           }
    //         })
    //       return item
    //     })

    //     setState((state) => {
    //       state.FCASList = items
    //       return { ...state }
    //     })


    //   }
    // })
  }, [state])

  // ================================================ COINS

  const getACoin = symbol => {
    return state.coins.find(coin => coin.symbol === symbol)
  }


  const setCoin = (value) => {
    setState({ ...state, coins: value })
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
            // if (wallet) {
            const items = response
            for (let item of items) {
              item.balance = 0
              item.color = state.preDefinedCoinsColors[item.symbol]
              item.hide = false
              item.fav = false
              // let selectedCoin = coinManager[item.symbol];
              // if (typeof selectedCoin.getWalletFromMnemonic === "function") {
              //   coinInfo = selectedCoin.getWalletFromMnemonic(wallet.backup)
              //   item.address = coinInfo?.address
              //   item.publicKey = coinInfo?.publicKey
              //   item.privateKey = coinInfo?.privateKey
              // }
            }
            setState({ ...state, coins: items })
            // setToStorage("supportedCoins", JSON.stringify(items))
            AsyncStorage.setItem("supportedCoins", JSON.stringify(items)).then().catch()
            // }
          }
        })
      }
    }
    catch (e) {
      console.log(e)
    }

  }

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
      adder, deleteFav, favCoins, fcasFavCoins, adderFCASFAV, deleteFCASFav, changeMarketSort, marketPagination, changeFCASSort, setMarketSearchFilter, fetchData
    }}>
      {props.children}
    </Context.Provider>
  )
}

export default MainProvider