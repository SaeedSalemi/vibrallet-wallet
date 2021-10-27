import React, { useEffect, useState, useMemo } from 'react'
import {
	Dimensions,
	FlatList,
	RecyclerViewBackedScrollViewBase,
	TouchableOpacity,
	View,
} from 'react-native'

import Coin from '../../components/common/Coin'
import PieChart from 'react-native-pie-chart'
import Header from '../../components/Header/Header'
import Screen from '../../components/Screen'
import { routes } from '../../config/routes'
import { globalStyles } from '../../config/styles'
// import { coins } from './HomeStack/CreatePriceAlertScreen'
import AppText from '../../components/common/AppText'
import { color } from 'react-native-reanimated'
import BarChart from '../../components/BarChart/BarChart'
import Feather from 'react-native-vector-icons/Feather'

import AppButton from '../../components/common/AppButton'
import { useNavigation } from '@react-navigation/core'
import HttpService from '../../services/HttpService'
import AppIcon from '../../components/common/AppIcon'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { useSelector } from 'react-redux'
import ethManager from './../../blockchains/EthManager'
import bscManager from './../../blockchains/BscManager'
const { width } = Dimensions.get('window')

const ChartItems = ({ iconColor, title, value }) => {
	return (
		<View>
			<View style={{ ...globalStyles.flex.row, marginVertical: 2 }}>
				<View
					style={{
						width: 7,
						height: 7,
						marginVertical: 5,
						borderRadius: 2,
						backgroundColor: iconColor,
					}}
				></View>
				<View style={{ marginHorizontal: 8, alignItems: 'flex-start' }}>
					<AppText color="text3" typo="tiny">
						{title}
					</AppText>
					<AppText typo="tiny">{value}</AppText>
				</View>
			</View>
		</View>
	)
}

