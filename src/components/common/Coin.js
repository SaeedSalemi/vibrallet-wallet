import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { routes } from '../../config/routes'
import { globalStyles } from '../../config/styles'
import useSVGChart from '../../hooks/useSVGChart'
import { coins } from '../../screens/app/HomeStack/CreatePriceAlertScreen'
import AppIcon from './AppIcon'
import AppSwitch from './AppSwitch'
import AppText from './AppText'
import HR from './HR/HR'
import MarketIcon from './MarketIcon/MarketIcon'

import SwapableRow from './Swapable/SwapableRow'
import Svg from 'react-native-svg'
import { SvgXml } from 'react-native-svg'
import { SvgUri } from 'react-native-svg'
export default function Coin({
	coin,
	index,
	length,
	noChart,
	noPrice,
	hideDetails,
	hasSwitch,
	onPress,
	onHideHandler
}) {
	const { navigate } = useNavigation()
	const SVGUri = useSVGChart(coin.symbol)
	console.log('svg2', SVGUri)
	return (
		<SwapableRow
			leftItems={[
				{
					title: 'Receive',
					icon: 'arrow-circle-down',
					onPress: () => navigate(routes.receive, { coin }),
				},
				{
					title: 'Send',
					icon: 'arrow-circle-up',
					onPress: () => navigate(routes.send, { coin }),
				},
			]}
			rightItems={[
				{
					title: 'Hide',
					icon: 'eye-slash',
					onPress: () => onHideHandler(coin)
				},
			]}
		>
			<TouchableOpacity onPress={onPress} activeOpacity={0.9}>
				<View style={{ flexDirection: 'row', zIndex: 9 }}>
					<View style={{ flex: 1 }}>
						<View style={{ flexDirection: 'row' }}>
							<MarketIcon size={50} color={globalStyles.Colors.inputColor2}>
								{coin.icon}
							</MarketIcon>
							<View style={{ paddingStart: 4 }}>
								<AppText bold typo="sm">
									{coin.slug}
								</AppText>
								<AppText typo="dot" color="text3">
									{coin.title}
								</AppText>
								{noPrice ? null : (
									<AppText color="text2" bold style={{ marginTop: 2 }}>
										{coin.currency}
										{coin.price}
									</AppText>
								)}
							</View>
						</View>
					</View>
					{noChart ? null : (
						// <View style={{ flex: 1, ...globalStyles.flex.center, width: 50, }}>
						// [
						// 	StyleSheet.absoluteFill,
						// 	{
						// 		alignItems: 'center',
						// 		justifyContent: 'center',
						// 		// marginLeft: 22,
						// 		// height: 20,
						// 		// paddingVertical: -10,
						// 		// marginVertical: -2,
						// 		width: '100%'

						// 	},
						// ]
						<View style={{}}>
							{/* <SvgUri
								width={100}
								style={{
									// backgroundColor: 'yellow'
								}}
								// uri="https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/6758.svg"
								uri={SVGUri}
							/> */}
							{/* <SvgUri /> */}
							{/* <Svg height="100%" width="100%"> */}
							{/* <SvgNode /> */}
							{/* </Svg> */}
							{/* <SvgUri /> */}
							{/* <Image source={{ uri: SVGUri }} /> */}

							{/* <SvgXml xml={SVGUri} /> */}
						</View>
					)}
					{hideDetails ? null : (
						<View style={{ flex: 1, alignItems: 'flex-end' }}>
							<AppText typo="sm" bold>
								{coin.amount}
							</AppText>
							<AppText
								typo="dot"
								bold
								color={coin.change > 0 ? 'success' : 'failure'}
								style={{ marginVertical: 2 }}
							>
								{coin.change > 0 ? '+' : ''}
								{coin.change}
							</AppText>
							{noPrice ? null : (
								<AppText bold color="text2">
									{coin.balance}
								</AppText>
							)}
						</View>
					)}
					{hasSwitch ? (
						<View style={{ alignItems: 'center', justifyContent: 'center' }}>
							<AppSwitch value={true} />
						</View>
					) : null}
				</View>
				<View style={{ marginVertical: 8 }}>
					{index + 1 !== (length || coins.length) ? <HR /> : null}
				</View>
			</TouchableOpacity>
		</SwapableRow>
	)
}
