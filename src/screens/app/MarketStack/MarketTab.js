import React, { useContext } from 'react'
import { View } from 'react-native'
import SortHeader from '../../../components/Market/SortHeader'
import { globalStyles } from '../../../config/styles'
// import { Context } from '../../../context/Provider'
import { Context } from '../../../context/MarketProvider'
import MarketData from './MarketData'

export default function MarketTabScreen() {
	const { MarketListing: coins } = useContext(Context)
	return (
		<View style={globalStyles.screen}>
			<SortHeader />
			<MarketData items={coins} />
		</View>
	)
}
