import React, { useEffect, useRef, useState } from 'react'
import { View, ActivityIndicator, Modal } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { globalStyles } from '../../config/styles'
import AppText from '../common/AppText'

export default function PriceCalculator({ coin, style }) {
	const [items, setItems] = useState([])
	const [priceAlertValue, setPriceAlertValue] = useState(coin.lastPrice)
	const [loading, setLoading] = useState(true)

	const listRef = useRef(null)

	useEffect(() => {
		const arr = []
		for (let i = -100; i <= 100; i++) {
			arr.push({
				price: coin.lastPrice,
				percent: i,
			})
		}
		setItems(arr)

		const timeout = setTimeout(() => {
			listRef.current.scrollToIndex({ index: 100 })
			setLoading(false)
		}, 4000)

		return () => {
			clearTimeout(timeout)
		}
	}, [])

	const isNumberPositive = number => Number(number) > 0

	const calcPercentLabel = percent => {
		if (isNumberPositive(percent)) {
			return percent > 10 ? -4 : 0
		} else {
			return Math.abs(percent) >= 10 ? -8 : -4
		}
	}

	const calcPricePercentLeft = price => {
		return -(price.toString().length / 3) * 8
	}

	const calcPricePercent = (price, percent) => {
		const percentPrice = price * (percent / 100)
		return (Number(price) + percentPrice).toFixed(2)
	}

	const calcPercentPrice = (price, percent) => {
		if (isNumberPositive(price)) {
			return calcPricePercent(price, percent)
		} else {
			return 'N/A'
		}
	}

	const handleScroll = event => {
		const x = event.nativeEvent.contentOffset.x + 136
		let percentIndex = -(100 - x / 100)
		if (percentIndex >= 100) {
			percentIndex = Math.round(x - 10000) / 100
		}
		setPriceAlertValue(calcPricePercent(coin.lastPrice, percentIndex))
		// Vibration.vibrate()
	}

	return (
		<View style={style || {}}>
			<Modal
				visible={loading}
				animationType="fade"
				style={{ backgroundColor: globalStyles.Colors.inputColorOpacity }}
				transparent
			>
				<View
					style={{
						...globalStyles.flex.center,
						flex: 1,
						backgroundColor: globalStyles.Colors.inputColorOpacity,
					}}
				>
					<ActivityIndicator
						size={80}
						color={globalStyles.Colors.primaryColor}
					/>
				</View>
			</Modal>
			<View style={{ ...globalStyles.flex.center }}>
				<AppText color="text2" style={{ marginTop: 32 }}>
					Alert Me when {coin.slug} is
				</AppText>
			</View>
			<View
				style={{
					...globalStyles.flex.row,
					...globalStyles.flex.between,
					alignItems: 'center',
					marginVertical: 16,
					marginBottom: 40
				}}
			>
				<AppText>0.0%</AppText>
				<View
					style={{
						width: 40,
						height: 1,
						backgroundColor: globalStyles.Colors.text3,
					}}
				></View>
				<View style={{ alignItems: 'center' }}>
					<View style={{ ...globalStyles.flex.row }}>
						<AppText typo="xxl">{priceAlertValue}</AppText>
						<AppText
							typo="xxl"
							style={{ marginLeft: 8, fontWeight: '300' }}
							color="text3"
						>
							USD
						</AppText>
					</View>
					<View
						style={{
							width: 165,
							height: 1,
							backgroundColor: globalStyles.Colors.inputColor,
							marginTop: 4,
						}}
					></View>
				</View>
				<View
					style={{
						width: 40,
						height: 1,
						backgroundColor: globalStyles.Colors.text3,
					}}
				></View>
				<AppText>3,4</AppText>
			</View>
			<View
				style={{
					height: 180,
					paddingVertical: 20,
					width: '100%',
					opacity: Number(!loading),
					position: 'relative',
				}}
			>
				<View
					style={{
						height: 180,
						paddingVertical: 20,
						width: 140,
						position: 'absolute',
						backgroundColor: globalStyles.Colors.successOpacity,
						top: 0,
						bottom: 0,
						left: 0,
					}}
				></View>
				<FlatList
					contentContainerStyle={{ alignItems: 'center' }}
					showsHorizontalScrollIndicator={false}
					horizontal
					onMomentumScrollEnd={handleScroll}
					keyExtractor={(_, i) => i.toString()}
					ref={listRef}
					initialNumToRender={130}
					renderItem={({ item }) => (
						<View
							style={{
								width: 100,
								height: 100,
								flexDirection: 'row',
								alignItems: 'center',
								position: 'relative',
								justifyContent: 'space-around',
							}}
						>
							<AppText
								style={{
									position: 'absolute',
									alignSelf: 'flex-start',
									left: calcPercentLabel(item.percent),
									top: -10,
								}}
							>
								{item.percent}%
							</AppText>
							<AppText
								style={{
									position: 'absolute',
									alignSelf: 'flex-start',
									left: calcPricePercentLeft(item.price),
									bottom: -10,
								}}
							>
								${calcPercentPrice(item.price, item.percent)}
							</AppText>
							<View
								style={{
									height: 70,
									width: 2,
									backgroundColor: globalStyles.Colors.text1,
								}}
							/>
							<View
								style={{
									height: 40,
									width: 1,
									backgroundColor: globalStyles.Colors.text2,
								}}
							/>
							<View
								style={{
									height: 40,
									width: 1,
									backgroundColor: globalStyles.Colors.text2,
								}}
							/>
							<View
								style={{
									height: 40,
									width: 1,
									backgroundColor: globalStyles.Colors.text2,
								}}
							/>
							<View
								style={{
									height: 40,
									width: 1,
									backgroundColor: globalStyles.Colors.text2,
								}}
							/>
							<View
								style={{
									height: 40,
									width: 1,
									backgroundColor: globalStyles.Colors.text2,
								}}
							/>
							<View
								style={{
									height: 40,
									width: 1,
									backgroundColor: globalStyles.Colors.text2,
								}}
							/>
							<View
								style={{
									height: 40,
									width: 1,
									backgroundColor: globalStyles.Colors.text2,
								}}
							/>
							<View
								style={{
									height: 40,
									width: 1,
									backgroundColor: globalStyles.Colors.text2,
								}}
							/>
							<View
								style={{
									height: 40,
									width: 1,
									backgroundColor: globalStyles.Colors.text2,
								}}
							/>
							<View
								style={{
									height: 40,
									width: 1,
									backgroundColor: globalStyles.Colors.text2,
								}}
							/>
						</View>
					)}
					data={items}
				/>
			</View>
		</View>
	)
}
