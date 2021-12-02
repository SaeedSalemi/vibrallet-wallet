import React, { useContext } from 'react'
import { FlatList, View, RefreshControl, Image } from 'react-native'
import AppText from '../../../components/common/AppText'
import HR from '../../../components/common/HR/HR'
import SwapableRow from '../../../components/common/Swapable/SwapableRow'
import RatingSortHeader from '../../../components/Market/RatingSortHeader'
import { globalStyles } from '../../../config/styles'
import { Context } from '../../../context/Provider'
import { SvgUri } from 'react-native-svg'
import { showMessage } from 'react-native-flash-message'

export default function FCASRatingScreen() {
	const { FCASList, fetchFCASData, fcasPagination, adderFCASFAV } = useContext(Context)

	const colors = {
		'S': '#67B010',
		'A': '#4ED69D',
		'B': '#87C0A9',
		'D': '#F69B4F',
		'C': '#F84837',
	}
	const renderFCASItem = ({ item, index }) => {
		return (
			<SwapableRow leftItems={[{
				color: item.favorite && '#f1c40f',
				title: 'Favorite', icon: 'star', onPress: function () {
					item.favorite = true
					adderFCASFAV(item)
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
			}]}>
				<View
					style={{
						paddingVertical: 2,
						paddingHorizontal: 12,
						flexDirection: 'row',
						alignItems: 'center',
					}}
				>
					<View style={{ flex: 2, paddingHorizontal: 10 }}>
						{/* {item.svgUri ? <SvgUri
							width={80}
							style={{
								alignItems: 'center',
								flexDirection: 'row',
								justifyContent: 'center',
							}}
							uri={item.svgUri}
						/> : <></>} */}
						<View style={{
							backgroundColor: globalStyles.Colors.inputColor2,
							height: 40,
							...globalStyles.flex.center,
							borderRadius: 12,
							paddingHorizontal: 0,
							paddingVertical: 0,
							marginHorizontal: 6
						}}>

							<Image resizeMode={"stretch"}
								style={{ width: 30, height: 30, alignSelf: 'center' }} source={{ uri: item.logo }} />
						</View>

					</View>
					<View style={{ flex: 2 }}>
						<AppText bold>{index + 1}</AppText>
					</View>
					<View style={{ flex: 3 }}>
						<AppText bold>{item.name}</AppText>
						<AppText typo="tiny" color="text3">
							({item.symbol})
						</AppText>
					</View>
					<View
						style={{
							flex: 3,
							...globalStyles.flex.row,
							...globalStyles.flex.center,
						}}
					>
						<View
							style={{
								backgroundColor: colors[item.grade],
								width: 28,
								height: 20,
								borderRadius: 6,
								...globalStyles.flex.center,
								marginHorizontal: 2,
							}}
						>
							<AppText typo="tiny" color="whiteColor">
								{item.grade}
							</AppText>
						</View>
						<AppText style={{ marginHorizontal: 2 }} bold>
							{item.score}
						</AppText>
					</View>

				</View>
				<View style={{ marginVertical: 12 }}>
					{index + 1 !== FCASList.length ? <HR /> : null}
				</View>
			</SwapableRow>
		)
	}


	return (
		<View style={globalStyles.screen}>
			<RatingSortHeader />
			<FlatList
				data={FCASList}
				renderItem={renderFCASItem}
				keyExtractor={(item, index) => `fcas_${index}`}
				refreshControl={
					<RefreshControl
						refreshing={false}
						onRefresh={() => {
							fetchFCASData(true)
						}} />
				}
				onEndReachedThreshold={0.7}
				onEndReached={() => {
					if (FCASList && FCASList.length > 5)
						fcasPagination()
				}}
			/>
		</View>
	)
}
