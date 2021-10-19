import React from 'react'
import { View } from 'react-native'
import { globalStyles } from '../../config/styles'
import AppIcon from '../common/AppIcon'
import AppText from '../common/AppText'

export default function CoinTitle({
	icon,
	title,
	value,
	amount,
	failureTitle,
}) {
	return (
		<View style={{ ...globalStyles.flex.center }}>
			<AppIcon name={icon} />
			<View style={{ marginVertical: 6 }}></View>
			{title ? (
				<AppText color="text2" typo="sm">
					{title}
				</AppText>
			) : null}
			{value ? (
				<AppText
					style={{ marginVertical: 6 }}
					bold
					typo="xl"
					color={failureTitle ? 'failure' : 'text1'}
				>
					{value}
				</AppText>
			) : null}
			{amount ? (
				<AppText typo="tiny" color="text3">
					{amount}
				</AppText>
			) : null}
		</View>
	)
}
