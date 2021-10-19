import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { globalStyles } from '../../config/styles'
import AppIcon from '../common/AppIcon'
import AppText from '../common/AppText'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

export default function UserLevel({ level, checked, hideIcon, onPress }) {
	return (
		<TouchableOpacity
			style={{
				padding: 12,
				borderRadius: 10,
				flexDirection: 'row',
				backgroundColor: globalStyles.Colors.inputColor,
				marginVertical: 8,
			}}
			onPress={onPress}
		>
			<View>
				<AppIcon name={`level${level}`} />
			</View>
			<View
				style={{
					flex: 1,
					paddingHorizontal: 8,
				}}
			>
				<AppText bold typo="sm">
					Level {level}
				</AppText>
				<AppText typo="tiny" color="text2">
					Below $1k Transactions
				</AppText>
				<View
					style={{
						backgroundColor: checked
							? globalStyles.Colors.success
							: hideIcon
							? globalStyles.Colors.text3
							: globalStyles.Colors.failure,
						height: 8,
						borderRadius: 10,
						marginVertical: 8,
					}}
				/>
				<AppText typo="dot">
					{checked ? 'Achieved Successfully' : '0& to achieve'}
				</AppText>
			</View>
			<View style={{ marginTop: 8 }}>
				{!hideIcon && !checked ? (
					<FontAwesome5
						name="chevron-circle-right"
						size={15}
						color={globalStyles.Colors.text3}
					/>
				) : null}
				{!hideIcon && checked ? (
					<FontAwesome5
						size={20}
						name="check-square"
						color={globalStyles.Colors.success}
					/>
				) : null}
			</View>
		</TouchableOpacity>
	)
}
