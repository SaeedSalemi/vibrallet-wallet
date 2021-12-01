import React, { useContext, useEffect, useState } from 'react'
import { View } from 'react-native'
import SortHeader from '../../../components/Market/SortHeader'
import { globalStyles } from '../../../config/styles'
import MarketData from './MarketData'
import { Context } from '../../../context/Provider'

export default function FavTabScreen() {

	const { favCoins } = useContext(Context)
	return (
		<View style={globalStyles.screen}>
			<SortHeader />
			<MarketData type="fav" items={favCoins} />
		</View>
	)
}
