import React, { useMemo, useState, useEffect } from 'react'
import { FlatList } from 'react-native'
import AppText from '../../../components/common/AppText'
import AlertItem from '../../../components/PriceAlert/AlertItem'
import Screen from '../../../components/Screen'
import { globalStyles } from '../../../config/styles'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import AppIcon from '../../../components/common/AppIcon'
import AppInput from '../../../components/common/AppInput/AppInput'
import HttpService from '../../../services/HttpService'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'

const BSCIcon = () => (
	<AppIcon style={{ width: 25, height: 25 }} name="binance" />
)
const EthIcon = () => <FontAwesome5 size={25} color="#7037C9" name="ethereum" />
export const coins = [
	{
		title: 'Ethereum',
		slug: 'ETH',
		price: '1,934',
		currency: '$',
		icon: <EthIcon />,
		increase: false,
		changeAmount: '6.2%',
		chart: 'sampleChart2',
		amount: 12.34364,
		balance: '$1,432.12',
		vol: '2,300341',
		lastPrice: '1764.23',
	},
	{
		title: 'Binance',
		slug: 'BSC',
		price: '1.12',
		currency: '$',
		icon: <BSCIcon />,
		increase: true,
		changeAmount: '1.4%',
		chart: 'sampleChart3',
		amount: 213.12653,
		balance: '$7.69',
		vol: '1.34340023',
		lastPrice: '489.27',
	},
]

export default function CreatePriceAlertScreen({ navigation }) {
	const items = useMemo(() => coins, [])


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
				let inx = coins.findIndex((itm) => itm.slug === item.slug)
				state.coins[inx]['price'] = parseFloat(res.data.rate).toFixed(2)
				state.coins[inx]['change'] = parseFloat(res.data.percentChange).toFixed(2)
				setState({ ...state })
			})
		}

	}, [])

	return (
		<Screen
			edges={['bottom']}
			style={[globalStyles.gapScreen, { paddingVertical: 8 }]}
		>
			<AppInput icon="search" placeholder="Search All Pairs..." />
			<AppText typo="tiny" color="text2" style={{ marginVertical: 12 }}>
				Popular Pairs
			</AppText>
			<FlatList
				// data={items}
				data={state.coins}
				renderItem={({ item, index }) => (
					<AlertItem item={item} index={index} length={state.coins} />
				)}
				keyExtractor={(_, i) => i.toString()}
			/>
		</Screen>
	)
}
