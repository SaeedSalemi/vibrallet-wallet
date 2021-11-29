import React from 'react'
import Foundation from 'react-native-vector-icons/Foundation'
import { Image, View, TouchableOpacity } from 'react-native'
import AppText from '../common/AppText'
import { Images } from '../../assets'
import { globalStyles } from '../../config/styles'
import AppIcon from '../common/AppIcon'
import HR from '../common/HR/HR'
import { useNavigation } from '@react-navigation/core'
import { routes } from '../../config/routes'
import Entypo from 'react-native-vector-icons/Entypo'

const ProfileInfo = () => {
	const { navigate } = useNavigation()

	return (
		<>
			<HR style={{ marginVertical: 4 }} />
			<View style={{ flexDirection: 'row' }}>
				{/* <Image source={Images.avatar} /> */}
				<Entypo name="user" size={25} color="#9299C2" style={{ marginTop: 6 }} />
				<View
					style={{
						flex: 1,
						...globalStyles.flex.row,
						...globalStyles.flex.between,
						alignItems: 'center',
						paddingHorizontal: 8,
					}}
				>
					<View>
						<AppText bold typo="xs">
							{'Login'}
						</AppText>
						<AppText color="text3" bold typo="dot">
							Vibranium Evangelist
						</AppText>
					</View>
					<TouchableOpacity onPress={() => navigate(routes.editProfile)}>
						<View
							style={{
								...globalStyles.flex.center,
							}}
						>
							<Foundation
								name="pencil"
								color={globalStyles.Colors.secondaryColor}
								size={20}
							/>
							<AppText color="secondaryColor" typo="tiny">
								Edit Profile
							</AppText>
							{/* <AppText color="text3" typo="dot">
								& Get Earned
							</AppText> */}
						</View>
					</TouchableOpacity>
				</View>
			</View>
			<HR style={{ marginVertical: 4 }} />
		</>
	)
}

export default ProfileInfo
