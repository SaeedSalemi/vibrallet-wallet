import React, { useState } from 'react'
import { View } from 'react-native'
import MarketHeader from '../../../components/Market/MarketHeader'
import Screen from '../../../components/Screen'
import MarketProvider from '../../../context/marketContext'
import { FCASRatingTabNavigator } from '../../../navigation/FCASRatingStack'
import { MarketTabNavigator } from '../../../navigation/MarketTabStack'

export default function MarketScreen() {
	const [isMarket, setIsMarket] = useState(true)

	return (
		<Screen gap={false}>
			<MarketProvider>
				<MarketHeader isMarket={isMarket} setIsMarket={setIsMarket} />
				{isMarket ? <MarketTabNavigator /> : <FCASRatingTabNavigator />}
			</MarketProvider>
		</Screen>
	)
}
