import React from 'react'
import { View } from 'react-native'
import AppButton from '../../../components/common/AppButton'
import UserCoinsItems from '../../../components/Profile/UserCoinsItems'
import Screen from '../../../components/Screen'
import { routes } from '../../../config/routes'
import { globalStyles } from '../../../config/styles'

export default function UserCoinsScreen({ navigation }) {
	return (
		<Screen edges={['bottom']} style={{ ...globalStyles.gapScreen }}>
			<View style={{ flex: 1 }}>
				<UserCoinsItems />
			</View>
			<View>
				<AppButton
					title="Add Coin/Token"
					style={{ fontWeight: 'bold' }}
					onPress={() => {
						navigation.navigate(routes.addCoinOrToken)
					}}
				/>
			</View>
		</Screen>
	)
}
