import React, { Children } from 'react'
import { Modal, View } from 'react-native'
import { globalStyles } from '../../../config/styles'
import AppButton from '../AppButton'
import AppText from '../AppText'

export default function AlertModal({ visible, setVisible, children }) {
	const handleCloseModal = () => {
		setVisible(false)
	}

	return (
		<Modal visible={visible} transparent animationType="fade">
			<View
				style={{
					...globalStyles.gapScreen,
					backgroundColor: '#121113e6',
					justifyContent: 'center',
				}}
			>
				<View
					style={{
						backgroundColor: globalStyles.Colors.inputColor,
						borderRadius: 16,
						paddingHorizontal: 16,
					}}
				>
					{children}
					<AppButton title="OK" onPress={handleCloseModal} />
				</View>
			</View>
		</Modal>
	)
}
