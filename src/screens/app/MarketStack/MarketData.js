import React, { useContext, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/core'
import { FlatList, TouchableOpacity, View, Platform, RefreshControl, Image, ActivityIndicator } from 'react-native'
import { showMessage } from 'react-native-flash-message'
import AppText from '../../../components/common/AppText'
import HR from '../../../components/common/HR/HR'
import SwapableRow from '../../../components/common/Swapable/SwapableRow'
import { routes } from '../../../config/routes'
import { globalStyles } from '../../../config/styles'
import { Context } from '../../../context/MarketProvider'
// TODO: Activity Indicator


export default function MarketData({ items }) {

	//items
	const [data, setData] = useState([])
	const [page, setPage] = useState(1)
	const [is_end, setIsEnd] = useState(false)

	const { MarketListingPageSize, MarketListingPageNumber, dispatch, marketPagination } = useContext(Context)


	useEffect(() => {
		// if (items.length === 0) {
		// 	setIsEnd(true)
		// }
	}, [])

	return (
		<>
			{items && <FlatList
				data={items}
				renderItem={({ item, index }) => <RenderMarketItem item={item} index={index} />}
				keyExtractor={(item) => item.id.toString()}
				refreshControl={
					<RefreshControl
						refreshing={false}
						onRefresh={() => {
							marketPagination(1)
						}} />
				}
				onEndReachedThreshold={0.8}
				onEndReached={() => {
					if (!is_end) {
						setPage(page + 1)
						marketPagination(page + 1)
					}
				}}

			// removeClippedSubviews={
			// 	Platform.OS === "android"
			// }
			/>}
		</>
	)
}




const RenderMarketItem = React.memo(({ item, index }) => {
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
						paddingVertical: 4,
						flexDirection: 'row',
					}}
				>
					<View style={{ flex: 1, flexDirection: 'row' }}>

						<View style={{
							backgroundColor: globalStyles.Colors.inputColor2,
							height: 40,
							...globalStyles.flex.center,
							borderRadius: 8,
							paddingHorizontal: 8,
							paddingVertical: 0,
							marginHorizontal: 4
						}}>
							<Image resizeMode={"stretch"}
								style={{ width: 30, height: 30, }} source={{ uri: item.logo }} />
						</View>
						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center',
							}}
						>
							<AppText bold typo="tiny">
								{item.symbol}
							</AppText>
							<AppText typo="dot" color="text3">
								/USDT
							</AppText>
						</View>
						{/* <AppText typo="tiny" color="text3" >
							Vol. {parseFloat(item.volume_24h).toFixed(3)}
						</AppText> */}
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
					{/* {index + 1 !== items.length ? <HR /> : null} */}
				</View>
			</TouchableOpacity>
		</SwapableRow>
	)
})