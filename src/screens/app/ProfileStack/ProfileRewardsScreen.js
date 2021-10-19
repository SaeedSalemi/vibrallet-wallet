import React from 'react'
import { globalStyles } from '../../../config/styles'
import AppText from '../../../components/common/AppText'
import Screen from '../../../components/Screen'
import { View } from 'react-native'

export default function ProfileRewardsScreen() {
	return (
		<Screen edges={['bottom']}>
			<View style={{ ...globalStyles.flex.center, flex: 1 }}>
				<AppText typo="xl" color="text3">
					No Design Available
				</AppText>
			</View>
		</Screen>
	)
}
