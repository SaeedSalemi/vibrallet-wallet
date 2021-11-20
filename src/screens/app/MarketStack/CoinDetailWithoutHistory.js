import React, { useEffect, useState, useMemo, useContext } from 'react'
import { Image, ScrollView, View, ActivityIndicator } from 'react-native'
// import MarketIcon from '../../../components/common/MarketIcon/MarketIcon'
import Screen from '../../../components/Screen'
import { globalStyles } from '../../../config/styles'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AppText from '../../../components/common/AppText'
import { Images } from '../../../assets'
import CoinDetailChartItem from '../../../components/Market/CoinDetailChartItem'
import AppButton from '../../../components/common/AppButton'
import { routes } from '../../../config/routes'
import { useSelector } from 'react-redux'
import { AreaChart } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import HttpService from '../../../services/HttpService'
import { SvgUri } from 'react-native-svg'
import { Context } from '../../../context/Provider'


const values = ['$1850', '$1750', '$1650', '$1550']
const dates = ['5 Nov', '10 Nov', '15 Nov', '25 Nov', '30 Nov']
const chartItems = [
	{ title: '1D', active: true },
	{ title: '1W' },
	{ title: '1M' },
	{ title: '1Y' },
	{ title: 'ALL' },
]
export default function CoinDetailWithoutHistory({ route, navigation }) {
	const { coin } = route.params || {}

	const { coinManager } = useContext(Context)
	const [isLoading, setIsLoading] = useState(true)

	const [state, setState] = useState({
		address: '',
		amount: '',
		wallet: {},
		balance: 0,
		percentCoin: 0,
		coin: {},
		chartData: [],
		chartTimeStamp: 1,
		timeframe: '1d',
		percentChange: 0,
	})

	const wallet = useSelector(state => {
		state.wallets.data ? state.wallets.data[0] : null
	}
	)


	useEffect(() => {


		new HttpService("",
			{
				"uniqueId": "abc",
				"action": "historicalPrice",
				"data": {
					"symbol": `${coin.symbol}USDT`,
					"timeframe": state.timeframe || '1d',
					"limit": 20
				}
			}).Post(res => {
				const data = res.data.rates.map((d) => parseInt(d.value))
				setState({ ...state, chartData: data })

			})


		new HttpService("", {
			"uniqueId": "abc1",
			"action": "quotedPrice",
			"data": {
				"symbol": `${coin.symbol}USDT`
			}
		}).Post(res => {
			if (res)
				setState({ ...state, percentChange: res.data.percentChange })
		})
		setState({ ...state, balance: 0 })
		// if (wallet) {

		// 	let selectedCoin = coinManager[coin.symbol];
		// 	if (selectedCoin.getWalletFromMnemonic) {
		// 		selectedCoin.getWalletFromMnemonic(wallet.backup)
		// 			.then(wallet => {
		// 				state.wallet = wallet;
		// 				setState({ ...state });

		// 				selectedCoin.getBalance(wallet?.address, false).then(result => {
		// 					setState({ ...state, balance: result })
		// 				})
		// 			})
		// 			.catch(ex => console.error('balance wallet error', ex))
		// 	}
		// }
		setIsLoading(false)
	}, [state.timeframe])


	// useEffect(() => {


	// }, [])

	const handleSelectChange = (title) => {
		if (title === "all")
			title = "1y"
		if (title === "1y")
			title = "1m"
		setState({ ...state, timeframe: title.toString().toLowerCase() })
	}

	return (
		<ScrollView>
			<View style={{ ...globalStyles.flex.center, marginVertical: 8 }}>
				<View style={{
					backgroundColor: globalStyles.Colors.inputColor2,
					height: 45,
					...globalStyles.flex.center,
					borderRadius: 8,
					paddingHorizontal: 8,
					paddingVertical: 0,
					marginHorizontal: 2
				}}>
					<Image resizeMode={"stretch"}
						style={{ width: 28, height: 28, }} source={{ uri: coin.logo }} />
				</View>
				<AppText color="text2">{coin.name} Balance</AppText>
				<AppText bold typo="md">
					{coin.balance} {coin.symbol}
				</AppText>
				<View
					style={{
						...globalStyles.flex.row,
						alignItems: 'center',
					}}
				>
					<AppText color="text3" typo="tiny">
						{state.timeframe} Change
					</AppText>
					<AppText
						color={state.percentChange > 0 ? 'success' : 'failure'}
						typo="dot"
						style={{ marginHorizontal: 4 }}>
						{state.percentChange}
					</AppText>
				</View>
			</View>
			<View style={{ ...globalStyles.flex.row, marginVertical: 24 }}>
				{isLoading ? <ActivityIndicator
					size={25}
					color={globalStyles.Colors.primaryColor} /> :
					<AreaChart
						style={{ height: 200, flex: 0.98 }}
						data={state.chartData}
						contentInset={{ top: 30, bottom: 30 }}
						curve={shape.curveNatural}
						svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
					>
					</AreaChart>}


				<View style={{ justifyContent: 'space-between' }}>
					{values.map((item, index) => (
						<AppText
							style={{ paddingHorizontal: 8 }}
							color="text3"
							typo="dot"
							key={index}
						>
							{item}
						</AppText>
					))}
				</View>
			</View>
			<View style={{ ...globalStyles.flex.row }}>
				{dates.map((item, index) => (
					<AppText
						style={{ marginHorizontal: 16 }}
						color="text3"
						typo="dot"
						key={index}
					>
						{item}
					</AppText>
				))}
			</View>
			<View
				style={{
					...globalStyles.flex.row,
					justifyContent: 'space-evenly',
					marginVertical: 24,
				}}
			>
				{chartItems.map((item, index) => (
					<CoinDetailChartItem
						key={index}
						title={item.title}
						active={item.active}
						onSelectChange={handleSelectChange}
					/>
				))}
			</View>
			<View
				style={{ ...globalStyles.flex.center, marginVertical: 18, flex: 1 }}
			>
				<Image source={Images.marketImage} />
				<AppText color="text2">No transactions yet</AppText>
				<AppText color="text3">Your transactions will appear here.</AppText>
			</View>
			<View
				style={{
					...globalStyles.flex.row,
					...globalStyles.gapScreen,
					justifyContent: 'space-between',
				}}
			>
				<AppButton
					title="Recieve"
					icon="arrow-downward"
					customStyle={{
						flex: 0.48,
						backgroundColor: globalStyles.Colors.success,
					}}
					onPress={() => navigation.navigate(routes['receive'], { coin: state.coin })}
				/>
				<AppButton
					title="Send"
					icon="arrow-upward"
					customStyle={{
						flex: 0.48,
						backgroundColor: globalStyles.Colors.failure,
					}}
					onPress={() => navigation.navigate(routes['send'], { coin: state.coin })}
				/>
			</View>
		</ScrollView>
	)
}
