import React, { useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import AppIcon from '../../../components/common/AppIcon'
import AppText from '../../../components/common/AppText'
import UserLevel from '../../../components/Home/UserLevel'
import { globalStyles } from '../../../config/styles'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Feather from 'react-native-vector-icons/Feather'
import AlertModal from '../../../components/common/AlertModal/AlertModal'
import LevelDetailsModal from './LevelDetailModal'

export default function TransactionRewardsScreen() {
	const [visible, setVisible] = useState(false)
	const showModal = () => {
		setVisible(true)
	}
	return (
		<View style={globalStyles.gapScreen}>
			<LevelDetailsModal visible={visible} setVisible={setVisible} />
			<ScrollView>
				<View style={styles.info}>
					<MaterialIcons
						name="info"
						color={globalStyles.Colors.text3}
						size={25}
					/>
					<View style={{ flex: 1, paddingStart: 8 }}>
						<AppText typo="tiny" color="text2">
							Transactions include (send, recieve and buy) BUT, buy or deposit
							PRX Tokens have 2x reward points.
						</AppText>
					</View>
				</View>
				<UserLevel level={1} checked onPress={showModal} />
				<UserLevel level={2} />
				<Feather
					style={{ alignSelf: 'center' }}
					name="chevrons-down"
					size={25}
					color={globalStyles.Colors.text2}
				/>
				<UserLevel level={3} hideIcon />
				<UserLevel level={4} hideIcon />
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	info: {
		flexDirection: 'row',
		alignItems: 'center',
		marginVertical: 16,
	},
})
