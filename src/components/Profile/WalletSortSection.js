import { useNavigation } from '@react-navigation/core'
import React, { useState } from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { routes } from '../../config/routes'
import { globalStyles } from '../../config/styles'
import AppButton from '../common/AppButton'
import AppSwitch from '../common/AppSwitch'
import AppText from '../common/AppText'
import HR from '../common/HR/HR'

export default function WalletSortSection() {
	const items = ['Low to high', 'High to low']
	const { navigate } = useNavigation()
	const [up, setUp] = useState()

	const { bottom } = useSafeAreaInsets()

	return (
		<View
			style={{
				borderTopRightRadius: 20,
				borderTopLeftRadius: 20,
				backgroundColor: globalStyles.Colors.inputColor,
				paddingBottom: bottom,
			}}
		>
			<View
				style={{
					...globalStyles.flex.row,
					paddingVertical: 24,
					...globalStyles.flex.between,
					paddingHorizontal: 8,
				}}
			>
				<AppText style={{ paddingHorizontal: 8 }}>Sort by value</AppText>
				<View
					style={{
						...globalStyles.flex.row,
						height: 25,
						alignItems: 'center',
					}}
				>
					{items.map((item, i) => (
						<View
							key={i}
							style={{
								marginHorizontal: 8,
								backgroundColor: globalStyles.Colors.inputColor2,
								borderRadius: 10,
								...globalStyles.flex.center,
								borderStyle: 'solid',
								borderColor:
									globalStyles.Colors[i === 0 ? 'primaryColor' : 'inputColor2'],
								borderWidth: 1,
								height: 24,
							}}
						>
							<AppText
								bold
								typo="dot"
								style={{
									paddingHorizontal: 14,
									color:
										globalStyles.Colors[i === 0 ? 'primaryColor' : 'text2'],
								}}
							>
								{item}
							</AppText>
						</View>
					))}
				</View>
			</View>
			<View style={{ paddingHorizontal: 40 }}>
				<HR style={{ backgroundColor: globalStyles.Colors.text3 }} />
			</View>
			<View
				style={{
					paddingHorizontal: 18,
					...globalStyles.flex.row,
					...globalStyles.flex.between,
					alignItems: 'center',
					paddingVertical: 24,
				}}
			>
				<AppText color="text2">Hide zero balances</AppText>
				<AppSwitch
					value={up}
					onValueChange={() => {
						setUp(!up)
					}}
				/>
			</View>
			<View style={{ paddingHorizontal: 16 }}>
				<AppButton
					title="APPLY"
					style={{ fontWeight: 'bold' }}
					onPress={() => {
						navigate(routes.profileWallet)
					}}
				/>
			</View>
		</View>
	)
}
