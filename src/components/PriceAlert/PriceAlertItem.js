import React, { useState } from 'react'
import { Image, View, Switch } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Images } from '../../assets'
import { globalStyles } from '../../config/styles'
import AppButton from '../common/AppButton'
import AppIcon from '../common/AppIcon'
import AppSwitch from '../common/AppSwitch'
import AppText from '../common/AppText'
import HR from '../common/HR/HR'

export default function PPriceAlertItem({ item, index, length, initialOpen }) {
	console.log('price alert', item)
	const [isOpen, setIsOpen] = useState(initialOpen || false)

	const [up, setUp] = useState(true)
	const [down, setDown] = useState(true)
	const [veryUp, setVeryUp] = useState(false)

	return (
		<View>
			<TouchableOpacity activeOpacity={0.75} onPress={() => setIsOpen(!isOpen)}>
				<View
					style={{
						marginVertical: 16,
						flexDirection: 'row',
						alignItems: 'center',
					}}
				>
					<AppIcon name={item.icon} />
					<View style={{ flex: 1, paddingHorizontal: 12 }}>
						<AppText bold typo="md">
							{item.title}
						</AppText>
						<AppText typo="tiny" color="text3">
							{item.slug}
						</AppText>
					</View>
					<AppText typo="md" bold>
						{item.currency}
						{item.price}
					</AppText>
					<AppIcon
						style={{ marginStart: 12 }}
						name={isOpen ? 'arrowUpCircleActive' : 'arrowDownFilled'}
					/>
				</View>
				{index + 1 === length ? null : <HR style={{ marginVertical: 4 }} />}
			</TouchableOpacity>
			{isOpen ? (
				<View>
					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'center',
							marginVertical: 8,
						}}
					>
						<Image source={Images.chartSuccess} />
						<View style={{ flex: 1, paddingHorizontal: 12 }}>
							<AppText bold>BTC is above $58,000</AppText>
							<AppText typo="dot" color="text3">
								Created on march 28, 2021
							</AppText>
						</View>
						<AppSwitch value={up} onValueChange={() => setUp(!up)} />
					</View>
					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'center',
							marginVertical: 8,
						}}
					>
						<Image source={Images.chartFailure} />
						<View style={{ flex: 1, paddingHorizontal: 12 }}>
							<AppText bold>BTC is below $58,000</AppText>
							<AppText typo="dot" color="text3">
								Created on march 29, 2021
							</AppText>
						</View>
						<AppSwitch value={down} onValueChange={() => setDown(!down)} />
					</View>
					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'center',
							marginVertical: 8,
						}}
					>
						<Image source={Images.chartGray} />
						<View style={{ flex: 1, paddingHorizontal: 12 }}>
							<AppText bold color="text3">
								BTC is above $59,000
							</AppText>
							<AppText typo="dot" color="text3">
								Created on march 28, 2021
							</AppText>
						</View>
						<AppSwitch
							value={veryUp}
							onValueChange={() => setVeryUp(!veryUp)}
						/>
					</View>
					<AppButton
						title="Add BTC Alert"
						icon="plus"
						customStyle={{ backgroundColor: globalStyles.Colors.bckColor }}
						textStyle={{ color: globalStyles.Colors.secondaryColor }}
					/>
					<HR />
				</View>
			) : null}
		</View>
	)
}
