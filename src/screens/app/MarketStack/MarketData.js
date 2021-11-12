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
	return (
		<>
			{items && <FlatList
				data={items}
				renderItem={({ item, index }) => <Marketitem item={item} index={index} />}
				// keyExtractor={(_, i) => i.toString()}
				keyExtractor={(item) => item.id.toString()}
			/>}
		</>
	)
}

const Marketitem = React.memo((item, index) => {
	const { navigate } = useNavigation()
	const { dispatch } = useContext(Context)
	return (

		<SwapableRow
			measure={75}
			leftItems={[{
				title: 'Favorite', icon: 'star', onPress: function () {
					// item.fav = !item.fav
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
							<AppText bold typo="tiny">
								{item.name}
							</AppText>
							<AppText typo="dot" color="text3">
								/USDT
							</AppText>
						</View>
						<AppText typo="tiny" color="text3">
							Vol. {parseFloat(item.volume_24h).toFixed(3)}
						</AppText>
					</View>
					<View
						style={{
							flex: 1,
							...globalStyles.flex.center,
						}}
					>
						<AppText typo="sm" bold
							color={item.percent_change_24h > 0 ? 'success' : 'failure'}>
							{parseFloat(item.price).toFixed(3)}
						</AppText>
						<AppText typo="tiny" color="text3">
							{parseFloat(item.price).toFixed(3)}
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
									item.percent_change_24h > 0 ? 'successOpacity' : 'failureOpacity'
									],
								...globalStyles.flex.center,
							}}
						>
							<AppText
								bold
								typo="sm"
								color={item.percent_change_24h > 0 ? 'success' : 'failure'}
							>
								{/* {item.increase ? '+' : '-'} 1.42% */}
								{item.percent_change_24h > 0 ? '+' : ''}
								{parseFloat(item.percent_change_24h).toFixed(2)}
							</AppText>
						</View>
					</View>
				</View>
				<View style={{ marginVertical: 12 }}>
					{index + 1 !== items.length ? <HR /> : null}
				</View>
			</TouchableOpacity>
		</SwapableRow>
	)
})