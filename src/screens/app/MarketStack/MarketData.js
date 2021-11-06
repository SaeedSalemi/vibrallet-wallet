import { useNavigation } from '@react-navigation/core'
import React, { useContext } from 'react'
import { FlatList, TouchableOpacity, View } from 'react-native'
import { showMessage } from 'react-native-flash-message'
import AppText from '../../../components/common/AppText'
import HR from '../../../components/common/HR/HR'
import SwapableRow from '../../../components/common/Swapable/SwapableRow'
import { routes } from '../../../config/routes'
import { globalStyles } from '../../../config/styles'
import { Context } from '../../../context/Provider'

export default function MarketData({ items }) {
	const { dispatch } = useContext(Context)
	const { navigate } = useNavigation()
	return (
		<FlatList
			data={items}
			renderItem={({ item, index }) => (

				<SwapableRow
					measure={75}
					leftItems={[{
						title: 'Favorite', icon: 'star', onPress: function () {
							item.fav = !item.fav
							if (item.fav) {
								showMessage({
									message: `${item.slug} added to your favorite list.`,
									description: null,
									type: 'success',
									icon: null,
									duration: 1000,
									style: { backgroundColor: "#6BC0B1" },
									position: 'top'
								})
							}
							else {
								showMessage({
									message: `${item.slug} removed to your favorite list.`,
									description: null,
									type: 'danger',
									icon: null,
									duration: 1000,
									style: { backgroundColor: "#e74c3c" },
									position: 'top'
								})
							}
							dispatch({ item })
						}
					}]}
				>
					<TouchableOpacity
						style={{ paddingHorizontal: 20 }}
						onPress={() => {
							navigate(routes.marketCoinDetail, { coin: item })
						}}
					>
						<View
							style={{
								paddingVertical: 8,
								flexDirection: 'row',
							}}
						>
							<View style={{ flex: 1 }}>
								<View
									style={{
										flexDirection: 'row',
										alignItems: 'flex-end',
									}}
								>
									<AppText bold typo="sm">
										{item.slug}
									</AppText>
									<AppText typo="tiny" color="text3">
										/ USDT
									</AppText>
								</View>
								<AppText typo="tiny" color="text3">
									Vol. {item.vol}
								</AppText>
							</View>
							<View
								style={{
									flex: 1,
									...globalStyles.flex.center,
								}}
							>
								<AppText typo="sm" bold>
									{item.lastPrice}
								</AppText>
								<AppText typo="tiny" color="text3">
									{item.currency}
									{item.price}
								</AppText>
							</View>
							<View
								style={{
									flex: 1,
									alignItems: 'flex-end',
									justifyContent: 'center',
								}}
							>
								<View
									style={{
										width: 96,
										height: 40,
										borderRadius: 10,
										backgroundColor:
											globalStyles.Colors[
											item.increase ? 'successOpacity' : 'failureOpacity'
											],
										...globalStyles.flex.center,
									}}
								>
									<AppText
										bold
										typo="sm"
										color={item.increase ? 'success' : 'failure'}
									>
										{/* {item.increase ? '+' : '-'} 1.42% */}
										{item.change > 0 ? '+' : ''}
										{item.change}
									</AppText>
								</View>
							</View>
						</View>
						<View style={{ marginVertical: 12 }}>
							{index + 1 !== items.length ? <HR /> : null}
						</View>
					</TouchableOpacity>
				</SwapableRow>
			)}
			keyExtractor={(_, i) => i.toString()}
		/>
	)
}
