import React, {
	useEffect,
	useState,
	useMemo,
	useContext,
	useLayoutEffect,
	useCallback,
} from 'react'
import { FlatList, TouchableOpacity, View, RefreshControl } from 'react-native'

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
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
	checkExistsWallet,
	getCoinBalance,
	getCoinBalanceFromNetwork,
} from '../../utils/WalletFunctions'

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

const wait = timeout => {
	return new Promise(resolve => setTimeout(resolve, timeout))
}

export default function WalletScreen({ navigation }) {
	const { navigate } = useNavigation()
	const [pie, setPie] = useState(true)
	const [state, setState] = useState({ allSupportedCoins: [] })
	const { coins, setCoin, getUpdatedCoinBalance } = useContext(Context)
	const [totalAmount, setTotalAmount] = useState(0)
	const [filteredCoins, setFilteredCoins] = useState([])

	useLayoutEffect(() => {
		checkExistsWallet()
			.then(wallet => {
				if (!wallet) {
					navigation.replace(routes.welcome)
				}
			})
			.catch(err => {
				console.log('splash screen catch', err)
			})
	}, [])

	useEffect(() => {
		setFilteredCoins(coins.filter(c => !c.hide))
	}, [])

	const [refreshing, setRefreshing] = React.useState(false)

	const onRefresh = React.useCallback(() => {
		setRefreshing(true)
		setFilteredCoins([])
		wait(0).then(() => {
			setFilteredCoins(coins.filter(c => !c.hide))
			setRefreshing(false)
		})
	}, [])

	useEffect(() => {
		navigation.addListener('beforeRemove', e => {
			e.preventDefault()
		})
	}, [])

	useEffect(() => {
		const getAllcoins = async () => {
			const _all = await getUpdatedCoinBalance()
			setState({ ...state, allSupportedCoins: _all })
		}
		getAllcoins()
	}, [])

	useLayoutEffect(() => {
		for (let i of coins) {
			new HttpService('', {
				uniqueId: 'abc1',
				action: 'quotedPrice',
				data: {
					symbol: `${i.symbol}USDT`,
				},
			}).Post(res => {
				i.price = res.data.rate
			})
		}

		// console.log('custom dani', coins)

		// console.log('custom dani', getUpdatedCoinBalance())

		// setState({ allSupportedCoins: coins })

		let totalAmount = state.allSupportedCoins.reduce((acc, curr) => {
			return acc + curr.balance * curr.price
		}, 0)
		setTotalAmount(totalAmount)
	}, [])

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
				// const percent = (item.balance * item.price * 100) / totalAmount
				// console.log('dani debugger', {
				// 	balance: item.balance,
				// 	price: parseFloat(item.price).toFixed(2),
				// 	totalAmount,
				// 	result:
				// 		(item.balance * parseFloat(item.price).toFixed(2) * 100) /
				// 		totalAmount,
				// })
				let percent = 0
				if (totalAmount > 0) {
					percent = Math.ceil(
						(item.balance * parseFloat(item.price).toFixed(2) * 100) /
							totalAmount
					)
				} else {
					percent = Math.ceil(
						item.balance * parseFloat(item.price).toFixed(2) * 100
					)
				}

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
	// const series = pieData.map(item => item.series)
	// const sliceColor = pieData.map(item => item.color)

	const hideCoinHandler = coin => {
		showMessage({
			message: `${coin.name} was hide successfully.`,
			description: null,
			type: 'success',
			icon: null,
			duration: 1000,
			style: { backgroundColor: '#6BC0B1' },
			position: 'top',
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
								{pieData.length > 0
									? pieData.map((item, index) => (
											<ChartItems
												key={index}
												iconColor={item.color}
												title={item.title}
												value={item.value}
												index={index}
											/>
									  ))
									: state.allSupportedCoins.map((item, index) => (
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
								{totalAmount > 0 ? (
									<PieChart
										widthAndHeight={170}
										series={state.allSupportedCoins.map(item => item.balance)}
										sliceColor={state.allSupportedCoins.map(item => item.color)}
										doughnut={true}
										coverRadius={0.88}
										coverFill={globalStyles.Colors.inputColor}
									/>
								) : (
									<PieChart
										widthAndHeight={170}
										series={[100]}
										sliceColor={[globalStyles.Colors.text2]}
										doughnut={true}
										coverRadius={0.88}
										coverFill={globalStyles.Colors.inputColor}
									/>
								)}

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
							<BarChart
								data={state.allSupportedCoins}
								totalAmount={totalAmount}
							/>
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
						refreshControl={
							<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
						}
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
