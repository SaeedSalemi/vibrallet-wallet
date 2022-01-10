import Colors from './../assets/Colors'
import Images from './../assets/Images'

const defaultStyles = () => {
	return {
		Colors,
		Images,
		screen: {
			flex: 1,
			backgroundColor: Colors.bckColor,
		},
		gapScreen: {
			flex: 1,
			backgroundColor: Colors.bckColor,
			paddingHorizontal: 16,
		},
		textInput: {
			color: '#fff',
			fontSize: 14,
			fontFamily: 'Roboto',
		},
		text: {
			fontFamily: 'Roboto',
			color: '#fff',
		},
		button: {
			borderRadius: 10,
			backgroundColor: Colors.primaryColor,
			justifyContent: 'center',
			alignItems: 'center',
			padding: 15,
			width: '100%',
			marginVertical: 10,
		},
		typo: {
			dot: 10,
			tiny: 12,
			xs: 14,
			sm: 16,
			md: 18,
			lg: 20,
			xl: 24,
			xxl: 36,
		},
		flex: {
			row: {
				flexDirection: 'row',
			},
			center: {
				alignItems: 'center',
				justifyContent: 'center',
			},
			between: {
				justifyContent: 'space-between',
			},
		},
	}
}

export const setTypo = typo => {
	const styles = defaultStyles()
	const fontSize = styles.typo[typo] || styles.typo.xs
	return {
		fontSize,
	}
}

export const setColor = colorKey => {
	const styles = defaultStyles()
	const color = styles.Colors[colorKey] || styles.Colors.textColor
	return {
		color,
	}
}

export default defaultStyles

export const globalStyles = defaultStyles()
