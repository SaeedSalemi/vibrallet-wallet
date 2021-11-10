import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { Images } from '../../assets'
import { globalStyles } from '../../config/styles'
import AppText from '../common/AppText'
import Timer from './Timer'

export default function ComingSoon({ details, time, imageName }) {
	return (
		<View style={styles.container}>
			<View
				style={{
					flex: 3,
					alignItems: 'center',
					justifyContent: 'space-evenly',
				}}
			>
				<AppText typo="lg" bold style={styles.title}>
					COMING SOON!
				</AppText>
				<Image style={styles.image} source={Images[imageName]} />
			</View>
			<View
				style={{ flex: 1, paddingHorizontal: 40, ...globalStyles.flex.center }}
			>
				<AppText typo="tiny" style={{ textAlign: 'center', color: '#95949A' }}>{details}</AppText>
			</View>
			<View style={{ flex: 2 }}>
				<Timer time={time} />
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	title: {
		alignSelf: 'center',
	},
	image: {
		alignSelf: 'center',
	},
})
