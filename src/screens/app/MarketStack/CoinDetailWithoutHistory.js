import React, { useEffect, useState, useMemo } from 'react'
import { Image, ScrollView, View } from 'react-native'
import MarketIcon from '../../../components/common/MarketIcon/MarketIcon'
import Screen from '../../../components/Screen'
import { globalStyles } from '../../../config/styles'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AppText from '../../../components/common/AppText'
import { Images } from '../../../assets'
import CoinDetailChartItem from '../../../components/Market/CoinDetailChartItem'
import AppButton from '../../../components/common/AppButton'
import { routes } from '../../../config/routes'
import { useSelector } from 'react-redux'
import ethManager from '../../../blockchains/EthManager'
import bscManager from '../../../blockchains/BscManager'
import { AreaChart } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import HttpService from '../../../services/HttpService'

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
	const { coin, slug } = route.params || {}

	const [state, setState] = useState({
		address: '',
		amount: '',
		wallet: {},
		balance: 0,
		percentCoin: 0,
		coin: {},
		chartData: []
	})

	const wallet = useSelector(state => {
		state.wallets.data ? state.wallets.data[0] : null
	}
	)
	useEffect(() => {



		for (let item of coin) {
			if (item.slug === slug) {
				setState({ ...state, coin: item })
			}
		}



		new HttpService("",

			{
				"uniqueId": "abc",
				"action": "historicalPrice",
				"data": {
					"symbol": state.coin.slug,
					"symbol": state.coin.symbol,
					"timeframe": "1d",
					"limit": 20
				}
			}).Post(res => {

				const data = res.data.rates.map((d) => parseInt(d.value))
				setState({ ...state, chartData: data })
			})

		if (wallet) {

			const coinSelector = { ETH: ethManager, BSC: bscManager }
			let selectedCoin = coinSelector[coin.slug];

			selectedCoin.getWalletFromMnemonic(wallet.backup)
				.then(wallet => {
					state.wallet = wallet;
					setState({ ...state });

					selectedCoin.getBalance(wallet?.address, false).then(result => {
						setState({ ...state, balance: result })
						setIsLoading(false)
					})
				})
				.catch(ex => console.error('balance wallet error', ex))

		}

	}, [wallet])


	const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]

	return (
		<ScrollView>
			<View style={{ ...globalStyles.flex.center, marginVertical: 24 }}>
				<MarketIcon
					size={52}
					style={{ marginVertical: 8 }}
					color={globalStyles.Colors.ethereum}
				>
					{/* <MaterialCommunityIcons size={30} name="ethereum" color="#7037C9" /> */}
					{state.coin.icon}
				</MarketIcon>
				<AppText color="text2">{coin.title} Balance</AppText>
				<AppText bold typo="xl">
					{state.balance} {state.coin.title}
				</AppText>
				<View
					style={{
						...globalStyles.flex.row,
						alignItems: 'center',
					}}
				>
					<AppText color="text3" typo="tiny">
						{state.coin.change} Change
					</AppText>
					<AppText color="success" typo="dot" style={{ marginHorizontal: 8 }}>
						{/* +1.2% */}
					</AppText>
				</View>
			</View>
			<View style={{ ...globalStyles.flex.row, marginVertical: 32 }}>
				{/* <Image style={{ flex: 0.98 }} source={Images.inlineChart} /> */}

				<AreaChart
					style={{ height: 200, flex: 0.98 }}
					data={state.chartData}
					// data={[50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]}
					contentInset={{ top: 30, bottom: 30 }}
					curve={shape.curveNatural}
					svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
				>

				</AreaChart>

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
					marginVertical: 32,
				}}
			>
				{chartItems.map((item, index) => (
					<CoinDetailChartItem
						key={index}
						title={item.title}
						active={item.active}
					/>
				))}
			</View>
			<View
				style={{ ...globalStyles.flex.center, marginVertical: 32, flex: 1 }}
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
