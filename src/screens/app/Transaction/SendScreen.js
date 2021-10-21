import { useNavigation } from '@react-navigation/core'
import React, { useMemo, useState } from 'react'
import { View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import ethManager from '../../../blockchains/EthManager'
import AppButton from '../../../components/common/AppButton'
import AppCamera from '../../../components/common/AppCamera'
import AppInput from '../../../components/common/AppInput/AppInput'
import AppText from '../../../components/common/AppText'
import HR from '../../../components/common/HR/HR'
import Screen from '../../../components/Screen'
import CoinTitle from '../../../components/SendScreen/CoinTitle'
import InfoItems from '../../../components/SendScreen/InfoItems/InfoItem'
import PercentValueItems from '../../../components/SendScreen/PercentValueItems/PercentValueItems'
import { routes } from '../../../config/routes'
import { globalStyles } from '../../../config/styles'

export default function SendScreen({ navigation, route }) {
	const [show, setShow] = useState(false)
	const { coin } = route.params || {}
	const [state, setState] = useState({
		address: '',
		amount: '',
	})

	// const inputItems = useMemo(
	// 	() => [
	// 		{
	// 			label: `${coin.slug} Address`,
	// 			endMessage: 'by Username',
	// 			placeholder: `Tap to paste ${coin.slug} address`,
	// 			endIcon: 'qrcode',
	// 			onPress: () => {
	// 				setShow(true)
	// 			},
	// 			onChangeText: text => setState({ ...state, address: text }),
	// 			value:
	// 		},
	// 		{
	// 			label: 'Enter Amount',
	// 			placeholder: `Enter ${coin.slug} Amount`,
	// 			icon: coin.title?.toLowerCase(),
	// 			iconColor: '#7037C9',
	// 			message: 'Estimated Value ~ $123,342.43',
	// 			onChangeText: text => setState({ ...state, amount: text }),
	// 		},
	// 	],
	// 	[]
	// )
	const valueItems = useMemo(
		() => [
			{ value: '25%', isActive: true },
			{ value: '50%' },
			{ value: '75%' },
			{ value: '100%' },
		],
		[]
	)
	const infoItems = useMemo(
		() => [
			{
				title: `${coin.title} Network Fee`,
				value: `0.0034 ${coin.slug}`,
				amount: '$2.31',
			},
			{
				title: 'Remaining Balance',
				value: `12.21 ${coin.slug}`,
				amount: '$213,940',
			},
		],
		[]
	)
	return (
		<Screen style={{ ...globalStyles.gapScreen }} edges={['bottom']}>
			<ScrollView>
				<View style={{ marginVertical: 32 }}>
					<CoinTitle
						title={`${coin.title} Balance`}
						icon={coin.title?.toLowerCase()}
						value={`12.432 ${coin.slug}`}
						amount="$15,432"
					/>
				</View>
				<View style={{ marginVertical: 6 }}>
					<AppInput
						label={`${coin.slug} Address`}
						endMessage={'by Username'}
						placeholder={`Tap to paste ${coin.slug} address`}
						endIcon={'qrcode'}
						onPress={() => {
							setShow(true)
						}}
						onChangeText={text => setState({ ...state, address: text })}
					/>
				</View>

				<View style={{ marginVertical: 6 }}>
					<AppInput
						label={'Enter Amount'}
						placeholder={`Enter ${coin.slug} Amount`}
						icon={coin.title?.toLowerCase()}
						iconColor={'#7037C9'}
						message={'Estimated Value ~ $123,342.43'}
						onChangeText={text => setState({ ...state, amount: text })}
					/>
				</View>

				<View style={{ marginVertical: 18 }}>
					<PercentValueItems items={valueItems} />
				</View>
				<View style={{ marginVertical: 24, flex: 1 }}>
					{infoItems.map((item, i) => (
						<View key={i}>
							<InfoItems
								title={item.title}
								amount={item.amount}
								value={item.value}
							/>
							{i + 1 === infoItems.length ? null : <HR />}
						</View>
					))}
				</View>
			</ScrollView>
			<AppButton
				onPress={async () => {
					await ethManager().transfer(null, '', state.address, state.amount)

					// navigation.navigate(routes.confirmTransaction, { coin })
				}}
				typo="sm"
				customStyle={{
					backgroundColor: globalStyles.Colors.failure,
					fontWeight: 'bold',
				}}
				bold
				title="Send"
			/>
			<AppCamera show={show} onClose={() => setShow(false)} />
		</Screen>
	)
}
