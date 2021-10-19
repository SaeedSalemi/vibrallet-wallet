import React, { useMemo } from 'react'
import { FlatList, View } from 'react-native'
import { globalStyles } from '../../../config/styles'
import AppText from '../../../components/common/AppText'
import FavoritesItems from '../../../components/Market/FavoritesItems'
import HR from '../../../components/common/HR/HR'
import { ScrollView } from 'react-native-gesture-handler'

export default function EditFavorites() {
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

			<FlatList
				data={items}
				style={{ marginVertical: 18 }}
				renderItem={({ item, index }) => (
					<View key={index}>
						<View style={{ paddingHorizontal: 18, marginVertical: 18 }}>
							<FavoritesItems title={item} />
						</View>
						{index + 1 !== items.length ? (
							<HR style={{ marginVertical: 16 }} />
						) : null}
					</View>
				)}
				keyExtractor={(_, index) => index.toString()}
			/>
		</View>
	)
}
