import React, { useState } from 'react'
import MarketHeader from '../../../components/Market/MarketHeader'
import Screen from '../../../components/Screen'
import { FCASRatingTabNavigator } from '../../../navigation/FCASRatingStack'
import { MarketTabNavigator } from '../../../navigation/MarketTabStack'

export default function MarketScreen() {
	const [isMarket, setIsMarket] = useState(true)

	return (
		<Screen gap={false}>
			<MarketHeader isMarket={isMarket} setIsMarket={setIsMarket} />
			{isMarket ? <MarketTabNavigator /> : <FCASRatingTabNavigator />}
		</Screen>
	)
}
