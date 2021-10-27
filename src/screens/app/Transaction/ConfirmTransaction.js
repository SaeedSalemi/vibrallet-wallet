import React, { useMemo, useState } from 'react'
import { ScrollView, View } from 'react-native'
import AppButton from '../../../components/common/AppButton'
import HR from '../../../components/common/HR/HR'
import Screen from '../../../components/Screen'
import CoinTitle from '../../../components/SendScreen/CoinTitle'
import InfoItems from '../../../components/SendScreen/InfoItems/InfoItem'
import { routes } from '../../../config/routes'
import { globalStyles } from '../../../config/styles'
import ethManager from './../../../blockchains/EthManager'
import bscManager from './../../../blockchains/BscManager'
import { showMessage } from 'react-native-flash-message'



export default function ConfirmTransaction({ navigation, route }) {
	const { navigate } = navigation
	const { coin, amount, wallet, address } = route.params || {}
	const [isPosting, setIsPosting] = useState(false)

	const items = useMemo(
		() => [
			{
				title: 'From',
				detail: wallet.address,
			},
			{
				title: 'To',
				detail: address,
				// detail: wallet,
			},
			{
				title: 'Network Fee',
				value: `0.002155 ${coin.slug} ($3.99)`,
			},
			{
				title: 'Max Total',
				value: '$15,436.45',
			},
		],
		[]
	)

	const handleSend = async () => {

		try {
			setIsPosting(true)
			const coinSelector = { ETH: ethManager, BSC: bscManager }
			let selectedCoin = coinSelector[coin.slug];

			const result = await selectedCoin.transfer(
				null,
				wallet,
				address,
				amount
			)

		} catch (ex) {
			console.error('log', ex)
		}
		setIsPosting(true)

		showMessage({
			message: 'Transfer execute succesfuly',
			description: null,
			type: 'success',
			icon: null,
			duration: 2000,
			style: { backgroundColor: "green" },
			position: 'top'
		})

		navigation.navigate(routes.receipt, { coin: coin, wallet: wallet, address: address })
		// navigation.reset({
		// 	index: 1,
		// 	routes: [
		// 		{ name: routes.appTab },
		// 		{ name: routes.rewards, params: { tabIndex: 1 } },
		// 	],
		// })
	}

	return (
		<Screen style={{ ...globalStyles.gapScreen }} edges={['top', 'bottom']}>
			<ScrollView>
				<View>
					<CoinTitle
						value={`-${amount} ${coin.slug}`}
						failureTitle
						amount="$15,432"
						icon={coin.title?.toLowerCase()}
					/>
				</View>
				<View style={{ flex: 1, marginVertical: 18 }}>
					{items.map((item, i) => (
						<View key={i}>
							<InfoItems
								title={item.title}
								detail={item.detail}
								value={item.value}
							/>
							{i + 1 === items.length ? null : <HR />}
						</View>
					))}
				</View>
			</ScrollView>
			<AppButton
				onPress={handleSend}
				title="Send"
				loading={isPosting}
				bold
				typo="sm"
				customStyle={{ backgroundColor: globalStyles.Colors.failure }}
			/>
		</Screen>
	)
}
