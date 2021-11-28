import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useContext, useEffect, useState } from 'react'
import { View } from 'react-native'
import { showMessage } from 'react-native-flash-message'
import SortHeader from '../../../components/Market/SortHeader'
import { globalStyles } from '../../../config/styles'
import HttpService from '../../../services/HttpService'
import MarketData from './MarketData'
import { Context } from '../../../context/MarketProvider'

export default function FavTabScreen() {

	// const { coins } = useContext(Context)
	// const [state, setState] = useState([])
	const { favCoins } = useContext(Context)

	// useEffect(() => {

	// 	AsyncStorage.getItem("marketFavCoins").then(coins => {
	// 		if (coins)
	// 			setState(JSON.parse(coins))
	// 	})
	// }, [])

	// useEffect(() => {
	// 	new HttpService(
	// 		"", {
	// 		"uniqueId": "abc",
	// 		"action": "getFavoriteCurrencies",
	// 		"data": {
	// 			"kind": "MARKET"
	// 		}
	// 	}
	// 	).Post(response => {
	// 		if (response) {
	// 			// console.log('response from the fav')
	// 			// TODO: develop the FAV for fcas with API
	// 			// showMessage({
	// 			// 	message: `In order to add coin to your favorite list you have sign in`,
	// 			// 	description: null,
	// 			// 	type: 'success',
	// 			// 	icon: null,
	// 			// 	duration: 8000,
	// 			// 	style: { backgroundColor: "#e74c3c" },
	// 			// 	position: 'top'
	// 			// })
	// 		}
	// 	})
	// }, [])

	return (
		<View style={globalStyles.screen}>
			<SortHeader />
			<MarketData type="fav" items={favCoins} />
		</View>
	)
}
