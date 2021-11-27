import React, { useEffect, useState } from 'react'
import { Image, ScrollView, View } from 'react-native'
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


const values = ['$1850', '$1750', '$1650', '$1550']
const dates = ['5 Nov', '10 Nov', '15 Nov', '25 Nov', '30 Nov']
// const chartItems = [
// 	{ title: '1D' },
// 	{ title: '1W' },
// 	{ title: '1M' },
// 	{ title: '1Y' },
// 	{ title: 'ALL' },
// ]
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
export default function CoinDetailWithoutHistory({ route, navigation }) {
	const { coin } = route.params || {}

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
		timeframe: "1d",
		percentChange: 0,
		// 
		coinHistory: [],
		limit: 6
	})

	useEffect(() => {

		new HttpService("",
			{
				"uniqueId": "abc",
				"action": "historicalPrice",
				"data": {
					"symbol": `${coin.symbol}USDT`,
					// "timeframe": state.timeframe,
					"timeframe": '1h',
					"limit": state.limit
				}
			}).Post(res => {
				const items = res.data.rates.map(item => {
					let _date = new Date(item.key * 1000)
					return {
						date: months[_date.getMonth()],
						value: parseInt(item.value),
						day: _date.getDay()
					}
				})
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
		switch (title.toLowerCase()) {
			case '1d':
				limit = 30
				break
			case '1w':
				limit = 24
				break
			case '1m':
				limit = 168
				break
			case '1y':
				limit = 365
				break
			case 'all':
				limit = 365
				break
			default:
				limit = 6
				break
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
		setState({ ...state, limit: limit })
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
				<AreaChart
					animate={true}
					style={{ height: 210, flex: 0.98 }}
					data={state.coinHistory.map(item => item.value)}
					contentInset={{ top: 30, bottom: 30 }}
					curve={shape.curveNatural}
					svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
					curve={shape.curveBasis}
				>
				</AreaChart>
				<View style={{ height: 210, justifyContent: 'space-between' }}>
					{state.coinHistory.slice(0, 6).map((item, index) => (
						<AppText
							style={{ paddingHorizontal: 6 }}
							color="text3"
							typo="dot"
							key={index}
						>
							${item.value}
						</AppText>
					))}
				</View>
			</View>
			{/* <View style={{ height: 10, justifyContent: 'center', paddingLeft: 5, paddingRight: 50 }}> */}

			<View style={{ ...globalStyles.flex.row }}>
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


				{/* <XAxis
					// style={{ marginHorizontal: -10 }}
					data={state.coinHistory.map(item => item.date)}
					formatLabel={(value, index) => state.coinHistory.map(item => item.date)[value]}
					contentInset={{ left: 10, right: 10 }}
					// contentInset={{ left: 10, right: 10 }}
					svg={{ fontSize: 10, fill: 'gray' }}
				/> */}


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
