import React, { useState } from 'react'
import { View, ViewPropTypes } from 'react-native'
import { globalStyles } from '../../../config/styles'
import PercentValue from './PercentValue'

export default function PercentValueItems({ items, onSelectPercent }) {
	const [selected, setSelected] = useState(0)

	return (
		<View
			style={{
				...globalStyles.flex.row,
				...globalStyles.flex.between,
				paddingHorizontal: 8,
			}}
		>
			{items.map((item, i) => (
				<PercentValue
					key={i}
					item={item}
					isActive={selected === i}
					onPress={() => {
						setSelected(i)
						onSelectPercent(item)
					}}
				/>
			))}
		</View>
	)
}
