import React, { useMemo } from 'react'
import { FlatList, View } from 'react-native'
import AppText from '../../../components/common/AppText'
import AppTextInput from '../../../components/common/AppTextInput/AppTextInput'
import AlertItem from '../../../components/PriceAlert/AlertItem'
import Screen from '../../../components/Screen'
import { globalStyles } from '../../../config/styles'

export const coins = [
	{
		title: 'Bitcoin',
		slug: 'BTC',
		price: '57,934',
		currency: '$',
		icon: 'btc',
		increase: true,
		changeAmount: '12.2%',
		chart: 'sampleChart1',
		amount: 2.34364,
		balance: '$100,232.23',
		vol: '2,322,232,231',
		lastPrice: '55543.32',
	},
	{
		title: 'Ethereum',
		slug: 'ETH',
		price: '1,934',
		currency: '$',
		icon: 'eth',
		increase: false,
		changeAmount: '6.2%',
		chart: 'sampleChart2',
		amount: 12.34364,
		balance: '$1,432.12',
		vol: '2,300341',
		lastPrice: '1764.23',
	},
	{
		title: 'Ripple',
		slug: 'XRP',
		price: '1.12',
		currency: '$',
		icon: 'xrp',
		increase: true,
		changeAmount: '1.4%',
		chart: 'sampleChart3',
		amount: 213.12653,
		balance: '$7.69',
		vol: '1.34340023',
		lastPrice: '55543.32',
	},
]

export default function CreatePriceAlertScreen({ navigation }) {
	const items = useMemo(() => [...coins, ...coins], [])

	return (
		<Screen
			edges={['bottom']}
			style={[globalStyles.gapScreen, { paddingVertical: 8 }]}
		>
			<AppTextInput icon="search" placeholder="Search All Pairs..." />
			<AppText typo="tiny" color="text2" style={{ marginVertical: 12 }}>
				Popular Pairs
			</AppText>
			<FlatList
				data={items}
				renderItem={({ item, index }) => (
					<AlertItem item={item} index={index} length={items.length} />
				)}
				keyExtractor={(_, i) => i.toString()}
			/>
		</Screen>
	)
}
