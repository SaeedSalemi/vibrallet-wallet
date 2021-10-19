import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import AppText from '../components/common/AppText'
import { routes } from '../config/routes'
import { globalStyles } from '../config/styles'

export default function TopTabBar({ state, descriptors, navigation }) {
	return (
		<View style={{ flexDirection: 'row' }}>
			{state.routes.map((route, index) => {
				const { options } = descriptors[route.key]
				const label =
					options.tabBarLabel !== undefined
						? options.tabBarLabel
						: options.title !== undefined
						? options.title
						: route.name

				const isFocused = state.index === index

				const onPress = () => {
					const event = navigation.emit({
						type: 'tabPress',
						target: route.key,
						canPreventDefault: true,
					})

					if (!isFocused && !event.defaultPrevented) {
						// The `merge: true` option makes sure that the params inside the tab screen are preserved
						navigation.navigate({ name: route.name, merge: true })
					}
				}

				const onLongPress = () => {
					navigation.emit({
						type: 'tabLongPress',
						target: route.key,
					})
				}

				const labelText = () => {
					if (label === routes.referralRewards) {
						return 'Referral Rewards'
					} else if (label === routes.transactionRewards) {
						return 'Transaction Rewards'
					} else if (label.includes('Favorite')) {
						return 'Favorite'
					} else {
						return label
					}
				}

				return (
					<TouchableOpacity
						accessibilityRole="button"
						accessibilityState={isFocused ? { selected: true } : {}}
						accessibilityLabel={options.tabBarAccessibilityLabel}
						testID={options.tabBarTestID}
						onPress={onPress}
						onLongPress={onLongPress}
						activeOpacity={0.9}
						style={{
							flex: 1,
							backgroundColor: globalStyles.Colors.bckColor,
							height: 50,
							alignItems: 'center',
							justifyContent: 'center',
							borderStyle: 'solid',
							borderBottomColor: isFocused
								? globalStyles.Colors.primaryColor
								: globalStyles.Colors.bckColor,
							borderBottomWidth: 1,
						}}
						key={index}
					>
						<AppText
							style={{
								color: isFocused
									? globalStyles.Colors.primaryColor
									: globalStyles.Colors.lightGrayColor,
							}}
						>
							{labelText()}
						</AppText>
					</TouchableOpacity>
				)
			})}
		</View>
	)
}
