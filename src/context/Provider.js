import React, {
	createContext,
	useEffect,
	useState,
	useMemo,
	useCallback,
	useLayoutEffect,
} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { showMessage } from 'react-native-flash-message'
import bitcoinManager from '../blockchains/BitcoinManager'
import bscManager from '../blockchains/BscManager'
import ethManager from '../blockchains/EthManager'
import { useReduxWallet } from '../hooks/useReduxWallet'
// import useWalletConnect from '../hooks/useWalletConnect';
import HttpService from '../services/HttpService'
import { getToken } from '../utils/Functions'
import { Linking, Platform } from 'react-native'
import WalletConnect from '@walletconnect/client'
import { checkNetworkStauts } from './../utils/Functions'
import { getCoinBalance } from '../utils/WalletFunctions'
// import { getCoinBalance } from './../utils/WalletFunctions'

export const Context = createContext()

const MainProvider = props => {
	const [state, setState] = useState({
		user: {},
		wallet: {},
		coins: [],
		coinManager: { ETH: ethManager, BNB: bscManager, BTC: bitcoinManager },
		preDefinedCoinsColors: { BTC: '#F47169', BNB: '#FFCC01', ETH: '#7037C9' },
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

		MarketScreenActiveFilter: 'Market',

		sessionRequestPair: {},
	})

	const [connector, setConnector] = useState(null)

	/*
  checking network connection globaly
  */
	// useLayoutEffect(() => {

	// }, [])

	// let walletConnect = useWalletConnect({ coins: state.coins });
	let walletConnect = async uri => {
		const connector = new WalletConnect({
			// Required
			uri: uri,
			// Required
			clientMeta: {
				description: 'WalletConnect Vibranium',
				url: 'https://walletconnect.org',
				icons: ['https://walletconnect.org/walletconnect-logo.png'],
				name: 'WalletConnect Vibranium',
			},
		})

		// Subscribe to session requests
		connector.on('session_request', (error, payload) => {
			if (error) {
				throw error
			}

			// Handle Session Request
			console.log('session_request  ,,,', JSON.stringify(payload))
			// setSessionRequest({ ...sessionRequest, payload: payload })

			setState({ ...state, sessionRequestPair: payload })

			let address = null
			let chainId = payload.params[0].chainId

			if (chainId === undefined || chainId == 1) {
				address = state.coins.find(p => p.symbol == 'ETH')?.address
			} else if (chainId == 56) {
				address = state.coins.find(p => p.symbol == 'BNB')?.address
			}

			if (!address || address == null) {
				return connector.rejectSession()
			}

			console.log('---->selected Address', address)
			// Approve Session
			connector.approveSession({
				accounts: [
					// required
					address,
				],
				chainId: chainId, // required
			})

			// AsyncStorage.setItem("sessionRequest", JSON.stringify(payload));

			/* payload:
      {
        id: 1,
        jsonrpc: '2.0'.
        method: 'session_request',
        params: [{
          peerId: '15d8b6a3-15bd-493e-9358-111e3a4e6ee4',
          peerMeta: {
            name: "WalletConnect Example",
            description: "Try out WalletConnect v1.0",
            icons: ["https://example.walletconnect.org/favicon.ico"],
            url: "https://example.walletconnect.org"
          }
        }]
      }
      */
		})

		// Subscribe to call requests
		connector.on('call_request', async (error, payload) => {
			if (error) {
				throw error
			}

			// Handle Call Request
			console.log('call_request  -->', JSON.stringify(payload))

			// connector.approveRequest({
			//   id: 1,
			//   result: "0x41791102999c339c844880b23950704cc43aa840f3739e365323cda4dfa89e7a"
			// });

			/* payload:
      {
        id: 1,
        jsonrpc: '2.0'.
        method: 'eth_sign',
        params: [
          "0xbc28ea04101f03ea7a94c1379bc3ab32e65e62d3",
          "My email is john@doe.com - 1537836206101"
        ]
      }
      */

			let address = null
			// let privateKey = null;

			let chainId = payload.params[0].chainId
			let selectedNetwork = null
			let selectedCoin = null
			if (chainId == 1) {
				selectedNetwork = ethManager
				selectedCoin = state.coins.find(p => p.symbol == 'ETH')
			} else if (chainId == 56) {
				selectedNetwork = bscManager
				selectedCoin = state.coins.find(p => p.symbol == 'BNB')
			}

			if (payload.method) {
				if (payload.method === 'eth_sendTransaction') {
					try {
						const txParams = {}
						txParams.to = payload.params[0].to
						txParams.from = payload.params[0].from
						txParams.value = payload.params[0].value
						txParams.gas = payload.params[0].gas
						txParams.gasLimit = payload.params[0].gasLimit
						txParams.gasPrice = payload.params[0].gasPrice
						txParams.data = payload.params[0].data
						const hash = await selectedNetwork.sendTransaction(
							txParams,
							selectedCoin.privateKey
						)
						connector.approveRequest({
							id: payload.id,
							result: hash,
						})
					} catch (error) {
						connector.rejectRequest({
							id: payload.id,
							error,
						})
					}
				} else if (payload.method === 'eth_sign') {
					let rawSig = null
					try {
						if (payload.params[2]) {
							throw new Error('Autosign is not currently supported')
							// Leaving this in case we want to enable it in the future
							// once WCIP-4 is defined: https://github.com/WalletConnect/WCIPs/issues/4
							// rawSig = await KeyringController.signPersonalMessage({
							// 	data: payload.params[1],
							// 	from: payload.params[0]
							// });
						} else {
							const data = payload.params[1]
							const from = payload.params[0]
							rawSig = await selectedNetwork.signTransaction(
								{
									data,
									from,
									meta: {
										title: meta && meta.name,
										url: meta && meta.url,
										icon: meta && meta.icons && meta.icons[0],
									},
									origin: WALLET_CONNECT_ORIGIN,
								},
								selectedCoin.privateKey
							)
						}
						connector.approveRequest({
							id: payload.id,
							result: rawSig,
						})
					} catch (error) {
						connector.rejectRequest({
							id: payload.id,
							error,
						})
					}
				} else if (payload.method === 'personal_sign') {
					let rawSig = null
					try {
						if (payload.params[2]) {
							throw new Error('Autosign is not currently supported')
							// Leaving this in case we want to enable it in the future
							// once WCIP-4 is defined: https://github.com/WalletConnect/WCIPs/issues/4
							// rawSig = await KeyringController.signPersonalMessage({
							// 	data: payload.params[1],
							// 	from: payload.params[0]
							// });
						} else {
							const data = payload.params[0]
							const from = payload.params[1]

							rawSig = await selectedNetwork.signTransaction({
								data,
								from,
								meta: {
									title: meta && meta.name,
									url: meta && meta.url,
									icon: meta && meta.icons && meta.icons[0],
								},
								// origin: WALLET_CONNECT_ORIGIN,
							})
						}
						this.walletConnector.approveRequest({
							id: payload.id,
							result: rawSig,
						})
					} catch (error) {
						this.walletConnector.rejectRequest({
							id: payload.id,
							error,
						})
					}
				} else if (
					payload.method === 'eth_signTypedData' ||
					payload.method === 'eth_signTypedData_v3'
				) {
					const { TypedMessageManager } = Engine.context
					try {
						const rawSig = await TypedMessageManager.addUnapprovedMessageAsync(
							{
								data: payload.params[1],
								from: payload.params[0],
								meta: {
									title: meta && meta.name,
									url: meta && meta.url,
									icon: meta && meta.icons && meta.icons[0],
								},
								origin: WALLET_CONNECT_ORIGIN,
							},
							'V3'
						)

						this.walletConnector.approveRequest({
							id: payload.id,
							result: rawSig,
						})
					} catch (error) {
						this.walletConnector.rejectRequest({
							id: payload.id,
							error,
						})
					}
				} else if (payload.method === 'eth_signTypedData_v4') {
					const { TypedMessageManager } = Engine.context
					try {
						const rawSig = await TypedMessageManager.addUnapprovedMessageAsync(
							{
								data: payload.params[1],
								from: payload.params[0],
								meta: {
									title: meta && meta.name,
									url: meta && meta.url,
									icon: meta && meta.icons && meta.icons[0],
								},
								origin: WALLET_CONNECT_ORIGIN,
							},
							'V4'
						)

						this.walletConnector.approveRequest({
							id: payload.id,
							result: rawSig,
						})
					} catch (error) {
						this.walletConnector.rejectRequest({
							id: payload.id,
							error,
						})
					}
				}
				this.redirectIfNeeded()
			}
		})

		connector.on('disconnect', (error, payload) => {
			if (error) {
				throw error
			}

			console.log('disconnect  ', JSON.stringify(payload))

			// Delete connector
			setConnector(null)
		})

		setConnector(connector)
	}

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
			console.log('addEventListener =====> ', url)
			if (url.startsWith('wc:')) {
				walletConnect.pair(url)
			}
		})

		Linking.getInitialURL().then(url => {
			// console.log('startUrl ---------->>>>>>>>>>>>>>>>>> ', url);
			if (url != null && url.startsWith('wc:')) {
				walletConnect.pair(url)
			}
		})
	}, [])

	useEffect(() => {
		AsyncStorage.getItem('userImage')
			.then(res => {
				if (res) {
					setState({ ...state, userProfile: `data:image/gif;base64,${res}` })
				}
			})
			.catch(errr => {
				console.log('set base 64 user profile image', errr)
			})
	}, [state.userProfile])

	useEffect(() => {
		AsyncStorage.getItem('supportedCoins').then(result => {
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
		InitData()
	}, [])

	const getTokenFromServer = async () => {
		return new Promise(async (resolve, reject) => {
			const cache_token = await AsyncStorage.getItem('token')
			if (cache_token) {
				axios.defaults.token = cache_token
				resolve()
			} else {
				console.log('amr', 'token not found in cache')
				axios({
					method: 'post',
					data: {
						uniqueId: 'abc',
						action: 'init',
					},
					url: 'https://appapi.vibrallet.com/',
					responseType: 'json',
					timeout: Platform.OS === 'android' ? 10000 : 12000,
					headers: {
						'X-Requested-With': 'XMLHttpRequest',
						'Content-Type': 'application/json',
					},
					maxRedirects: 1,
				})
					.catch(error => {
						console.group('init token')
						console.log(error)
						console.log('amr', 'token error', error)
						console.groupEnd()
					})
					.then(async response => {
						console.log('amr', 'token recivie', response.data)
						const token = response?.data.data.token
						await AsyncStorage.setItem('token', token)
						axios.defaults.token = token
						resolve()
					})
			}
		})
	}

	const InitData = async () => {
		if (await checkNetworkStauts()) {
			await getTokenFromServer()
			fetchData()
			fetchFCASData()
		}
	}
	// ===================== Profile

	const setUserData = user => {
		setState(state => {
			state.user = user
			return { ...state }
		})
	}
	const setUserProfile = profile => {
		setState({ ...state, userProfile: profile })
	}

	const setSessionRequestPair = payload => {
		alert('salam')
		console.log('payload in the session request pair', payload)
		setState({ ...state, sessionRequestPair: payload })
	}

	const getRegisteredUser = () => {
		AsyncStorage.getItem('regUser')
			.then(userData => {
				const userInfo = {}
				if (userData) {
					let parsedUserData = JSON.parse(userData)
					if (parsedUserData.username)
						userInfo.username = parsedUserData.username
					if (parsedUserData.email) userInfo.email = parsedUserData.email
					if (parsedUserData.country) userInfo.country = parsedUserData.country
					if (parsedUserData.phone) userInfo.phone = parsedUserData.phone
				}

				setUserData(userInfo)
			})
			.catch(error => {
				console.log('error in reg user', error)
			})
	}

	const setMarketScreenActiveFilter = tabScreen => {
		state.MarketScreenActiveFilter = tabScreen
		setState({ ...state })
	}

	//============================= Market ===============
	useEffect(() => {
		AsyncStorage.getItem('marketFavCoins')
			.then(res => {
				setFavCoins(JSON.parse(res))
			})
			.catch(error => {
				console.log('error form Market FAV coins', error)
			})
	}, [])

	useEffect(() => {
		if (favCoins !== null) {
			AsyncStorage.setItem('marketFavCoins', JSON.stringify(favCoins))
				.then()
				.catch()
		}
	}, [favCoins])

	const setMarketSearchFilter = text => {
		state.MarketListingFilter = text
		fetchData(true)
	}

	const adder = item => {
		if (favCoins === null) {
			AsyncStorage.setItem('marketFavCoins', JSON.stringify([]))
			setFavCoins([item])
		} else {
			const index = favCoins.findIndex(itm => itm.symbol === item.symbol)
			if (index < 0) {
				setFavCoins([...favCoins, item])
			} else {
				setFavCoins(favCoins.splice(index, 1))
			}
		}
	}

	const deleteFav = item => {
		setFavCoins(favCoins.filter(itm => itm.symbol !== item.symbol))
	}

	const marketPagination = () => {
		state.MarketListingPageNumber = state.MarketListingPageNumber + 1
		fetchData()
	}

	const changeMarketSort = sort => {
		state.MarketListingSort = sort
		fetchData(true)
	}

	const fetchData = (clear = false) => {
		if (clear) {
			state.MarketListing = []
			state.MarketListingPageNumber = 1
		}

		const data = {
			uniqueId: '123',
			action: 'marketListing',
			data: {
				pageSize: state.MarketListingPageSize,
				pageNumber: state.MarketListingPageNumber,
				sort: state.MarketListingSort,
				filter: state.MarketListingFilter,
			},
		}

		new HttpService('', data).Post(
			response => {
				if (response) {
					setState(state => {
						state.MarketListing = [...state.MarketListing, ...response]
						return { ...state }
					})
				}
			},
			err => {
				console.log('MARKET FETCH Error', err)
			}
		)
	}

	// ============================== FCAS

	useEffect(() => {
		AsyncStorage.getItem('fcasFav')
			.then(res => {
				setFcasFavCoins(JSON.parse(res))
			})
			.catch(err => {
				console.log('error form FCAS FAV coins', err)
			})
	}, [])

	useEffect(() => {
		if (fcasFavCoins !== null) {
			AsyncStorage.setItem('fcasFav', JSON.stringify(fcasFavCoins))
				.then()
				.catch()
		}
	}, [fcasFavCoins])

	const setFCASSearchFilter = text => {
		state.FCASFilter = text
		fetchFCASData(true)
	}

	const adderFCASFAV = item => {
		if (fcasFavCoins === null) {
			AsyncStorage.setItem('fcasFavCoins', JSON.stringify([]))
			setFcasFavCoins([item])
		} else {
			const index = fcasFavCoins.findIndex(itm => itm.symbol === item.symbol)
			if (index < 0) {
				setFcasFavCoins([...fcasFavCoins, item])
				console.log('added to fcas list', fcasFavCoins, item)
			} else {
				setFcasFavCoins(fcasFavCoins.splice(index, 1))
			}
		}
	}

	const deleteFCASFav = item => {
		setFcasFavCoins(fcasFavCoins.filter(itm => itm.symbol !== item.symbol))
	}

	const fcasPagination = () => {
		state.FCASPageNumber = state.FCASPageNumber + 1
		fetchFCASData()
	}

	const changeFCASSort = sort => {
		state.FCASSort = sort
		fetchFCASData(true)
	}

	const fetchFCASData = (clear = false) => {
		if (clear) {
			state.FCASList = []
			state.FCASPageNumber = 1
		}

		const data = {
			uniqueId: '123',
			action: 'fcasListing',
			data: {
				pageSize: state.FCASPageSize,
				pageNumber: state.FCASPageNumber,
				sort: state.FCASSort,
				filter: state.FCASFilter,
			},
		}
		new HttpService('', data).Post(
			response => {
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
					if (response) {
						setState(state => {
							state.FCASList = [...state.FCASList, ...response]
							return { ...state }
						})
					}
				}
			},
			err => {
				console.log('FCAS FETCH Error', err)
			}
		)
	}

	// ================================================ COINS

	const getACoin = symbol => {
		return state.coins.find(coin => coin.symbol === symbol)
	}

	const setCoin = value => {
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

	const hideCoinHandler = symbol => {
		let coins = state.coins.map(item => {
			if (item.symbol === symbol) {
				item.hide = !item.hide
			}
			return item
		})
		setState({ ...state, coins })
	}

	const getUpdatedCoinBalance = async () => {
		const _coins = state.coins
		for (let item of _coins) {
			item.balance = await getCoinBalance(item)
		}
		setState({ ...state, coins: _coins })
		return _coins
	}

	return (
		<Context.Provider
			value={{
				...state,
				setUserData,
				getCoinBalance,
				setCoin,
				hideCoinHandler,
				dispatch,
				getACoin,
				setUserProfile,
				adder,
				deleteFav,
				favCoins,
				fcasFavCoins,
				changeMarketSort,
				marketPagination,
				setMarketSearchFilter,
				fetchData,
				fetchFCASData,
				adderFCASFAV,
				deleteFCASFav,
				fcasPagination,
				changeFCASSort,
				setCoinsToSupport,
				setFCASSearchFilter,
				setMarketScreenActiveFilter,
				walletConnect,
				setSessionRequestPair,
				getUpdatedCoinBalance,
			}}
		>
			{props.children}
		</Context.Provider>
	)
}

export default MainProvider
