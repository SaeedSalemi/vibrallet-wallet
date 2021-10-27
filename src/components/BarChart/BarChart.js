import React from 'react'
import { View } from 'react-native'
import { globalStyles } from '../../config/styles'
import AppText from '../common/AppText'
import Bar from './components/Bar'

const percent = ['%100', '%75', '%50', '%25', '%0']

export default function BarChart({ data }) {
	return (
		<View
			style={{
				...globalStyles.flex.row,
				paddingHorizontal: 8,
			}}
		>
			<View style={{ alignItems: 'center' }}>
				{percent.map(item => (
					<AppText
						key={item}
						typo="dot"
						color="text3"
						style={{ height: 20, marginVertical: 1 }}
					>
						{item}
					</AppText>
				))}
			</View>
			<View
				style={{
					margin: 8,
					...globalStyles.flex.row,
					...globalStyles.flex.between,
					flex: 1,
				}}
			>
				{data.map((item, index) => (
					<Bar
						key={index}
						title={item.title}
						color={item.color}
						value={item.series}
					/>
				))}
			</View>
		</View>
	)
}
