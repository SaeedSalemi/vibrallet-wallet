import React, { useContext, useEffect, useState } from 'react'
import { FlatList, Image, View } from 'react-native'
import { Images } from '../../../assets'
import AppText from '../../../components/common/AppText'
import HR from '../../../components/common/HR/HR'
import SwapableRow from '../../../components/common/Swapable/SwapableRow'
import RatingSortHeader from '../../../components/Market/RatingSortHeader'
import { globalStyles } from '../../../config/styles'
// import { coins } from '../HomeStack/CreatePriceAlertScreen'
import { Context } from '../../../context/MarketProvider'
import { SvgUri } from 'react-native-svg'
import HttpService from '../../../services/HttpService'
import { showMessage } from 'react-native-flash-message'

export default function FCASRatingScreen() {


	const { FCASList } = useContext(Context)
	// const [_data, setData] = useState([])
	// const data = FCASList

	// useEffect(() => {
	// 	console.log('fcas list', FCASList)
	// 	for (let item of FCASList) {
	// 		try {


	// 			new HttpService("",
	// 				{
	// 					"uniqueId": "123",
	// 					"action": "priceChart",
	// 					"data": {
	// 						"symbol": `${item.symbol}`,
	// 						"timeframe": "30m",
	// 						"limit": 440,
	// 						"responseType": "url",
	// 						"height": 50,
	// 						"width": 250,
	// 					}
	// 				}).Post(res => {
	// 					if (res?.success === true) {
	// 						item.svgUri = res.data.url
	// 						console.log('svg uri', item.svgUri)
	// 					}
	// 				})
	// 		} catch (error) {
	// 			console.log('error to load coin svg', error)
	// 			item.svgUri = ""
	// 		}

	// 	}

	// 	console.log('fcas list data', FCASList)

	// 	setData(FCASList)
	// }, [])




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
				title: 'Favorite', icon: 'star', onPress: function () {
					showMessage({
						message: `In order to add coin to your favorite list you have sign in`,
						description: null,
						type: 'success',
						icon: null,
						duration: 8000,
						style: { backgroundColor: "#e74c3c" },
						position: 'top'
					})
				}
			}]}>
				<View
					style={{
						paddingVertical: 8,
						paddingHorizontal: 20,
						flexDirection: 'row',
						alignItems: 'center',
					}}
				>
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
					<View style={{ flex: 2, paddingHorizontal: 10 }}>
						{/* <Image
							source={Images[item.chart]}
							style={{ maxWidth: '100%' }}
						/> */}
						{item.svgUri ? <SvgUri
							width={80}
							style={{
								alignItems: 'center',
								flexDirection: 'row',
								justifyContent: 'center',
								// marginTop: 50
							}}
							uri={item.svgUri}
						/> : <></>}

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
				keyExtractor={(item) => `fcas_${item.id.toString()}`}
			/>
		</View>
	)
}
