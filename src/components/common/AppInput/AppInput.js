import React, { useState } from 'react'
import { View, TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { globalStyles } from '../../../config/styles'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import AppIcon from '../AppIcon'
import AppText from '../AppText'

export default function AppInput({
	label,
	alertIcon,
	icon,
	message,
	endMessage,
	placeholder,
	endIcon,
	alertIconColor,
	iconColor = globalStyles.Colors.text2,
	endIconColor = globalStyles.Colors.text2,
	endText,
	containerStyle,
	labelBadge,
	labelBadgeMode,
	onChangeText,
	onEndIconPress,
	imageIcon,
	password,
	...restProps
}) {
	const [secure, setSecure] = useState(!!password)

	const handleEndIconPress = () => {
		if (password) {
			setSecure(!secure)
		}
		onEndIconPress?.()
	}

	return (
		<View style={{ paddingVertical: 6, ...containerStyle }}>
			{label ? (
				<View
					style={{
						flexDirection: 'row',
						justifyContent: endMessage ? 'space-between' : 'flex-start',
					}}
				>
					<AppText typo="xs" color="text2">
						{label}
					</AppText>
					{endMessage ? (
						<TouchableOpacity>
							<AppText color="secondaryColor">{endMessage}</AppText>
						</TouchableOpacity>
					) : null}
					{labelBadge ? (
						<View
							style={{
								paddingHorizontal: 10,
								marginHorizontal: 10,
								backgroundColor:
									globalStyles.Colors[`${labelBadgeMode}Opacity`],
								borderRadius: 10,
								...globalStyles.flex.center,
							}}
						>
							<AppText typo="tiny" color={labelBadgeMode || 'success'}>
								{labelBadge}
							</AppText>
						</View>
					) : null}
				</View>
			) : null}
			<View
				style={{
					backgroundColor: globalStyles.Colors.inputColor,
					borderRadius: 10,
					marginVertical: 6,
					...globalStyles.flex.row,
					alignItems: 'center',
				}}
			>
				{imageIcon ? (
					<View
						style={{
							marginHorizontal: 18,
						}}
					>
						<AppIcon name={imageIcon} />
					</View>
				) : null}
				{icon ? (
					<View
						style={{
							marginHorizontal: 18,
						}}
					>
						<FontAwesome5 name={icon} color={iconColor} size={18} />
					</View>
				) : null}
				<View
					style={{
						flex: 1,
						...globalStyles.flex.row,
						alignItems: 'center',
						...globalStyles.flex.between,
						paddingHorizontal: icon ? 0 : 12,
						height: 55,
					}}
				>
					<TextInput
						type="text"
						placeholderTextColor={globalStyles.Colors.text3}
						placeholder={placeholder}
						onChangeText={onChangeText}
						style={{
							flex: 1,
							paddingVertical: 16,
							color: globalStyles.Colors.text1,
							fontSize: globalStyles.typo.xs,
						}}
						secureTextEntry={secure}
						{...restProps}
					/>
					{endIcon || password ? (
						<TouchableOpacity
							style={{ paddingHorizontal: 18 }}
							onPress={handleEndIconPress}
						>
							<FontAwesome5
								name={endIcon || (secure ? 'eye' : 'eye-slash')}
								color={endIconColor}
								size={15}
							/>
						</TouchableOpacity>
					) : null}
					{endText ? (
						<TouchableOpacity>
							<AppText typo="sm" color="secondaryColor">
								{endText}
							</AppText>
						</TouchableOpacity>
					) : null}
				</View>
			</View>
			{alertIcon || message ? (
				<View
					style={{
						...globalStyles.flex.row,
						alignItems: 'center',
						paddingBottom: 8,
					}}
				>
					{alertIcon ? (
						<FontAwesome5 size={15} name={alertIcon} color={alertIconColor} />
					) : null}
					{message ? (
						<AppText style={{ marginHorizontal: 8 }} typo="dot" color="text2">
							{message}
						</AppText>
					) : null}
				</View>
			) : null}
		</View>
	)
}
