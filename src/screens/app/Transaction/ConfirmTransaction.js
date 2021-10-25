import React, { useMemo } from 'react'
import { ScrollView, View } from 'react-native'
import AppButton from '../../../components/common/AppButton'
import HR from '../../../components/common/HR/HR'
import Screen from '../../../components/Screen'
import CoinTitle from '../../../components/SendScreen/CoinTitle'
import InfoItems from '../../../components/SendScreen/InfoItems/InfoItem'
import { routes } from '../../../config/routes'
import { globalStyles } from '../../../config/styles'

export default function ConfirmTransaction({ navigation, route }) {
	const { navigate } = navigation
	const { coin, amount } = route.params || {}

	const items = useMemo(
		() => [
			{
				title: 'From',
				detail: 'ox293r9jwwf093urj2fijoesfu9023r2rkvieow',
			},
			{
				title: 'To',
				detail: 'ox593r9jwwf093urj2fijoesfu9023weweetre',
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

	const handleSend = () => {
		navigation.reset({
			index: 1,
			routes: [
				{ name: routes.appTab },
				{ name: routes.rewards, params: { tabIndex: 1 } },
			],
		})
	}

	return (
		<Screen style={{ ...globalStyles.gapScreen }} edges={['top', 'bottom']}>
			<ScrollView>
				<View>
					<CoinTitle
						value={`-${amount} ${coin.slug}`}
						failureTitle
						amount="$15,432"
						icon={coin.slug.toLowerCase()}
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
				bold
				typo="sm"
				customStyle={{ backgroundColor: globalStyles.Colors.failure }}
			/>
		</Screen>
	)
}
