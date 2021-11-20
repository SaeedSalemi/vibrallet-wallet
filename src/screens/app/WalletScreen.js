import React, { useEffect, useState, useMemo, useContext } from 'react'
import {
	FlatList,
	TouchableOpacity,
	View,
} from 'react-native'

import Coin from '../../components/common/Coin'
import PieChart from 'react-native-pie-chart'
import Header from '../../components/Header/Header'
import Screen from '../../components/Screen'
import { routes } from '../../config/routes'
import { globalStyles } from '../../config/styles'
import AppText from '../../components/common/AppText'
import BarChart from '../../components/BarChart/BarChart'
import Feather from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/core'
import { useSelector } from 'react-redux'
import { showMessage } from 'react-native-flash-message'
import { Context } from '../../context/Provider'

const ChartItems = ({ iconColor, title, value }) => {
	return (
		<View>
			<View style={{ ...globalStyles.flex.row, marginVertical: 2 }}>
				<View
					style={{
						width: 7,
						height: 7,
						marginVertical: 4,
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

	// TODO:
	// Get the latest coin balance from the storage and wallet information.
	const { navigate } = useNavigation()
	const [pie, setPie] = useState(true)
	const [state, setState] = useState({ allSupportedCoins: [] })
	const { coins, setCoin } = useContext(Context)
	// const wallet = useSelector(state =>
	// 	state.wallets.data ? state.wallets.data[0] : null
	// )
	useEffect(() => {
		setState({ ...state, allSupportedCoins: coins })
		// TODO: Generate nmonics, wallet, balance
	}, [])


	const totalBalance = useMemo(() => {
		let balance = 0
		// coins.map((item, index) => {
		// balance += (parseFloat(item.amount) * parseFloat(item.price))
		// })
		return balance
	}, [state])

	const pieData = useMemo(() => {
		const length = state.allSupportedCoins.length

		let counter = 0
		for (let item of state.allSupportedCoins) {
			if (item.balance === 0) {
				counter++
			}
		}

		if (counter === length) {
			return []
		} else {
			return coins.map((item, index) => {
				// const balance = ((aparseFloat(item.amount) * parseFloat(item.price)) * 100) / parseFloat(totalBalance || 0.001)
				const balance = 1
				return {
					series: 1, // item.balance TODO: handle 0
					title: item.symbol,
					value: '77.56%',
					// value: `${balance.toFixed(0)}%`,
					color: item.color,
					radius: 100,
				}
			})
		}


		// totalBalance
	}, [state])


	const data = coins
	// calculate the pie chart series
	const series = []
	// const series = pieData.map(item => item.series)
	const sliceColor = pieData.map(item => item.color)


	const barData = {
		labels: ['BTC', 'ETH', 'XRP', 'Others'],
		datasets: [
			{
				// data: pieData.map(item => item.series),
			},
		],
	}

	const filteredCoins = useMemo(() => {
		return coins.filter(c => !c.hide)
	}, [JSON.stringify(coins)])


	const hideCoinHandler = coin => {
		showMessage({
			message: `${coin.name} was hide successfully.`,
			description: null,
			type: 'success',
			icon: null,
			duration: 1000,
			style: { backgroundColor: "#6BC0B1" },
			position: 'top'
		})
		coins.map(item => {
			if (item.name === coin.name) {
				item.hide = true
			}
		})
		setCoin(coins)
	}


	return (
		<Screen>
			<Header route={routes.wallet} />

			<View style={{ flex: 1, paddingHorizontal: 8, marginVertical: 24 }}>

				{/* =============== Charts ================= */}
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
							<View style={{ flex: 2, justifyContent: 'space-around' }}>

								{pieData.length > 0 ? pieData.map((item, index) => (
									<ChartItems
										key={index}
										iconColor={item.color}
										title={item.title}
										value={item.value}
										index={index}
									/>
								)) : state.allSupportedCoins.map((item, index) => (
									<ChartItems
										key={index}
										iconColor={item.color}
										title={item.symbol}
										value={`0%`}
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

								{pieData.length > 0 ? <PieChart
									widthAndHeight={170}
									series={series}
									sliceColor={sliceColor}
									doughnut={true}
									coverRadius={0.88}
									coverFill={globalStyles.Colors.inputColor}
								/> : <PieChart
									widthAndHeight={170}
									series={[100]}
									sliceColor={[globalStyles.Colors.text2]}
									doughnut={true}
									coverRadius={0.88}
									coverFill={globalStyles.Colors.inputColor}
								/>}

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


				{/* =============== Coins ==================== */}

				<View style={{ flex: 2 }}>
					<FlatList
						style={{ marginVertical: 16 }}
						data={filteredCoins}
						renderItem={({ item, index }) => (
							<Coin
								coin={item}
								index={index}
								length={data.length}
								onPress={() => {
									navigate(routes.coinDetailWithoutHistory, { coin: item })
								}}
								onHideHandler={hideCoinHandler}
							/>
						)}
						keyExtractor={(_, index) => index.toString()}
					/>
				</View>
			</View>
		</Screen>
	)
}
