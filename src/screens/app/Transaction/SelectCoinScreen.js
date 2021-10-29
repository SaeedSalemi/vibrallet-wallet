import { useRoute } from '@react-navigation/core'
import React, { useMemo, useState, useEffect } from 'react'
import { ScrollView, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import AppIcon from '../../../components/common/AppIcon'
import AppInput from '../../../components/common/AppInput/AppInput'
import AppText from '../../../components/common/AppText'
import Coin from '../../../components/common/Coin'
import Screen from '../../../components/Screen'
import { routes } from '../../../config/routes'
import HttpService from '../../../services/HttpService'
import { coins } from '../HomeStack/CreatePriceAlertScreen'

export default function SelectCoinScreen({ navigation, route }) {
	const allCoins = useMemo(() => coins, [])

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
					color: "purple",
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
					color: "yellow",
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
		}

	}, [state.coins])

	// const [filterdItems, setFilterItems] = useState(allCoins)
	const [filterdItems, setFilterItems] = useState(state.coins)
	// const arrayHolder = allCoins
	const arrayHolder = state.coins
	const searchFilterFunction = text => {
		const includes = str => str.toLowerCase().includes(text.toLowerCase())
		const newData = arrayHolder.filter(item => {
			if (includes(item.title) || includes(item.slug)) {
				return item
			}
		})
		setFilterItems(newData)
	}

	const { params } = useRoute()
	const mode = params?.mode || 'send'

	return (
		<Screen edges={['bottom']}>
			<View style={{ paddingTop: 16 }}>
				<AppInput
					icon="search"
					placeholder="Search Coins..."
					onChangeText={text => {
						searchFilterFunction(text)
					}}
				/>
			</View>
			{/* <View style={{ flex: 2 }}>
				<AppText typo="tiny" color="text2">
					Suggested
				</AppText>
				<View style={{ flex: 1, paddingVertical: 16 }}>
					<ScrollView>
						{filterdItems.map((coin, i) => (
							<Coin
								key={i}
								coin={coin}
								index={i}
								length={coins.length}
								noChart
								noPrice
								onPress={() =>
									navigation.navigate(routes[mode], { coin: coin })
								}
							/>
						))}
					</ScrollView>
				</View>
			</View> */}
			<View style={{ flex: 3 }}>
				<AppText typo="tiny" color="text2">
					All Coins
				</AppText>
				<View style={{ flex: 1, paddingVertical: 16 }}>
					<ScrollView>
						{filterdItems.map((coin, i) => (
							<Coin
								key={i}
								onPress={() =>
									navigation.navigate(routes[mode], { coin: coin })
								}
								coin={coin}
								index={i}
								length={allCoins.length}
								noChart
								noPrice
							/>
						))}
					</ScrollView>
				</View>
			</View>
		</Screen>
	)
}
