import React from 'react'
import { Switch } from 'react-native'
import { globalStyles } from '../../config/styles'

export default function AppSwitch(props) {
	return (
		<Switch
			trackColor={{ true: globalStyles.Colors.primaryColor }}
			{...props}
		/>
	)
}
