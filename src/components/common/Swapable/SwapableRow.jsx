import React, { Component } from 'react'
import {
	Animated,
	StyleSheet,
	Text,
	View,
	I18nManager,
	Alert,
} from 'react-native'

import { RectButton } from 'react-native-gesture-handler'

import Swipeable from 'react-native-gesture-handler/Swipeable'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import { globalStyles } from '../../../config/styles'
import AppText from '../AppText'

export default class SwapableRow extends Component {
	static defaultProps = {
		measure: 70,
	}

	 renderLeftAction = (
		item,
		x,
		progress,
		divider
	) => {
		const trans = progress.interpolate({
			inputRange: [0, 1],
			outputRange: [x, 0],
		})
		const pressHandler = () => {
			this.close()
			item?.onPress?.()
		}

		return (
			<Animated.View
				style={{ flex: 1, transform: [{ translateX: trans }] }}
				key={item.title}
			>
				<RectButton
					style={[
						styles.rightAction,
						{ backgroundColor: item.color || globalStyles.Colors.bckColor },
					]}
					onPress={pressHandler}
				>
					<View
						style={{
							width: divider ? 2 : 35,
							height: divider ? '60%' : 35,
							...globalStyles.flex.center,
							backgroundColor: globalStyles.Colors.inputColor,
							borderRadius: 8,
						}}
					>
						<FontAwesomeIcon
							name={item.icon}
							size={20}
							color={globalStyles.Colors.text3}
						/>
					</View>
					<AppText style={styles.actionText} typo="tiny">
						{item.title}
					</AppText>
				</RectButton>
			</Animated.View>
		)
	}

	 renderLeftActions = (
		progress,
		_dragAnimatedValue
	) => (
		<View
			style={{
				width: this.props.leftItems.length * this.props.measure,
				flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
			}}
		>
			{this.props.leftItems.map((leftItem, i) =>
				this.renderLeftAction(leftItem, -this.props.measure * (i + 1), progress)
			)}
		</View>
	)

	 renderRightAction = (
		item,
		x,
		progress,
		divider
	) => {
		const trans = progress.interpolate({
			inputRange: [0, 1],
			outputRange: [x, 0],
		})
		const pressHandler = () => {
			this.close()
			item?.onPress?.()
			// Alert.alert(item.title)
		}

		return (
			<Animated.View
				style={{ flex: 1, transform: [{ translateX: trans }] }}
				key={item.title}
			>
				<RectButton
					style={[
						styles.rightAction,
						{ backgroundColor: item.color || globalStyles.Colors.bckColor },
					]}
					onPress={pressHandler}
				>
					<View
						style={{
							width: divider ? 2 : 35,
							height: divider ? '60%' : 35,
							...globalStyles.flex.center,
							backgroundColor: globalStyles.Colors.inputColor,
							borderRadius: 8,
						}}
					>
						<FontAwesomeIcon
							name={item.icon}
							size={20}
							color={globalStyles.Colors.text3}
						/>
					</View>
					<AppText style={styles.actionText} typo="tiny">
						{item.title}
					</AppText>
				</RectButton>
			</Animated.View>
		)
	}

	 renderRightActions = (
		progress,
		_dragAnimatedValue
	) => (
		<View
			style={{
				width: this.props.rightItems.length * this.props.measure,
				flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
			}}
		>
			{/* {this.renderRightAction(
				{},
				(this.props.rightItems.length) * this.props.measure,
				progress,
				true
			)} */}
			{this.props.rightItems.map((rightItem, i) =>
				this.renderRightAction(
					rightItem,
					this.props.rightItems.length * this.props.measure -
						i * this.props.measure,
					progress
				)
			)}
		</View>
	)

	// private swipeableRow?: Swipeable

	// private updateRef = (ref: Swipeable) => {
	// 	this.swipeableRow = ref
	// }
	 close = () => {
		this.swipeableRow?.close()
	}
	render() {
		const { children } = this.props
		return (
			<Swipeable
				ref={this.updateRef}
				friction={2}
				enableTrackpadTwoFingerGesture
				leftThreshold={20}
				rightThreshold={20}
				renderLeftActions={this.props.leftItems ? this.renderLeftActions : null}
				renderRightActions={
					this.props.rightItems ? this.renderRightActions : null
				}
			>
				{children}
			</Swipeable>
		)
	}
}

const styles = StyleSheet.create({
	leftAction: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	actionText: {
		backgroundColor: 'transparent',
		padding: 10,
	},
	rightAction: {
		alignItems: 'center',
		flex: 1,
		justifyContent: 'center',
	},
})
