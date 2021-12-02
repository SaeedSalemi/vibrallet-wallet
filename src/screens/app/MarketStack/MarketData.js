import React, { useContext } from 'react'
import { useNavigation } from '@react-navigation/core'
import { FlatList, TouchableOpacity, View, RefreshControl, Image } from 'react-native'
import { showMessage } from 'react-native-flash-message'
import AppText from '../../../components/common/AppText'
import HR from '../../../components/common/HR/HR'
import SwapableRow from '../../../components/common/Swapable/SwapableRow'
import { routes } from '../../../config/routes'
import { globalStyles } from '../../../config/styles'
import { Context } from '../../../context/Provider'

export default function MarketData(props) {
	const { marketPagination, fetchData } = useContext(Context)
	return (
		<>
			{
				props.items &&
				<FlatList
					data={props.items}
					renderItem={({ item, index }) => <RenderMarketItem item={item} index={index} type={props.type} />}
					keyExtractor={(item, index) => `market_${index}`}
					refreshControl={
						<RefreshControl
							refreshing={false}
							onRefresh={() => {
								fetchData(true)
							}} />
					}

					onEndReachedThreshold={0.99}
					onEndReached={() => {
						if (props.items && props.items.length > 5)
							marketPagination()
					}}
				/>}
		</>
	)
}

const RenderMarketItem = ((props) => {
	let { item, index, type } = props
	const { navigate } = useNavigation()
	const { adder, deleteFav } = useContext(Context)
	return (
		<SwapableRow
			measure={75}
			leftItems={[{
				color: item.favorite && '#f1c40f',
				title: 'Favorite', icon: 'star', onPress: function () {
					if (type === "fav") {
						item.favorite = false
						deleteFav(item)
					}
					else if (type === "market") {
						item.favorite = true
						adder(item)
						showMessage({
							message: `${item.symbol} added to your favorite list.`,
							description: null,
							type: 'success',
							icon: null,
							duration: 1000,
							style: { backgroundColor: "#2ecc71" },
							position: 'top'
						})
					}
				}
			}]}
		>
			<TouchableOpacity
				style={{ paddingHorizontal: 20 }}
				onPress={() => {

					navigate(routes.marketWebview, { coin: item })
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
							{parseFloat(item.price).toFixed(6)}
						</AppText>
						<AppText typo="tiny" color="text3">
							{parseFloat(item.price).toFixed(6)}
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