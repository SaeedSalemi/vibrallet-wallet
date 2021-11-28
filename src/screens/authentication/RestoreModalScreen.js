import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import Screen from '../../components/Screen'
import AppText from '../../components/common/AppText'
import AppButton from '../../components/common/AppButton'

import globalStyles from './../../config/styles'
import AppIcon from '../../components/common/AppIcon'
import { TextInput } from 'react-native-gesture-handler'
import { setUser } from '../../utils/storage'
import Feather from 'react-native-vector-icons/Feather'
import { useDispatch } from 'react-redux'
import { setLoggedIn } from '../../redux/modules/appSettings'
import DocumentPicker from 'react-native-document-picker'
import { decrypt } from '../../utils/Functions'
import RNFS from 'react-native-fs'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { showMessage } from 'react-native-flash-message'
import { routes } from '../../config/routes'
import { useNavigation } from '@react-navigation/core'

const defaultStyles = globalStyles()

const RestoreModalScreen = ({ navigation }) => {
	const [isFile, setIsFile] = useState(true)
	const dispatch = useDispatch()
	const { navigate } = useNavigation()

	const handleToggle = () => setIsFile(!isFile)

	const [fileUri, setFileUri] = useState('')

	const handleFilePicker = async () => {
		try {
			const res = await DocumentPicker.pickSingle({
				type: [DocumentPicker.types.allFiles],
			})
			setFileUri(res)
		} catch (err) {
			if (DocumentPicker.isCancel(err)) {
				console.log('error', err)
			} else {
				throw err
			}
		}

	}

	const handleRestore = () => {


		if (fileUri !== "") {
			RNFS.readFile(fileUri.uri, 'utf8').then(content => {
				const key = "persist:root"
				let decode = decrypt(JSON.parse(content))
				AsyncStorage.getItem(key).then(persist => {
					if (persist !== null) {
						let item = JSON.parse(persist)

						const clonePersist = JSON.parse(persist);
						if (item !== null) {
							let wallets = JSON.parse(item["wallets"])
							if (wallets["data"] === null) {
								clonePersist
								const _walletData = {
									create: null,
									data: [
										{ name: 'vibrallet_backup', backup: decode }
									]
								}
								clonePersist["wallets"] = JSON.stringify(_walletData)
								AsyncStorage.removeItem(key).then(result => {

									AsyncStorage.setItem(key, JSON.stringify(clonePersist))
									showMessage({
										message: 'Your wallet has been restored.',
										description: null,
										type: 'success',
										icon: null,
										duration: 3000,
										style: { backgroundColor: "#16a085" },
										position: 'top'
									})
									setUser({ username: true })
									dispatch(setLoggedIn(true))
								})
							}
						}


					} else {

					}

				})
			}).catch(error => {
				console.log('error read file', error)
			})
		}




	}

	return (
		<Screen style={defaultStyles.gapScreen}>
			<AppText style={styles.title}>
				Restore your wallet using backup file or type your 12-word backup phrase
				Then enter your password to restore
			</AppText>
			<View style={styles.wrapper}>
				<View>
					<View style={[defaultStyles.flex.row, defaultStyles.flex.between]}>
						<AppText style={styles.howText}>How to restore</AppText>
						<AppText style={styles.optionText} onPress={handleToggle}>
							{isFile ? 'Enter Text' : 'Choose File'}
						</AppText>
					</View>
					<View style={[styles.modeWrapper, defaultStyles.flex.center]}>
						{isFile ? (
							<TouchableOpacity onPress={handleFilePicker}>
								<View style={[defaultStyles.flex.row, defaultStyles.flex.center]}>
									<Feather
										name="file-text"
										color={defaultStyles.Colors.text3}
										size={20}
									/>
									<AppText style={styles.restoreText}>Restore from file</AppText>
								</View>
							</TouchableOpacity>
						) : (
							<View
								style={[
									defaultStyles.flex.row,
									defaultStyles.flex.center,
									styles.fileWrapper,
								]}
							>
								<Feather
									name="file-text"
									color={defaultStyles.Colors.text3}
									size={20}
								/>
								<TextInput
									style={styles.input}
									placeholder="12-word backup phrase"
									placeholderTextColor={defaultStyles.Colors.darkTextColor}
									color={defaultStyles.Colors.textColor}
								/>
								<AppText style={styles.paste}>Paste</AppText>
								<AppIcon name="scan" style={styles.icon} />
							</View>
						)}
					</View>
				</View>
				<AppButton typo="sm" title="Restore" onPress={handleRestore} />
			</View>
		</Screen>
	)
}

const styles = StyleSheet.create({
	title: {
		paddingVertical: 30,
		width: '70%',
		alignSelf: 'center',
		textAlign: 'justify',
	},
	wrapper: {
		flex: 1,
		justifyContent: 'space-between',
	},
	howText: {
		color: defaultStyles.Colors.lightGrayColor,
	},
	optionText: {
		color: defaultStyles.Colors.primaryColor,
	},
	modeWrapper: {
		alignSelf: 'stretch',
		height: 70,
		backgroundColor: defaultStyles.Colors.inputColor,
		borderRadius: 10,
		marginTop: 8,
	},
	restoreText: {
		paddingHorizontal: 8,
	},
	icon: {
		margin: 12,
	},
	fileWrapper: {
		paddingHorizontal: 8,
	},
	input: {
		flex: 1,
		marginHorizontal: 8,
	},
	paste: {
		color: defaultStyles.Colors.blue,
		marginHorizontal: 8,
	},
})

export default RestoreModalScreen
