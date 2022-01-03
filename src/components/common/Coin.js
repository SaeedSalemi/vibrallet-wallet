import { useNavigation } from '@react-navigation/core'
import React, { useContext, useEffect, useState, useLayoutEffect } from 'react'
import { View, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import { routes } from '../../config/routes'
import { globalStyles } from '../../config/styles'
// import useSVGChart from '../../hooks/useSVGChart'
import { coins } from '../../screens/app/HomeStack/CreatePriceAlertScreen'
import AppSwitch from './AppSwitch'
import AppText from './AppText'
import HR from './HR/HR'
import SwapableRow from './Swapable/SwapableRow'
import { SvgUri } from 'react-native-svg'
import HttpService from '../../services/HttpService'
// import { useSelector } from 'react-redux'
import { Context } from '../../context/Provider'
import { useReduxWallet } from '../../hooks/useReduxWallet'
import { getCoinBalance } from './../../utils/WalletFunctions'


export default function Coin({
	coin,
	index,
	length,
	noChart,
	noPrice,
	hideDetails,
	hasSwitch,
	onPress,
	onHideHandler,
}) {
	const __balance = useReduxWallet(coin)
	const { navigate } = useNavigation()
	// const getSVGUri = useSVGChart(`${coin.symbol}USDT`)
	const [isLoading, setIsLoading] = useState(true)
	const [state, setState] = useState({
		rate: 0,
		percentChange: 0,
		amount: 0,
		balance: 0
	})

	const [coinLogo, setCoinLogo] = useState('')

	const [coinBalance, setcoinBalance] = useState(0)

	useLayoutEffect(() => {
		getCoinBalance(coin).then(resultBalance => {
			console.log("balance result", resultBalance)
			setcoinBalance(resultBalance)
		}).catch(errBalance => {
			console.log('error in get balance', errBalance)
		})
	}, [])

	useLayoutEffect(() => {
		try {
			new HttpService("",
				{
					"uniqueId": "123",
					"action": "priceChart",
					"data": {
						"symbol": `${coin.symbol}`,
						"timeframe": "30m",
						"limit": 440,
						"responseType": "url",
						"height": 50,
						"width": 250,
					}
				}).Post(res => {
					if (res?.success === true) {
						// setState(res.data.url)
						setCoinLogo(res.data.url)
					}
				})
		} catch (error) {
			console.log('error to load coin svg', error)
			setCoinLogo('')
		}
	}, [coin.symbol])

	useLayoutEffect(() => {
		getLatestPrice()
	}, [])


	useLayoutEffect(() => {
		// state.balance =	useReduxWallet(coin);
		state.balance = 0;
		// state.balance =  getCoinBalance([coin.symbol])
		// state.balance = coin.balance
		state.amount = state.balance * state.rate
		setState({ ...state })
	}, [])


	const getLatestPrice = () => {
		new HttpService("", {
			"uniqueId": "abc1",
			"action": "quotedPrice",
			"data": {
				"symbol": `${coin.symbol}USDT`
			}
		}).Post(res => {
			setState({
				...state,
				rate: res.data.rate,
				percentChange: res.data.percentChange
			})
			setIsLoading(false)
		})
	}



	return (
		<SwapableRow
			leftItems={[
				{
					title: 'Receive',
					icon: 'arrow-circle-down',
					onPress: () => navigate(routes.receive, { coin }),
				},
				{
					title: 'Send',
					icon: 'arrow-circle-up',
					onPress: () => navigate(routes.send, { coin }),
				},
			]}
			rightItems={[
				{
					title: 'Hide',
					icon: 'eye-slash',
					onPress: () => onHideHandler(coin)
				},
			]}
		>
			<TouchableOpacity onPress={onPress} activeOpacity={0.9}>
				<View style={{ flexDirection: 'row', zIndex: 9 }}>
					<View style={{ flex: 1 }}>
						<View style={{ flexDirection: 'row' }}>
							<View style={{
								backgroundColor: globalStyles.Colors.inputColor2,
								height: 50,
								...globalStyles.flex.center,
								borderRadius: 8,
								paddingHorizontal: 8,
								paddingVertical: 0,
								marginHorizontal: 4
							}}>
								<Image resizeMode={"stretch"}
									style={{ width: 30, height: 30, }} source={{ uri: coin.logo }} />
							</View>

							<View style={{ paddingStart: 4, paddingTop: 2, flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }}>
								<AppText bold typo="tiny">
									{coin.name}
								</AppText>
								{/* <AppText typo="dot" bold color="text3">
									{coin.name}
								</AppText> */}
								{noPrice ? null : (

									<AppText color="text2" bold style={{ marginTop: 2 }}>
										{/* {coin.currency} */}
										{/* {isLoading ? <ActivityIndicator
											size={15}
											color={globalStyles.Colors.primaryColor} /> : } */}
										{parseFloat(state.rate).toFixed(2)}
									</AppText>
								)}
							</View>
						</View>
					</View>
					{noChart ? null : (
						// <View style={{ flex: 1, ...globalStyles.flex.center, width: 50, }}>
						// [
						// 	StyleSheet.absoluteFill,
						// 	{
						// 		alignItems: 'center',
						// 		justifyContent: 'center',
						// 		// marginLeft: 22,
						// 		// height: 20,
						// 		// paddingVertical: -10,
						// 		// marginVertical: -2,
						// 		width: '100%'

						// 	},
						// ]
						<View style={{
							flex: 1,
							flexDirection: 'row',
							justifyContent: 'center',
							alignItems: 'center',
							marginVertical: 0,
							marginLeft: 50,
							maxHeight: 0,
						}}>

							{/* <SvgUri
								width={100}
								style={{
									alignItems: 'center',
									flexDirection: 'row',
									justifyContent: 'center',
									marginTop: 50,
								}}
								uri={coinLogo}
							/> */}

						</View>
					)}
					{hideDetails ? null : (
						<View style={{ flex: 1, alignItems: 'flex-end' }}>
							<AppText typo="tiny">
								{coinBalance}{coin.symbol}
							</AppText>
							{isLoading ? <ActivityIndicator
								size={15}
								color={globalStyles.Colors.primaryColor} /> : <AppText
									typo="dot"
									bold
									color={state.percentChange > 0 ? 'success' : 'failure'}
									style={{ marginVertical: 2 }}
								>
								{parseFloat(state.percentChange).toFixed(2) > 0 ? '+' : ''}
								{parseFloat(state.percentChange).toFixed(2)}
							</AppText>}

							{noPrice ? null : (
								<AppText bold color="text2">
									{state.amount} $
								</AppText>
							)}
						</View>
					)}
					{hasSwitch ? (
						<View style={{ alignItems: 'center', justifyContent: 'center' }}>
							<AppSwitch value={true} />
						</View>
					) : null}
				</View>
				<View style={{ marginVertical: 8 }}>
					{index + 1 !== (length || coins.length) ? <HR /> : null}
				</View>
			</TouchableOpacity>
		</SwapableRow>
	)
}
