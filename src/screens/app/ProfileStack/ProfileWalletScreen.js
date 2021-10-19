import React, { useMemo } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import AppButton from '../../../components/common/AppButton'
import AppIcon from '../../../components/common/AppIcon'
import AppText from '../../../components/common/AppText'
import WalletItem from '../../../components/Profile/WalletItem'
import Screen from '../../../components/Screen'
import { routes } from '../../../config/routes'
import { globalStyles } from '../../../config/styles'
import { coins } from '../HomeStack/CreatePriceAlertScreen'

export default function ProfileWalletScreen({ navigation }) {
	const walletItems = useSelector(state => state.wallets?.data)
	const items = walletItems?.map(item => ({
		title: item.name,
	}))
	// const items = useMemo(
	// 	() => [
	// 		{
	// 			title: 'Hassan Zarghami’s Wallet',
	// 			coins: [...coins, ...coins],
	// 		},
	// 		{
	// 			title: 'Emad dada’s Wallet',
	// 			coins: coins,
	// 		},
	// 	],
	// 	[]
	// )
	return (
		<Screen edges={['bottom']} style={{ ...globalStyles.gapScreen }}>
			{walletItems ? (
				<View style={{ flex: 1, marginVertical: 24 }}>
					{items.map((item, i) => (
						<View style={{ marginTop: 10 }} key={i}>
							<WalletItem item={item} index={i} key={i} />
						</View>
					))}
				</View>
			) : (
				<View style={{ flex: 1, ...globalStyles.flex.center }}>
					<AppText color="text3" typo="xl" bold>
						Create Your Wallet
					</AppText>
				</View>
			)}
			<AppButton
				title={'Create New Wallet'}
				textStyle={{ fontWeight: '500' }}
				onPress={() => {
					navigation.navigate(routes.newWallet)
				}}
			/>
		</Screen>
	)
}
