import React, { useRef, useState, useEffect } from 'react'
// import { RNCamera } from 'react-native-camera'
import { Camera } from 'expo-camera';
import AppButton from '../common/AppButton'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Modal, View } from 'react-native'
import { globalStyles } from '../../config/styles'
import QRCodeScanner from 'react-native-qrcode-scanner'

export default function AppCamera({ show, onClose, qr, onQR }) {

	const [hasPermission, setHasPermission] = useState(null);
	const [type, setType] = useState(Camera.Constants.Type.back);

	const rnCameraRef = useRef(null)
	const handleOnRead = qrData => {
		onQR(qrData)
	}

	useEffect(() => {
		(async () => {
			const { status } = await Camera.requestPermissionsAsync();
			setHasPermission(status === 'granted');
		})();
	}, []);

	return (
		<Modal visible={show} onRequestClose={onClose} animationType="slide">
			{qr ? (
				<QRCodeScanner
					onRead={handleOnRead}
					flashMode={Camera.Constants.FlashMode.auto}
					showMarker
					customMarker={
						<View
							style={{
								...globalStyles.flex.center,
								flex: 1,
							}}
						>
							<View
								style={{
									position: 'relative',
									width: 200,
									height: 200,
								}}
							>
								<View
									style={{
										position: 'absolute',
										left: 0,
										top: 0,
										width: 30,
										height: 30,
										borderLeftWidth: 3,
										borderTopWidth: 3,
										borderTopLeftRadius: 8,
										borderColor: globalStyles.Colors.text2,
									}}
								></View>
								<View
									style={{
										position: 'absolute',
										right: 0,
										top: 0,
										width: 30,
										height: 30,
										borderRightWidth: 3,
										borderColor: globalStyles.Colors.text2,
										borderTopWidth: 3,
										borderTopRightRadius: 8,
									}}
								></View>
								<View
									style={{
										position: 'absolute',
										left: 0,
										bottom: 0,
										width: 30,
										height: 30,
										borderBottomWidth: 3,
										borderColor: globalStyles.Colors.text2,
										borderLeftWidth: 3,
										borderBottomLeftRadius: 8,
									}}
								></View>
								<View
									style={{
										position: 'absolute',
										right: 0,
										bottom: 0,
										width: 30,
										height: 30,
										borderRightWidth: 3,
										borderBottomWidth: 3,
										borderColor: globalStyles.Colors.text2,
										borderBottomRightRadius: 8,
										bottom: 0,
										right: 0,
									}}
								></View>
							</View>
						</View>
					}
				/>
			) : (
				<Camera
					ref={rnCameraRef}
					style={{
						flex: 1,
					}}
					type={Camera.Constants.Type.back}
					flashMode={Camera.Constants.FlashMode.on}
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

								position: 'absolute',
								top: 16,
								left: 16,
							}}
							onPress={onClose}
							title="Close"
						/>
					</SafeAreaView>
				</Camera>
			)}
		</Modal>
	)
}
