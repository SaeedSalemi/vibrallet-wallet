import React from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import AppText from '../../components/common/AppText'
import globalStyles from '../../config/styles'

const defaultStyles = globalStyles()

export default function CodeInput({ count, onReachedEnd }) {
	const [value, setValue] = React.useState('')
	const [inputs, setInputs] = React.useState([])

	React.useEffect(() => {
		let array = []
		for (let i = 0; i < count; i++) {
			array.push(value.split('')[i] || '')
		}
		setInputs(array)
	}, [count, value])

	const handleChange = text => {
		if (text.length === count) {
			onReachedEnd(text)
		}
		if (text.length <= count) {
			setValue(text)
		}
	}

	return (
		<View style={styles.container}>
			{inputs.map((input, i) => (
				<CodeInputItem value={input} key={i} />
			))}
			<TextInput
				style={styles.input}
				value={value}
				returnKeyType="done"
				keyboardType="number-pad"
				onChangeText={handleChange}
			/>
		</View>
	)
}

function CodeInputItem({ value }) {
	return (
		<View style={styles.itemWrapper}>
			<AppText typo="xl" style={styles.value}>
				{value}
			</AppText>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignSelf: 'stretch',
		alignItems: 'center',
		justifyContent: 'center',
	},
	itemWrapper: {
		width: 50,
		height: 50,
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: defaultStyles.Colors.inputColor,
		marginHorizontal: 8,
	},
	input: {
		width: '100%',
		position: 'absolute',
		left: 0,
		right: 0,
		height: 50,
		zIndex: 1,
		opacity: 0,
	},
	value: {
		color: defaultStyles.Colors.darkTextColor,
	},
})
