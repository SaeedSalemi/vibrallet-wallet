import React, { useState } from 'react'
import { View } from 'react-native'
import MarketHeader from '../../../components/Market/MarketHeader'
import Screen from '../../../components/Screen'
import MarketProvider from '../../../context/MarketProvider'
import { FCASRatingTabNavigator } from '../../../navigation/FCASRatingStack'
import { MarketTabNavigator } from '../../../navigation/MarketTabStack'
// import MarketProvider from '../../../context/MarketProvider'

export default function MarketScreen() {
	const [isMarket, setIsMarket] = useState(true)

	return (

		<MarketProvider>
			<Screen gap={false}>
				<MarketHeader isMarket={isMarket} setIsMarket={setIsMarket} />
				{isMarket ? <MarketTabNavigator /> : <FCASRatingTabNavigator />}
			</Screen>
		</MarketProvider>
	)
}
