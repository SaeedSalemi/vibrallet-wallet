import React from 'react'
import { View } from 'react-native'
import { globalStyles } from '../../config/styles'
import AppIcon from '../common/AppIcon'
import AppText from '../common/AppText'
import MarketHeaderContainer from './MarketHeaderContainer'

export default function SortHeader() {
	return (
		<MarketHeaderContainer>
			<View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
				<AppText color="text2" typo="tiny">
					Name
				</AppText>
				<AppIcon name="arrowDownSm" style={{ marginHorizontal: 2 }} />
				<AppText typo="tiny" color="text3" style={{ marginHorizontal: 1 }}>
					/
				</AppText>

				<AppText color="text2" typo="tiny" style={{ marginHorizontal: 2 }}>
					Vol
				</AppText>
				<AppIcon name="arrowDownSm" />
			</View>
			<View
				style={{
					...globalStyles.flex.center,
					...globalStyles.flex.row,
					flex: 1,
				}}
			>
				<AppText color="text2" typo="tiny" style={{ paddingEnd: 4 }}>
					Last Price
				</AppText>
				<AppIcon name="arrowDownSm2" />
			</View>
			<View
				style={{
					...globalStyles.flex.center,
					...globalStyles.flex.row,
					flex: 1,
					justifyContent: 'flex-end',
				}}
			>
				<AppText color="primaryColor" typo="tiny" style={{ paddingEnd: 4 }}>
					24 Chg%
				</AppText>
				<AppIcon name="arrowDownSm2" />
			</View>
		</MarketHeaderContainer>
	)
}
