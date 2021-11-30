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

	const { favCoins } = useContext(Context)
	return (
		<View style={globalStyles.screen}>
			<SortHeader />
			<MarketData type="fav" items={favCoins} />
		</View>
	)
}
