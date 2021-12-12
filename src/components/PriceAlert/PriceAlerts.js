import React from 'react'
import { View } from 'react-native'
import { coins } from '../../screens/app/HomeStack/CreatePriceAlertScreen'
import PriceAlertItem from './PriceAlertItem'

export default function PriceAlerts(props) {
	console.log('price alret props', props)
	return (
		<View style={{ flex: 1 }}>
			{/* <PriceAlertItem
				item={coin}
				index={0}
				key={0}
				length={1}
				initialOpen={0}
			/> */}
			{/* {coins.map((coin, i) => (
				<PriceAlertItem
					item={coin}
					index={i}
					key={i}
					length={coins.length}
					initialOpen={i === 0}
				/>
			))} */}
		</View>
	)
}
