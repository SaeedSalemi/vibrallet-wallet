import React from 'react'
import { View, TouchableOpacity, Vibration } from 'react-native'
import { globalStyles } from '../../config/styles'
import AppIcon from '../common/AppIcon'
import AppText from '../common/AppText'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Foundation from 'react-native-vector-icons/Foundation'

export default function FavoritesItems({ title, onDrag }) {

	const ONE_SECOND_IN_MS = 1000;

	const PATTERN = [
		1 * ONE_SECOND_IN_MS,
		2 * ONE_SECOND_IN_MS,
		3 * ONE_SECOND_IN_MS
	];

	const PATTERN_DESC =
		Platform.OS === "android"
			? "wait 1s, vibrate 2s, wait 3s"
			: "wait 1s, vibrate, wait 2s, vibrate, wait 3s";

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
				<TouchableOpacity onLongPress={() => {
					Vibration.vibrate(1 * 150)
					onDrag()
				}}>
					<Foundation name="list" size={20} color={globalStyles.Colors.text3} />
				</TouchableOpacity>
			</View>
		</View>
	)
}
