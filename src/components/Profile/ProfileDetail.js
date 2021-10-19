import React from 'react'
import { View } from 'react-native'
import AppText from '../common/AppText'
import AppIcon from '../common/AppIcon'
import { globalStyles } from '../../config/styles'

export default function ProfileDetails({ icon, title, children }) {
	return (
		<View style={{ flex: 1, ...globalStyles.flex.center }}>
			<View style={{ ...globalStyles.flex.row, alignItems: 'center' }}>
				{icon}
				<AppText color="text2" typo="tiny" style={{ marginLeft: 3 }}>
					{' '}
					{title}
				</AppText>
			</View>
			<View
				style={{
					...globalStyles.flex.row,
					alignItems: 'center',
					justifyContent: 'center',
					marginTop: 5,
				}}
			>
				{children}
			</View>
		</View>
	)
}
