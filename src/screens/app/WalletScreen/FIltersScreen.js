import React from 'react'
import { FlatList, View } from 'react-native'
import AppInput from '../../../components/common/AppInput/AppInput'
import Coin from '../../../components/common/Coin'
import AddCoinItems from '../../../components/Profile/AddCoinItems'
import WalletSortSection from '../../../components/Profile/WalletSortSection'
import { globalStyles } from '../../../config/styles'
import { coins } from '../HomeStack/CreatePriceAlertScreen'

const items = coins

export default function FiltersScreen() {
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
