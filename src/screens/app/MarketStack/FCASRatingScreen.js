import React, { useContext } from 'react'
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
import useSVGChart from '../../../hooks/useSVGChart'

export default function FCASRatingScreen() {


	const { FCASList } = useContext(Context)

	const colors = {
		'S': '#67B010',
		'A': '#4ED69D',
		'B': '#87C0A9',
		'D': '#F69B4F',
		'C': '#F84837',
	}
	const statuses = ['S', 'A', 'B', 'D', 'C']

	const data = FCASList
	const renderFCASItem = ({ item, index }) => {
		// const getSVGUri = useSVGChart(`${item.symbol}USDT`)
		return (
			<SwapableRow leftItems={[{ title: 'Favorite', icon: 'star' }]}>
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
					<View style={{ flex: 2 }}>
						{/* <Image
							source={Images[item.chart]}
							style={{ maxWidth: '100%' }}
						/> */}

						<SvgUri
							width={100}
							style={{
								alignItems: 'center',
								flexDirection: 'row',
								justifyContent: 'center',
								// marginTop: 50
							}}
							uri={getSVGUri}
						/>

					</View>
				</View>
				<View style={{ marginVertical: 12 }}>
					{index + 1 !== data.length ? <HR /> : null}
				</View>
			</SwapableRow>
		)
	}


	return (
		<View style={globalStyles.screen}>
			<RatingSortHeader />
			<FlatList
				data={data}
				renderItem={renderFCASItem}
				keyExtractor={(item) => item.id.toString()}
			/>
		</View>
	)
}
