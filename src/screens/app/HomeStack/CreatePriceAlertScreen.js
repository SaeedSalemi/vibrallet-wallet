import React, { useMemo } from 'react'
import { FlatList, View, Image } from 'react-native'
import SvgUri from 'react-native-svg-uri'
import AppText from '../../../components/common/AppText'
import AppTextInput from '../../../components/common/AppTextInput/AppTextInput'
import AlertItem from '../../../components/PriceAlert/AlertItem'
import Screen from '../../../components/Screen'
import { globalStyles } from '../../../config/styles'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import AppIcon from '../../../components/common/AppIcon'

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
		lastPrice: '55543.32',
	},
]

export default function CreatePriceAlertScreen({ navigation }) {
	const items = useMemo(() => coins, [])

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
