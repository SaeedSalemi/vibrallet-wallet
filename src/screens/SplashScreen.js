import React, { useEffect } from 'react'
import { StyleSheet, Image, TouchableOpacity } from 'react-native'
import Screen from './../components/Screen'
import Colors from './../assets/Colors'
import Images from '../assets/Images'
import { useNavigation } from '@react-navigation/core'
import { routes } from '../config/routes'
import AppText from '../components/common/AppText'

const SplashScreen = () => {

	const { navigate } = useNavigation()
	useEffect(() => {
		setTimeout(() => {
			navigate(routes.appTab)
		}, 700)
	}, [])

	return (
		<Screen style={styles.screen}>
			<TouchableOpacity style={styles.screen} activeOpacity={1}>
				<Image
					fadeDuration={300}
					resizeMode={"contain"}
					style={{
						// width: '100%',
						height: 120,
						alignSelf: 'center',
						justifyContent: 'center',
					}}
					// style={styles.staterLogo}
					source={Images.vib_starterLogo}
				/>
				<Image
					fadeDuration={300}
					resizeMode={"contain"}
					style={{
						// width: '100%',
						marginVertical: 40,
						height: 50,
						alignSelf: 'center',
						justifyContent: 'center',
					}}
					// style={styles.staterLogo}
					source={Images.vib_starterLogoSub}
				/>
				<AppText typo="dot" color="text3">Version 1.32</AppText>
			</TouchableOpacity>
		</Screen>
	)
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: Colors.bckColor,
		alignItems: 'center',
		justifyContent: 'center',
	},
	staterLogo: {
		alignSelf: 'center',
		justifyContent: 'center',
	},
})

export default SplashScreen
