import React from 'react'
import { Modal, View } from 'react-native'
import { globalStyles } from '../../config/styles'
import AppButton from '../common/AppButton'
import AppText from '../common/AppText'

export default function SetAlert({ visible, onPress }) {
	return (
		<Modal visible={visible} transparent animationType="fade">
			<View
				style={{
					backgroundColor: '#121113e6',
					justifyContent: 'flex-end',
					flex: 1,
				}}
			>
				<View
					style={{
						backgroundColor: globalStyles.Colors.inputColor,
						borderTopRightRadius: 10,
						borderTopLeftRadius: 10,
						paddingHorizontal: 16,
					}}
				>
					<View style={{ height: 250 }}></View>
					<AppButton title="Create Alert" onPress={onPress} />
					<AppButton
						onPress={onPress}
						title="Cancel"
						customStyle={{ backgroundColor: globalStyles.Colors.inputColor }}
					/>
				</View>
			</View>
		</Modal>
	)
}
