import { useRoute } from '@react-navigation/core'
import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { Images } from '../../../assets'
import AppText from '../../../components/common/AppText'
import Screen from '../../../components/Screen'
import { routes } from '../../../config/routes'
import { globalStyles } from '../../../config/styles'
import { RewardsTabNavigator } from '../../../navigation/RewardsTabStack'

export default function RewardsScreen() {
	const { params } = useRoute()
	const initialTabName =
		params?.tabIndex === 1 ? routes.transactionRewards : routes.referralRewards
	return (
		<Screen edges={['bottom']}>
			<View style={styles.rewardContainer}>
				<View style={styles.flex}>
					<AppText style={{ color: globalStyles.Colors.lightGrayColor }}>
						Total Rewards Earned
					</AppText>
					<View style={styles.value}>
						<AppText typo="xl" style={styles.pxrValue}>
							12,233
						</AppText>
						<AppText style={styles.pxr}>PRX</AppText>
					</View>
				</View>
				<Image
					source={Images.xpReward}
					style={{ maxHeight: 80, flex: 0.5 }}
					resizeMode="contain"
				/>
			</View>
			<View style={{ flex: 1 }}>
				<RewardsTabNavigator initialRouteName={initialTabName} />
			</View>
		</Screen>
	)
}

const styles = StyleSheet.create({
	rewardContainer: {
		flexDirection: 'row',
		paddingHorizontal: 24,
		paddingVertical: 8,
	},
	flex: {
		flex: 1,
		justifyContent: 'center',
	},
	value: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	pxr: {
		marginHorizontal: 4,
		color: globalStyles.Colors.lightGrayColor,
	},
	pxrValue: {
		color: globalStyles.Colors.secondaryColor,
	},
})
