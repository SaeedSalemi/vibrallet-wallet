import React, { useMemo } from 'react'
import { View } from 'react-native'
import SortHeader from '../../../components/Market/SortHeader'
import { globalStyles } from '../../../config/styles'
import { coins } from '../HomeStack/CreatePriceAlertScreen'
import MarketData from './MarketData'

export default function MarketTabScreen() {
	const items = useMemo(() => [...coins, ...coins, ...coins, ...coins], [])

	return (
		<View style={globalStyles.screen}>
			<SortHeader />
			<MarketData items={items} />
		</View>
	)
}
