import React from 'react'
import { RNCamera } from 'react-native-camera'
import AppButton from '../common/AppButton'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Modal } from 'react-native'
import { globalStyles } from '../../config/styles'

export default function AppCamera({ show, onClose }) {
	return (
		<Modal visible={show} onRequestClose={onClose} animationType="slide">
			<RNCamera
				style={{
					flex: 1,
				}}
				type={RNCamera.Constants.Type.back}
				flashMode={RNCamera.Constants.FlashMode.on}
			>
				<SafeAreaView style={{ flex: 1 }}>
					<AppButton
						customStyle={{
							borderWidth: 1,
							width: 70,
							height: 70,
							backgroundColor: globalStyles.Colors.primaryColor,
							borderRadius: 70 / 2,
							...globalStyles.flex.center,
							margin: 12,
						}}
						onPress={onClose}
						title="Close"
					/>
				</SafeAreaView>
			</RNCamera>
		</Modal>
	)
}
