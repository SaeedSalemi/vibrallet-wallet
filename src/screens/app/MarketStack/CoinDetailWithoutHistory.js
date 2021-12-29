import React, { useEffect, useState, useLayoutEffect } from 'react'
import { Image, ScrollView, View, Dimensions, ActivityIndicator } from 'react-native'
import Screen from '../../../components/Screen'
import { globalStyles } from '../../../config/styles'
import AppText from '../../../components/common/AppText'
import { Images } from '../../../assets'
import CoinDetailChartItem from '../../../components/Market/CoinDetailChartItem'
import AppButton from '../../../components/common/AppButton'
import { routes } from '../../../config/routes'
import HttpService from '../../../services/HttpService'
import moment from 'moment'
import { LineChart } from "react-native-chart-kit";

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export default function CoinDetailWithoutHistory({ route, navigation }) {
	const { coin } = route.params || {}
	const [loading, setLoading] = useState(false)
	const [chartLables, setChartLables] = useState([])
	const [chartItems, setChartItems] = useState([
		{ title: '1D', active: true },
		{ title: '7D' },
		{ title: '1M' },
		{ title: '6M' },
		{ title: '1Y' },
		{ title: 'ALL' },
	])

	const [state, setState] = useState({
		address: '',
		amount: '',
		wallet: {},
		percentCoin: 0,
		coin: {},
		chartData: [],
		chartTimeStamp: 1,
		percentChange: 0,
		// 
		coinHistory: [],
		timeframe: "5m",
		limit: 48,
	})

	useLayoutEffect(() => {

		setLoading(true)
		new HttpService("",
			{
				"uniqueId": "abc",
				"action": "historicalPrice",
				"data": {
					"symbol": `${coin.symbol}USDT`,
					"timeframe": state.timeframe,
					"limit": state.limit
				}
			}).Post(res => {

				if (res) {

					const items = res.data.rates.map(item => {
						return {
							date: moment(item.key),
							value: item.value
						}
					});
					state.coinHistory = items
					setState({ ...state })

					const labels = []
					let first = moment(items[0].date, 'HH:MM')
					labels.push(first.format("HH:MM"))
					let middle = moment(items[Math.round((items.length - 1) / 2)].date, "HH:MM")
					labels.push(middle.format("HH:MM"))
					let last = moment(items[items.length - 1].date, "HH:MM")
					labels.push(last.format('HH:MM'))
					setChartLables(labels)


					setLoading(false)
				} else {
					alert('data is not available')
				}

			})
	}, [state.limit])


	useLayoutEffect(() => {
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
	}, [])


	// items.map((i, idx) => {
	// 	let check = moment(i.date, 'YYYY/MM/DD HH:MM');
	// 	let _m = check.format('M');
	// 	let _d = check.format("D")
	// 	let _time = check.format("HH:MM")
	// 	console.log('by select chart item', { limit: state.limit, timeframe: state.timeframe })

	// 	if (state.timeframe === "4h" || state.timeframe === "1d") {
	// 		i.date = `${_d} ${MONTHS[_m - 1]}`
	// 	} else {
	// 		i.date = MONTHS[_m - 1]
	// 	}

	// })


	function formatDate(date) {

		var dd = date.getDate();
		var mm = date.getMonth() + 1;
		if (dd < 10) { dd = '0' + dd }
		if (mm < 10) { mm = '0' + mm }
		date = `${MONTHS[mm - 1]} ${dd}`
		return date
	}

	const formatMonths = (date, dayDelimiter = true) => {
		var dd = date.getDate();
		var mm = date.getMonth();
		if (dd < 10) { dd = '0' + dd }
		return dayDelimiter ? `${MONTHS[mm]} ${dd}` : MONTHS[mm]
	}

	const handleSelectChange = (title) => {
		let limit = 6
		let timeframe = '4h';
		let labels = []
		switch (title.toLowerCase()) {
			case '1d':
				limit = 48
				timeframe = '5m';
				labels = []
				let first = moment(state.coinHistory[0].date, 'HH:MM')
				labels.push(first.format("HH:MM"))
				let middle = moment(state.coinHistory[Math.round((state.coinHistory.length - 1) / 2)].date, "HH:MM")
				labels.push(middle.format("HH:MM"))
				let last = moment(state.coinHistory[state.coinHistory.length - 1].date, "HH:MM")
				labels.push(last.format('HH:MM'))
				setChartLables(labels)
				break
			case '7d':
				limit = 7
				timeframe = '1d';
				labels = []
				for (let i = 0; i < 7; i++) {
					let d = new Date();
					d.setDate(d.getDate() - i);
					labels.push(formatDate(d))
				}
				labels.reverse()
				setChartLables(labels)
				break
			case '1m':
				limit = 30
				timeframe = '1d';
				break
			case '6m':
				limit = 180
				timeframe = '1w';
				labels = []
				for (let i = 6; i >= 0; i--) {
					let d = new Date();
					d.setMonth(d.getMonth() - i);
					labels.push(formatMonths(d))
				}
				setChartLables(labels)

				break
			case '1y':
				limit = 365
				timeframe = '1w'
				labels = []
				for (let i = 12; i > 0; i--) {
					let d = new Date();
					d.setMonth(d.getMonth() - i);
					labels.push(formatMonths(d, false))
				}
				setChartLables(labels)
				break
			case 'all':
				limit = 12;
				timeframe = '1M';
				break;
		}
		const items = chartItems.map(item => {
			if (item.title === title) {
				item.active = true
			}
			else {
				item.active = false
			}
			return item
		})
		setChartItems(items)
		setState({ ...state, limit: limit, timeframe })
	}

	return (
		<Screen>
			<ScrollView >
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
				<View style={{ ...globalStyles.flex.row, marginVertical: 6 }}>
					{state.coinHistory && state.coinHistory.length > 0 ?
						<LineChart
							data={{
								labels: chartLables,
								datasets: [
									{
										data: state.coinHistory.map(item => parseFloat(item.value).toFixed(2))
									}
								]
							}}
							width={Dimensions.get("window").width - 20} // from react-native
							height={220}
							yAxisLabel="$"
							yAxisSuffix="k"
							yAxisInterval={1} // optional, defaults to 1
							verticalLabelRotation={30}
							chartConfig={{
								backgroundColor: "#e26a00",
								backgroundGradientFrom: "#9B68EB",
								backgroundGradientTo: "#7037C9",
								decimalPlaces: 2, // optional, defaults to 2dp
								propsForLabels: {
									fontSize: 10
								},
								color: (opacity = 1) => `rgba(255,255,255, ${opacity})`,
								labelColor: (opacity = 1) => `rgba(255,255,255, ${opacity})`,
								style: {
									borderRadius: 16,
									alignItems: 'center',
								},
								propsForDots: {
									r: "2",
									strokeWidth: "1",
									stroke: "#9B68EB"
								}
							}}
							bezier
							style={{
								marginVertical: 4,
								borderRadius: 12
							}}
						/> : <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
							<ActivityIndicator color={"white"} size="large" />
						</View>}
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
					<AppText typo="tiny" color="text2">No transactions yet</AppText>
					<AppText typo="xs" color="text3">Your transactions will appear here.</AppText>
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
						onPress={() => {
							navigation.navigate(routes['receive'], { coin: coin })
						}}
					/>
					<AppButton
						title="Send"
						icon="arrow-upward"
						customStyle={{
							flex: 0.48,
							backgroundColor: globalStyles.Colors.failure,
						}}
						onPress={() => navigation.navigate(routes['send'], { coin: coin })}
					/>
				</View>
			</ScrollView>
		</Screen>
	)
}
