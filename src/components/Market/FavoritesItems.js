import React from 'react'
import { View } from 'react-native'
import { globalStyles } from '../../config/styles'
import AppIcon from '../common/AppIcon'
import AppText from '../common/AppText'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Foundation from 'react-native-vector-icons/Foundation'

export default function FavoritesItems({ title }) {
	return (
		<View
			style={{
				...globalStyles.flex.row,
				alignItems: 'center',
			}}
		>
			<View style={{ ...globalStyles.flex.row, alignItems: 'center', flex: 1 }}>
				<View
					style={{
						width: 20,
						height: 20,
						backgroundColor: '#F84837',
						borderRadius: 20 / 2,
						...globalStyles.flex.center,
					}}
				>
					<View
						style={{ height: 2, width: 10, backgroundColor: 'white' }}
					></View>
				</View>
				<AppText color="text1" bold typo="sm" style={{ paddingHorizontal: 8 }}>
					{title}
				</AppText>
			</View>
			<View style={{ flex: 1, alignItems: 'center' }}>
				<MaterialCommunityIcons
					name="arrow-up-bold-box"
					size={20}
					color={globalStyles.Colors.text3}
				/>
			</View>
			<View style={{ flex: 1, alignItems: 'flex-end' }}>
				<Foundation name="list" size={20} color={globalStyles.Colors.text3} />
			</View>
		</View>
	)
}
