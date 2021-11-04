import React, { useContext } from 'react'
import { View } from 'react-native'
import SortHeader from '../../../components/Market/SortHeader'
import { globalStyles } from '../../../config/styles'
import useCoins from '../../../hooks/useCoins'
// import { coins } from '../HomeStack/CreatePriceAlertScreen'
import MarketData from './MarketData'
import { Context } from '../../../context/marketContext'

export default function FavTabScreen() {
	// const coins = useCoins()
	const { coins } = useContext(Context)
	const filteredFavCoins = coins.filter(coin => coin.fav === true)
	return (
		<View style={globalStyles.screen}>
			<SortHeader />
			<MarketData items={filteredFavCoins} />
		</View>
	)
}
