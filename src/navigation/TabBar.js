import React, { useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import Ionicons from 'react-native-vector-icons/Ionicons'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Images } from '../assets'
import AppIcon from '../components/common/AppIcon'
import AppText from '../components/common/AppText'
import { routes } from '../config/routes'
import globalStyles from '../config/styles'

const defaultStyles = globalStyles()

export default function TabBar({ state, descriptors, navigation }) {
	const { bottom } = useSafeAreaInsets()
	const [show, setShow] = useState(false)

	const removeStack = name => name.replace('Stack', '')

	return (
		<>
			<View
				style={[
					styles.container,
					{ height: bottom + 60, justifyContent: 'center', zIndex: 10 },
				]}
			>
				{state.routes.map((route, index) => {
					const { options } = descriptors[route.key]
					const label =
						options.tabBarLabel !== undefined
							? options.tabBarLabel
							: options.title !== undefined
							? options.title
							: removeStack(route.name)

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

					const renderIcon = () => {
						const iconColor = isFocused
							? defaultStyles.Colors.primaryColor
							: defaultStyles.Colors.text1
						const iconSize = 25
						switch (route.name) {
							case routes.home:
								return (
									<MaterialIcons
										name="home-filled"
										size={iconSize}
										color={iconColor}
									/>
								)
							case routes.wallet:
								return (
									<Ionicons name="wallet" size={iconSize} color={iconColor} />
								)
							default:
								return <Ionicons name="wallet" color={iconColor} />
							case routes.market:
								return (
									<MaterialCommunityIcons
										name="chart-line"
										size={iconSize}
										color={iconColor}
									/>
								)
							case routes.profile:
								return (
									<FontAwesome name="user" size={iconSize} color={iconColor} />
								)
						}
					}

					return label !== routes.transaction ? (
						<TouchableOpacity
							accessibilityRole="button"
							accessibilityState={isFocused ? { selected: true } : {}}
							accessibilityLabel={options.tabBarAccessibilityLabel}
							testID={options.tabBarTestID}
							onPress={onPress}
							onLongPress={onLongPress}
							style={[
								defaultStyles.flex.center,
								styles.button,
								{
									paddingBottom: bottom,
									zIndex: 9,
								},
							]}
							key={index}
						>
							{renderIcon()}
							<AppText typo="tiny" style={styles.label}>
								{label}
							</AppText>
							{route.name !== routes.transaction && isFocused ? (
								<View
									style={{
										borderBottomColor: defaultStyles.Colors.primaryColor,
										borderStyle: 'solid',
										borderBottomWidth: 1,
										alignSelf: 'center',
										width: 32,
										position: 'absolute',
										bottom,
									}}
								/>
							) : null}
						</TouchableOpacity>
					) : (
						<TouchableOpacity
							onPress={() => setShow(!show)}
							key={index}
							activeOpacity={0.75}
							style={{ zIndex: 9 }}
						>
							<Image
								source={show ? Images.polygon6Cross : Images.polygon6}
								style={styles.polygon}
							/>
						</TouchableOpacity>
					)
				})}
			</View>
			{show ? (
				<View
					style={{
						width: 240,
						height: 240,
						borderRadius: 120,
						backgroundColor: defaultStyles.Colors.inputColor,
						position: 'absolute',
						bottom: -75 + bottom,
						alignSelf: 'center',
						zIndex: 1,
					}}
				>
					<TouchableOpacity
						style={{
							position: 'absolute',
							top: 50,
							left: 30,
							alignItems: 'center',
							zIndex: 9,
						}}
						onPress={() => {
							setShow(false)
							navigation.navigate(routes.selectCoin, { mode: 'send' })
						}}
					>
						<FontAwesome
							name="upload"
							color={defaultStyles.Colors.text3}
							size={25}
							style={{ marginBottom: 2 }}
						/>
						<AppText typo="tiny">Send</AppText>
					</TouchableOpacity>
					<TouchableOpacity
						style={{
							position: 'absolute',
							top: 15,
							left: 109,
							alignItems: 'center',
						}}
						onPress={() => {
							setShow(false)
							navigation.navigate(routes.selectCoin, { mode: 'buy' })
						}}
					>
						<MaterialCommunityIcons
							name="file-plus"
							color={defaultStyles.Colors.text3}
							size={25}
							style={{ marginBottom: 2 }}
						/>
						<AppText typo="tiny">Buy</AppText>
					</TouchableOpacity>
					<TouchableOpacity
						style={{
							position: 'absolute',
							top: 50,
							right: 30,
							alignItems: 'center',
						}}
						onPress={() => {
							setShow(false)
							navigation.navigate(routes.selectCoin, { mode: 'receive' })
						}}
					>
						<FontAwesome
							name="download"
							size={25}
							color={defaultStyles.Colors.text3}
							style={{ marginBottom: 2 }}
						/>
						<AppText typo="tiny">Receive</AppText>
					</TouchableOpacity>
				</View>
			) : null}
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: defaultStyles.Colors.inputColor,
		...defaultStyles.flex.row,
		marginTop: 20,
	},
	button: {
		flex: 1,
	},
	label: {
		paddingTop: 4,
	},
	polygon: {
		marginTop: -20,
	},
	swap: {
		position: 'absolute',
	},
})
