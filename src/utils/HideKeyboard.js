import React from 'react'
import { Keyboard, TouchableWithoutFeedback } from 'react-native'

const dismissKeyboard = () => {
	Keyboard.dismiss()
}

export default function HideKeyboard({ children }) {
	return (
		<TouchableWithoutFeedback onPress={dismissKeyboard}>
			{children}
		</TouchableWithoutFeedback>
	)
}
