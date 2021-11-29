import React, { useEffect, useState } from 'react'
import { Image, ScrollView, View, Dimensions } from 'react-native'
import Screen from '../../../components/Screen'
import { globalStyles } from '../../../config/styles'
import AppText from '../../../components/common/AppText'
import { Images } from '../../../assets'
import CoinDetailChartItem from '../../../components/Market/CoinDetailChartItem'
import AppButton from '../../../components/common/AppButton'
import { routes } from '../../../config/routes'
import { useSelector } from 'react-redux'
import { AreaChart, YAxis, XAxis } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import HttpService from '../../../services/HttpService'
import { SvgUri } from 'react-native-svg'
import { Context } from '../../../context/Provider'
import moment from 'moment'

// import  D3BarChart  from '../../../components/BarChart/D3BarChart'
// import { Chart, Line, Area, HorizontalAxis, VerticalAxis } from 'react-native-responsive-linechart'

import {
	LineChart,
	// BarChart,
	// PieChart,
	// ProgressChart,
	// ContributionGraph,
	// StackedBarChart
} from "react-native-chart-kit";


// const values = ['$1850', '$1750', '$1650', '$1550']
// const dates = ['5 Nov', '10 Nov', '15 Nov', '25 Nov', '30 Nov']
// const chartItems = [
// 	{ title: '1D' },
// 	{ title: '1W' },
// 	{ title: '1M' },
// 	{ title: '1Y' },
// 	{ title: 'ALL' },
// ]
// const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export default function CoinDetailWithoutHistory({ route, navigation }) {
	const { coin } = route.params || {}

	const data = [
		{ label: 'Jan', value: 500 },
		{ label: 'Feb', value: 312 },
		{ label: 'Mar', value: 424 },
		{ label: 'Apr', value: 745 },
		{ label: 'May', value: 89 },
		{ label: 'Jun', value: 434 },
		{ label: 'Jul', value: 650 },
		{ label: 'Aug', value: 980 },
		{ label: 'Sep', value: 123 },
		{ label: 'Oct', value: 186 },
		{ label: 'Nov', value: 689 },
		{ label: 'Dec', value: 643 }
	]

	const [chartItems, setChartItems] = useState([
		{ title: '1D', active: true },
		{ title: '1W' },
		{ title: '1M' },
		{ title: '1Y' },
		{ title: 'ALL' },
	])


	// const { coinManager, getACoin } = useContext(Context)
	// const [isLoading, setIsLoading] = useState(true)

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
		timeframe: "4h",
		limit: 6,
	})

	const [__data, set_data] = useState()

	const [__chart, setChart] = useState()

	useEffect(() => {
		chartDates()
	//chartValues()
	let result = state.coinHistory.map(p => parseFloat(p.value).toFixed(2));
	console.log('chartValues RESULT:', result);
	setChart([
		{
			data: result
		}]);
	}, [])


	useEffect(() => {
		console.log('---- LOAD DATA --> ', state.timeframe, state.limit)
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

				const items = res.data.rates.map(item => {
					return {
						date: moment(item.key),
						value: item.value
					}
				});
				console.log('----  DATA  --> ', items)

				state.coinHistory = items
				setState({ ...state })

			})
	}, [state.limit])


	useEffect(() => {

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

	const handleSelectChange = (title) => {
		let limit = 6
		let timeframe = '4h';
		switch (title.toLowerCase()) {
			case '1d':
				limit = 6
				timeframe = '4h';
				break
			case '1w':
				limit = 7
				timeframe = '1d';
				break
			case '1m':
				limit = 7
				timeframe = '1W';
				break
			case '1y':
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
		// timeframe: title
		setState({ ...state, limit: limit, timeframe })
	}




	let chartDates = () => {

		let format = 'MM-DD';
		if (state.timeframe == '4h') {
			format = 'DD';
		} else if (state.timeframe == '1d') {
			format = 'MM-DD';
		} else if (state.timeframe == '1W') {
			format = 'MM-DD';
		} else if (state.timeframe == '1M') {
			format = 'MMM';
		}

		let result = state.coinHistory.map(p => p.date.format(format));
		console.log('chartDates RESULT:', result);
		set_data(result)
		//return result;
	};

	let chartValues = () => {
		let result = state.coinHistory.map(p => parseFloat(p.value).toFixed(2));
		console.log('chartValues RESULT:', result);
		setChart([
			{
				data: result
			}]);
		//return result;
	};

	return (
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
			<View style={{ ...globalStyles.flex.row, marginVertical: 24 }}>
				<LineChart
					// data={{
					// 	labels: __data,
					// 	datasets: __chart
					// }}
					data={{
						labels: state.coinHistory.map(p => p.date.format(format)),
						datasets: [
						  {
							data: state.coinHistory.map(p => parseFloat(p.value))
						  }
						]
					  }}
					width={Dimensions.get("window").width} // from react-native
					height={220}
					yAxisLabel="$"
					yAxisSuffix="k"
					yAxisInterval={1} // optional, defaults to 1
					verticalLabelRotation={30}
					chartConfig={{
						backgroundColor: "#e26a00",
						backgroundGradientFrom: "#fb8c00",
						backgroundGradientTo: "#ffa726",
						decimalPlaces: 2, // optional, defaults to 2dp
						color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
						labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
						style: {
							borderRadius: 16
						},
						propsForDots: {
							r: "6",
							strokeWidth: "2",
							stroke: "#ffa726"
						}
					}}
					bezier
					style={{
						marginVertical: 8,
						borderRadius: 16
					}}
				/>
			</View>
			{/* <View style={{ height: 10, justifyContent: 'center', paddingLeft: 5, paddingRight: 50 }}> */}

			{/* <View style={{ ...globalStyles.flex.row }}>
				{state.coinHistory.map((item, index) => (
					<AppText
						style={{ marginHorizontal: 16 }}
						color="text3"
						typo="dot"
						key={index}
					>
						{item.day === 0 ? '' : item.day} {item.date}
					</AppText>
				))}


				{/ * <XAxis
					// style={{ marginHorizontal: -10 }}
					data={state.coinHistory.map(item => item.date)}
					formatLabel={(value, index) => state.coinHistory.map(item => item.date)[value]}
					contentInset={{ left: 10, right: 10 }}
					// contentInset={{ left: 10, right: 10 }}
					svg={{ fontSize: 10, fill: 'gray' }}
				/> * /}


			</View> */}
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
	)
}
