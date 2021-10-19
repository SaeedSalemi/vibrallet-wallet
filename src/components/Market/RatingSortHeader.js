import React from 'react'
import { View } from 'react-native'
import { globalStyles } from '../../config/styles'
import AppIcon from '../common/AppIcon'
import AppText from '../common/AppText'
import MarketHeaderContainer from './MarketHeaderContainer'

export default function RatingSortHeader() {
	return (
		<MarketHeaderContainer style={{}}>
			<View style={{ flex: 2 }}>
				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<AppText typo="tiny" color="text2" style={{ paddingEnd: 2 }}>
						Rank
					</AppText>
					<AppIcon name="arrowDownSm2" />
				</View>
			</View>
			<View style={{ flex: 3 }}>
				<AppText typo="tiny" color="text2">
					Project
				</AppText>
			</View>
			<View style={{ flex: 3 }}>
				<View style={{ flexDirection: 'row', ...globalStyles.flex.center }}>
					<AppText typo="tiny" color="text2" style={{ paddingEnd: 2 }}>
						FCAS
					</AppText>
					<AppIcon name="arrowDownSm" />
				</View>
			</View>
			<View style={{ flex: 2, alignItems: 'flex-end' }}>
				<AppText typo="tiny" color="text2">
					Last 30D
				</AppText>
			</View>
		</MarketHeaderContainer>
	)
}
