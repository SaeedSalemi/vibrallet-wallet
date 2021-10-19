import React from 'react'
import { View } from 'react-native'
import { coins } from '../../screens/app/HomeStack/CreatePriceAlertScreen'
import PriceAlertItem from './PriceAlertItem'

export default function PriceAlerts() {
	return (
		<View style={{ flex: 1 }}>
			{coins.map((coin, i) => (
				<PriceAlertItem
					item={coin}
					index={i}
					key={i}
					length={coins.length}
					initialOpen={i === 0}
				/>
			))}
		</View>
	)
}