export default function WalletScreen() {
	const { navigate } = useNavigation()
	const [pie, setPie] = useState(true)

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
					price: '1,934',
					currency: '$',
					icon: <EthIcon />,
					increase: false,
					color: "blue",
					changeAmount: '6.2%',
					chart: 'sampleChart2',
					amount: 0,
					change: 0,
					balance: 0.01,
					vol: '2,300341',
					lastPrice: '1764.23',
				},
				{
					title: 'Binance',
					slug: 'BSC',
					change: 0,
					price: '1.12',
					currency: '$',
					color: "red",
					increase: true,
					symbol: "BNBUSDT",
					icon: <BSCIcon />,
					changeAmount: '1.4%',
					chart: 'sampleChart3',
					amount: 0,
					balance: 0.01,
					vol: '1.34340023',
					lastPrice: '489.27',
				},
			]
	})
	const { coins } = state

	const wallet = useSelector(state =>
		state.wallets.data ? state.wallets.data[0] : null
	)
	useEffect(() => {
		for (let item of state.coins) {
			new HttpService("", {
				"uniqueId": "abc1",
				"action": "quotedPrice",
				"data": {
					"symbol": item.symbol
				}
			}).Post(res => {
				// console.log(res)
				let inx = coins.findIndex((itm) => itm.slug === item.slug)
				state.coins[inx]['price'] = parseFloat(res.data.rate).toFixed(2)
				state.coins[inx]['change'] = parseFloat(res.data.percentChange).toFixed(2)
				console.log("coin 2", state.coins[inx])
				setState({ ...state })
			})

			const coinSelector = { ETH: ethManager, BSC: bscManager }
			let selectedCoin = coinSelector[item.slug];

			selectedCoin.getWalletFromMnemonic(wallet.backup)
				.then(wallet => {
					state.wallet = wallet;
					setState({ ...state });

					selectedCoin.getBalance(wallet?.address, false).then(result => {
						// setState({ ...state, balance: result })
						// setIsLoading(false)
						let inx = coins.findIndex((itm) => itm.slug === item.slug)
						state.coins[inx]['amount'] = parseFloat(result).toFixed(3)
						state.coins[inx]['balance'] = parseFloat(state.coins[inx]['amount'] * state.coins[inx]['price'])
						setState({ ...state })
					})
				})
				.catch(ex => console.error('balance wallet error', ex))
		}


	}, [coins])



	const totalBalance = useMemo(() => {
		let balance = 0
		state.coins.map((item, index) => {
			balance += (parseFloat(item.amount) * parseFloat(item.price))
		})
		return balance
	}, [state])


	const pieData = useMemo(() => {
		return state.coins.map((item, index) => {
			const balance = ((parseFloat(item.amount) * parseFloat(item.price)) * 100) / parseFloat(totalBalance || 0.001)
			return {
				series: item.balance,
				title: item.slug,
				// value: '77.56%',
				value: `${balance.toFixed(0)}%`,
				color: item.color,
				radius: 100,
			}
		})
	}, [state, totalBalance])



	// const pieData = [
	// 	{
	// 		series: 77,
	// 		title: 'BTC',
	// 		value: '77.56%',
	// 		color: '#F47169',
	// 		radius: 100,
	// 	},
	// 	{
	// 		series: 59,
	// 		title: 'ETH',
	// 		value: '12%',
	// 		color: '#512888',
	// 		radius: 100,
	// 	},
	// 	{
	// 		series: 30,
	// 		title: 'XRP',
	// 		value: '12.54%',
	// 		color: '#047780',
	// 		radius: 100,
	// 	},
	// 	{
	// 		series: 47,
	// 		title: 'Others',
	// 		value: '1.23%',
	// 		color: '#2196F3',
	// 		radius: 100,
	// 	},
	// ]
	const data = coins
	const series = pieData.map(item => item.series)
	const sliceColor = pieData.map(item => item.color)

	const barData = {
		labels: ['BTC', 'ETH', 'XRP', 'Others'],
		datasets: [
			{
				data: pieData.map(item => item.series),
			},
		],
	}

	return (
		<Screen>
			<Header route={routes.wallet} />

			<View style={{ flex: 1, paddingHorizontal: 8, marginVertical: 24 }}>
				<View
					style={{
						backgroundColor: globalStyles.Colors.inputColor,
						...globalStyles.flex.between,
						borderRadius: 8,
					}}
				>
					{pie ? (
						<View
							style={{
								...globalStyles.flex.row,
								...globalStyles.flex.between,
								paddingHorizontal: 16,
								paddingVertical: 12,
							}}
						>
							<View style={{ flex: 2, justifyContent: 'center' }}>
								{pieData.map((item, index) => (
									<ChartItems
										key={index}
										iconColor={item.color}
										title={item.title}
										value={item.value}
										index={index}
									/>
								))}
							</View>
							<View
								style={{
									position: 'relative',
									...globalStyles.flex.center,
									flex: 2,
								}}
							>
								<PieChart
									widthAndHeight={170}
									series={series}
									sliceColor={sliceColor}
									doughnut={true}
									coverRadius={0.88}
									coverFill={globalStyles.Colors.inputColor}
								/>
								<View
									style={{ position: 'absolute', ...globalStyles.flex.center }}
								>
									<AppText typo="tiny" color="text3">
										Portfolio Value
									</AppText>
									<AppText typo="md" color="text2" bold>
										${totalBalance}
									</AppText>
								</View>
							</View>
							<View style={{ flex: 1 }} />
						</View>
					) : (
						<View style={{ paddingHorizontal: 16, paddingVertical: 4 }}>
							<View style={{ ...globalStyles.flex.center, marginVertical: 8 }}>
								<AppText color="text3">Portfolio Value</AppText>
								<AppText color="text1" bold typo="lg">
									${totalBalance}
								</AppText>
							</View>
							<BarChart data={pieData} />
						</View>
					)}
					<TouchableOpacity
						style={{
							width: 32,
							height: 32,
							backgroundColor: '#313131',
							borderRadius: 8,
							...globalStyles.flex.center,
							position: 'absolute',
							right: 16,
							top: 16,
						}}
						onPress={() => setPie(!pie)}
					>
						<View
							style={{
								...globalStyles.flex.center,
								width: 20,
								height: 20,
								backgroundColor: globalStyles.Colors.text3,
								borderRadius: 3,
							}}
						>
							<Feather
								name={!pie ? 'pie-chart' : 'bar-chart-2'}
								size={15}
								color={globalStyles.Colors.text1}
							/>
						</View>
					</TouchableOpacity>
				</View>
				<View style={{ flex: 2 }}>
					<FlatList
						style={{ marginVertical: 16 }}
						data={state.coins}
						renderItem={({ item, index }) => (
							<Coin
								coin={item}
								index={index}
								length={data.length}
								onPress={() => {
									navigate(routes.coinDetailWithoutHistory, { coin: coins })
								}}
							/>
						)}
						keyExtractor={(_, index) => index.toString()}
					/>
				</View>
			</View>
		</Screen>
	)
}
