import React from 'react'
import { StyleSheet, Image, TouchableOpacity } from 'react-native'
import Screen from './../components/Screen'
import Colors from './../assets/Colors'
import Images from '../assets/Images'

const SplashScreen = () => {
	return (
		<Screen style={styles.screen}>
			<TouchableOpacity style={styles.screen} activeOpacity={1}>
				<Image
					fadeDuration={300}
					style={styles.staterLogo}
					source={Images.starterLogo}
				/>
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
