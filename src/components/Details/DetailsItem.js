import React from 'react'
import { View } from 'react-native'
import AppText from '../common/AppText'

export default function DetailsItem({ data }) {
	return (
		<View style={{ marginVertical: 8 }}>
			<View style={{ marginVertical: 4 }}>
				<AppText typo="xs" bold>
					{data.title}
				</AppText>
			</View>
			<View style={{ marginVertical: 4 }}>
				<AppText
					typo="tiny"
					color={data.detailColor ? data.detailColor : 'text3'}
				>
					{data.detail}
				</AppText>
			</View>
		</View>
	)
}
