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
import { showMessage } from 'react-native-flash-message'
import { Context } from '../../context/Provider'
import HttpService from '../../services/HttpService'

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
	const { navigate } = useNavigation()
	const [pie, setPie] = useState(true)
	const [state, setState] = useState({ allSupportedCoins: [] })
	const { coins, setCoin } = useContext(Context)
	const [totalAmount, setTotalAmount] = useState(0)

	useEffect(() => {
		setState({ ...state, allSupportedCoins: coins })
	}, [])

	useEffect(() => {

		for (let i of coins) {
			new HttpService("", {
				"uniqueId": "abc1",
				"action": "quotedPrice",
				"data": {
					"symbol": `${i.symbol}USDT`
				}
			}).Post(res => {
				i.price = res.data.rate
			})
		}
		setState({ allSupportedCoins: coins })
		// console.log('q', quotedPrice)
		let totalAmount = state.allSupportedCoins.reduce((acc, curr) => {
			console.log('acc', curr.balance, curr.price, curr.symbol)
			return acc + (curr.balance * curr.price)
		}, 0)
		setTotalAmount(totalAmount)
	}, [])


	// const totalAmount = useMemo(() => {
	// 	return state.allSupportedCoins.reduce((acc, curr) => {
	// 		console.log('acc', curr.balance, curr.price, curr.symbol)
	// 		return acc + (curr.balance * curr.price)
	// 	}, 0)
	// }, [])

	// const totalAmount = state.allSupportedCoins.reduce((acc, curr) => {
	// 	console.log('acc', curr.balance, curr.price, curr.symbol)
	// 	return acc + (curr.balance * curr.price)
	// }, 0)

	console.log("totalAmount", totalAmount)

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

				//price قیمت لحظه ای ارز
				//balance موجودی ارز
				//amount == price * balance
				//percent = amount / totalAmount
				// const balance = ((aparseFloat(item.amount) * parseFloat(item.price)) * 100) / parseFloat(totalBalance || 0.001)
				const percent = ((item.balance * item.price) * 100) / totalAmount
				console.log("info", item.balance, item.price, item.symbol, percent, totalAmount)
				return {
					series: item.balance,
					title: item.symbol,
					value: `${percent}%`,
					color: item.color,
					radius: 100,
				}
			})
		}
	}, [state])


	const data = coins
	// calculate the pie chart series
	// const series = []
	const series = pieData.map(item => item.series)
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
								paddingVertical: 22,
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



								{totalAmount > 0 ?
									<PieChart
										widthAndHeight={170}
										series={
											state.allSupportedCoins.map(item => item.balance)
										}
										sliceColor={
											state.allSupportedCoins.map(item => item.color)
										}
										doughnut={true}
										coverRadius={0.88}
										coverFill={globalStyles.Colors.inputColor}
									/>

									: <PieChart
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
										${totalAmount}
									</AppText>
								</View>
							</View>
							<View style={{ flex: 1 }} />
						</View>
					) : (
						<View style={{ paddingHorizontal: 16, paddingVertical: 4 }}>
							<View style={{ ...globalStyles.flex.center, marginVertical: 6 }}>
								<AppText color="text3">Portfolio Value</AppText>
								<AppText color="text2" bold typo="md">
									${totalAmount}
								</AppText>
							</View>
							<BarChart data={coins} />
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
