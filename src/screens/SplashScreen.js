import React, { useEffect, useLayoutEffect } from 'react'
import { StyleSheet, Image, TouchableOpacity } from 'react-native'
import Screen from './../components/Screen'
import Colors from './../assets/Colors'
import Images from '../assets/Images'
import { useNavigation } from '@react-navigation/core'
import { routes } from '../config/routes'
import AppText from '../components/common/AppText'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Network from 'expo-network';
import { checkExistsWallet } from '../utils/WalletFunctions'
import { checkNetworkStauts } from '../utils/Functions'

const SplashScreen = ({ navigation }) => {
	const { navigate } = useNavigation()

	useLayoutEffect(() => {
		checkNetworkStauts()
	}, [])


	useEffect(() => {
		checkExistsWallet().then(wallet => {
			if (wallet) {
				setTimeout(() => navigation.replace(routes.appTab), 100)
			} else {
				navigation.replace(routes.welcome)
			}
		}).catch(err => { console.log('splash screen catch', err) })
	}, [])


	// const checkExistsWallet = async () => {
	// 	const persist = await AsyncStorage.getItem('persist:root')
	// 	if (persist !== null) {
	// 		let item = JSON.parse(persist)
	// 		if (item !== null) {
	// 			let wallets = JSON.parse(item["wallets"])
	// 			if (wallets["data"] === null) {
	// 				navigation.replace(routes.newWallet, { no_back: true })
	// 			} else {
	// 				setTimeout(() => {
	// 					navigate(routes.appTab)
	// 				}, 700)
	// 			}
	// 		}
	// 	}
	// }

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
				<AppText typo="dot" color="text3">Version 1.40</AppText>
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
