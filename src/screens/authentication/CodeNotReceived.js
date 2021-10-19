import React from 'react'
import { View } from 'react-native'
import AppText from '../../components/common/AppText'
import { globalStyles } from '../../config/styles'

export function CodeNotReceived({ resetTimer }) {
	return (
		<View
			style={{
				width: 118,
				borderStyle: 'solid',
				borderBottomColor: globalStyles.Colors.primaryColor,
				borderBottomWidth: 1,
				marginVertical: 24,
				alignItems: 'center',
			}}
		>
			<AppText
				typo="tiny"
				style={{
					marginTop: 4,
					color: globalStyles.Colors.primaryColor,
					textAlign: 'center',
					alignSelf: 'center',
				}}
				onPress={resetTimer}
			>
				Code not received?
			</AppText>
		</View>
	)
}
