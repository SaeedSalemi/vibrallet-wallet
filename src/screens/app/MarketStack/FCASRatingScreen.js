import React from 'react'
import { FlatList, Image, View } from 'react-native'
import { Images } from '../../../assets'
import AppText from '../../../components/common/AppText'
import HR from '../../../components/common/HR/HR'
import SwapableRow from '../../../components/common/Swapable/SwapableRow'
import RatingSortHeader from '../../../components/Market/RatingSortHeader'
import { globalStyles } from '../../../config/styles'
import { coins } from '../HomeStack/CreatePriceAlertScreen'

export default function FCASRatingScreen() {
	const colors = [
		'#67B010',
		'#4ED69D',
		'#87C0A9',
		'#F69B4F',
		'#F84837',
		'#87C0A9',
	]
	const statuses = ['S', 'A', 'B', 'D', 'C']

	const data = [...coins, ...coins, ...coins, ...coins]

	return (
		<View style={globalStyles.screen}>
			<RatingSortHeader />
			<FlatList
				data={data}
				renderItem={({ item, index }) => {
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
									<AppText bold>{item.title}</AppText>
									<AppText typo="tiny" color="text3">
										({item.slug})
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
											backgroundColor: colors[index % colors.length],
											width: 28,
											height: 20,
											borderRadius: 6,
											...globalStyles.flex.center,
											marginHorizontal: 2,
										}}
									>
										<AppText typo="tiny" color="whiteColor">
											{statuses[index % statuses.length]}
										</AppText>
									</View>
									<AppText style={{ marginHorizontal: 2 }} bold>
										971
									</AppText>
								</View>
								<View style={{ flex: 2 }}>
									<Image
										source={Images[item.chart]}
										style={{ maxWidth: '100%' }}
									/>
								</View>
							</View>
							<View style={{ marginVertical: 12 }}>
								{index + 1 !== data.length ? <HR /> : null}
							</View>
						</SwapableRow>
					)
				}}
				keyExtractor={(_, i) => i.toString()}
			/>
		</View>
	)
}
