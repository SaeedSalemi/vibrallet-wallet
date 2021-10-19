import React from 'react'
import { FlatList, View } from 'react-native'
import { coins } from '../../screens/app/HomeStack/CreatePriceAlertScreen'
import Coin from '../common/Coin'

const items = [...coins, ...coins, ...coins]

export default function UserCoinsItems() {
	return (
		<>
			<FlatList
				style={{ marginVertical: 18 }}
				data={items}
				renderItem={({ item, index }) => (
					<Coin key={index} coin={item} index={index} length={items.length} />
				)}
				keyExtractor={(_, index) => index.toString()}
			/>
		</>
	)
}
