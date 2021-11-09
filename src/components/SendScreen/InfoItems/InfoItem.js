import React from 'react'
import { View } from 'react-native'
import { globalStyles } from '../../../config/styles'
import AppText from '../../common/AppText'

export default function InfoItems({ title, value, amount, detail }) {
	return (
		<View
			style={{
				...globalStyles.flex.row,
				...globalStyles.flex.between,
				marginVertical: 24,
			}}
		>
			<View>
				<AppText color="text1">
					{title}
				</AppText>
				{detail ? (
					<AppText style={{ marginTop: 12 }} typo="tiny" color="text3">
						{detail}
					</AppText>
				) : null}
			</View>

			<View style={{ alignItems: 'flex-end' }}>
				{value ? <AppText color="text2">{value}</AppText> : null}
				{amount ? (
					<AppText style={{ marginTop: 6 }} color="text3">
						{amount}
					</AppText>
				) : null}
			</View>
		</View>
	)
}
