import React, { useMemo, useState, useContext } from 'react'
// import { FlatList, View } from 'react-native'
import { globalStyles } from '../../../config/styles'
import AppText from '../../../components/common/AppText'
import FavoritesItems from '../../../components/Market/FavoritesItems'
import HR from '../../../components/common/HR/HR'
import { ScrollView } from 'react-native-gesture-handler'
import DraggableFlatList from 'react-native-draggable-flatlist'
import {
	View,
	Platform
} from 'react-native';

import { Context } from '../../../context/Provider'

const Separator = () => {
	return <View style={Platform.OS === "android" ? styles.separator : null} />;
}

export default function EditFavorites() {

	const { coins } = useContext(Context)
	const filteredFavCoins = coins.filter(coin => coin.fav === true)



	const items = useMemo(() => {
		return [
			'BTC/USDT',
			'BTC/USDT',
			'BTC/USDT',
			'BTC/USDT',
			'BTC/USDT',
			'BTC/USDT',
		]
	}, [])


	const renderCoinItem = ({ item, index, drag, isActive }) => {
		return (
			<View key={index}>
				<View style={{ paddingHorizontal: 18, marginVertical: 18 }}>
					<FavoritesItems title={item} onDrag={drag} />
				</View>
				{index + 1 !== items.length ? (
					<HR style={{ marginVertical: 16 }} />
				) : null}
			</View>
		)
	}


	return (
		<View style={{ ...globalStyles.screen }}>
			<View
				style={{
					backgroundColor: globalStyles.Colors.inputColor2,
					marginTop: 24,
					height: 30,
					alignItems: 'center',
					paddingHorizontal: 18,
					...globalStyles.flex.row,
					...globalStyles.flex.between,
				}}
			>
				<AppText color="text2">Pair</AppText>
				<AppText color="text2">Top</AppText>
				<AppText color="text2">Sort</AppText>
			</View>

			<DraggableFlatList
				data={items}
				style={{ marginVertical: 18 }}
				renderItem={renderCoinItem}
				keyExtractor={(_, index) => index.toString()}
			/>
		</View>
	)
}
