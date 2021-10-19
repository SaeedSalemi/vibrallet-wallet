import React from 'react'
import { View, Image } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Images } from '../../../assets'
import AppText from '../../../components/common/AppText'
import EditProfileForm from '../../../components/Profile/EditPofileForm'
import { globalStyles } from '../../../config/styles'

export default function EditProfileScreen() {
	return (
		<ScrollView style={globalStyles.gapScreen}>
			<View style={{ ...globalStyles.flex.center, marginVertical: 30 }}>
				<Image source={Images.avatar2} />
			</View>
			<View style={{ ...globalStyles.flex.center, paddingBottom: 18 }}>
				<AppText typo="xs" color="text1">
					Dear SamJones
				</AppText>
				<AppText typo="tiny" color="text2" style={{ marginVertical: 2 }}>
					Complete identity fields blow to earn 100 PRX
				</AppText>
				<View style={{ ...globalStyles.flex.center }}>
					<Image source={Images.progress} />
					<AppText typo="dot" color="text3">
						3 fields to achieve 100 PRX
					</AppText>
				</View>
			</View>
			<View>
				<EditProfileForm />
			</View>
		</ScrollView>
	)
}
