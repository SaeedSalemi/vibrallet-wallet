import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
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

const defaultStyles = globalStyles()

const RestoreModalScreen = ({ navigation }) => {
	const [isFile, setIsFile] = useState(true)
	const dispatch = useDispatch()

	const handleToggle = () => setIsFile(!isFile)

	const handleRestore = () => {
		setUser({ username: true })
		dispatch(setLoggedIn(true))
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
							<View style={[defaultStyles.flex.row, defaultStyles.flex.center]}>
								<Feather
									name="file-text"
									color={defaultStyles.Colors.text3}
									size={20}
								/>
								<AppText style={styles.restoreText}>Restore from file</AppText>
							</View>
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
