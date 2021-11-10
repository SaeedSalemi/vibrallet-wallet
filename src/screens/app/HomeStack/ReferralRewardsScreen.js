import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import AppButton from '../../../components/common/AppButton'
import AppIcon from '../../../components/common/AppIcon'
import AppText from '../../../components/common/AppText'
import Steps from '../../../components/Steps/Steps'
import { globalStyles } from '../../../config/styles'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
const data = [
	{
		title: 'Invite your friends',
		subTitle: 'Just share your link.',
	},
	{
		title: 'They make transaction',
		subTitle: 'Everyone of them must have at least $10k transaction.',
	},
	{
		title: 'You got your reward!',
		subTitle: 'Then you receive your 1 token.',
	},
]

export default function ReferralRewardsScreen() {
	return (
		<View style={[globalStyles.screen, styles.container]}>
			<ScrollView style={styles.scroll}>
				<AppText typo="sm">
					Refer a friend
				</AppText>
				{/* <AppText typo="tiny" color="text2">
					and you can earn PRX tokens as much as you want.
				</AppText> */}
				<View style={styles.info}>
					<MaterialIcons
						name="info"
						color={globalStyles.Colors.primaryColor}
						size={20}
					/>
					<AppText typo="tiny" color="primaryColor" style={styles.howText}>
						How it works
					</AppText>
				</View>
				<Steps data={data} />
				<View style={styles.referral}>
					<AppText color="text3" typo="tiny">
						Referral Code
					</AppText>
					<AppText typo="sm" bold>
						12nfef23rm
					</AppText>
					<AppText color="primaryColor" bold>
						Copy
					</AppText>
				</View>
				<View style={styles.gift}>
					<FontAwesome5 name="gift" color="#727AF4" size={15} />
					<AppText typo="dot" color="text3" style={styles.giftText}>
						Your friends get 5 on their Transactions above $10k total.
					</AppText>
				</View>
			</ScrollView>
			<View>
				<AppButton
					title="Refer Friend Now"
					icon="cloud-upload"
					typo="sm"
					bold
				/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		position: 'relative',
		paddingHorizontal: 10,
	},
	scroll: {
		marginVertical: 30,
	},
	info: {
		paddingVertical: 16,
		flexDirection: 'row',
		alignItems: 'center',
	},
	howText: {
		paddingHorizontal: 8,
	},
	referral: {
		backgroundColor: globalStyles.Colors.inputColor2,
		borderRadius: 10,
		padding: 16,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginVertical: 24,
	},
	gift: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 16,
	},
	giftText: {
		width: '75%',
		textAlign: 'center',
		paddingTop: 4,
	},
})
