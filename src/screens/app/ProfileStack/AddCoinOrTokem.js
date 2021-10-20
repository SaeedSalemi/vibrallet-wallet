import React from 'react'
import { View } from 'react-native'
import AppInput from '../../../components/common/AppInput/AppInput'
import AddCoinItems from '../../../components/Profile/AddCoinItems'
import WalletSortSection from '../../../components/Profile/WalletSortSection'
import { globalStyles } from '../../../config/styles'
import { coins } from '../HomeStack/CreatePriceAlertScreen'

export default function AddCoinOrToken() {
	const items = coins

	return (
		<View style={{ ...globalStyles.gapScreen }}>
			<View>
				<AppInput icon="search" placeholder="Search..." />
			</View>
			<AddCoinItems coins={items} />
			<WalletSortSection />
		</View>
	)
}
