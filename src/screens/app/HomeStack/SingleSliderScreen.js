import React from 'react'
import { ScrollView, StyleSheet, View, Image } from 'react-native'
import AppIcon from '../../../components/common/AppIcon'
import AppText from '../../../components/common/AppText'
import HR from '../../../components/common/HR/HR'
import Screen from '../../../components/Screen'
import { globalStyles } from '../../../config/styles'
// const defaultStyles = globalStyles()

export default function SingleSliderScreen() {
	return (
		<Screen gap>
			<ScrollView>
				<AppText typo="sm" bold>
					150,000 PAX TO GIVE AWAY
				</AppText>
				<View style={styles.logo}>
					<View style={styles.logoWrapper}>
						{/* <AppIcon name="blankLogo" /> */}
						<Image
							fadeDuration={300}
							style={{
								marginTop: 4,
								alignSelf: 'center',
								height: 30,
							}}
							source={globalStyles.Images.vib_starterLogo}
							resizeMethod="auto"
							resizeMode="contain"
						/>
					</View>
					<View style={styles.info}>
						<AppText typo="tiny" style={styles.title}>
							Vibranium
						</AppText>
						<AppText typo="dot" style={styles.date}>
							2021.2.12 15:14
						</AppText>
					</View>
				</View>
				<HR style={styles.hr} />
				<View>
					<AppText style={styles.text}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
						viverra ultrices turpis egestas convallis quam enim, sed. Fermentum
						at urna in gravida felis nulla mauris etiam. Sit in eu in dui
						lacinia urna. Ultrices consectetur quis lorem risus vitae.
					</AppText>
					<AppText style={styles.text}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
						viverra ultrices turpis egestas convallis quam enim, sed. Fermentum
						at urna in gravida felis nulla mauris etiam. Sit in eu in dui
						lacinia urna. Ultrices consectetur quis lorem risus vitae.
					</AppText>
					<AppText style={styles.text}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
						viverra ultrices turpis egestas convallis quam enim, sed. Fermentum
						at urna in gravida felis nulla mauris etiam. Sit in eu in dui
						lacinia urna. Ultrices consectetur quis lorem risus vitae.
					</AppText>
					<AppText style={styles.text}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
						viverra ultrices turpis egestas convallis quam enim, sed. Fermentum
						at urna in gravida felis nulla mauris etiam. Sit in eu in dui
						lacinia urna. Ultrices consectetur quis lorem risus vitae.
					</AppText>
					<AppText style={styles.text}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
						viverra ultrices turpis egestas convallis quam enim, sed. Fermentum
						at urna in gravida felis nulla mauris etiam. Sit in eu in dui
						lacinia urna. Ultrices consectetur quis lorem risus vitae.
					</AppText>
					<AppText style={styles.text}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
						viverra ultrices turpis egestas convallis quam enim, sed. Fermentum
						at urna in gravida felis nulla mauris etiam. Sit in eu in dui
						lacinia urna. Ultrices consectetur quis lorem risus vitae.
					</AppText>
				</View>
			</ScrollView>
		</Screen>
	)
}

const styles = StyleSheet.create({
	logo: {
		...globalStyles.flex.row,
		alignSelf: 'stretch',
		marginTop: 24,
	},
	logoWrapper: {
		width: 40,
		height: 40,
		borderRadius: 20,
		...globalStyles.flex.center,
		borderStyle: 'solid',
		borderWidth: 1,
		borderColor: globalStyles.Colors.inputColor,
	},
	info: {
		flex: 1,
		paddingHorizontal: 12,
		justifyContent: 'center',
	},
	title: {
		color: globalStyles.Colors.primaryColor,
	},
	date: {
		color: globalStyles.Colors.darkTextColor,
	},
	hr: {
		margin: 24,
	},
	text: {
		marginBottom: 8,
	},
})
