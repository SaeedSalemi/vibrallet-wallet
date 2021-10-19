import React from 'react'
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import globalStyles from '../config/styles'
const defaultStyles = globalStyles()

function Screen({ children, style, gap = true, edges = ['top'] }) {
	return (
		<SafeAreaView
			edges={edges}
			style={[styles.screen, gap ? styles.gap : {}, style]}
		>
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				style={{ flex: 1 }}
			>
				{children}
			</KeyboardAvoidingView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: defaultStyles.Colors.bckColor,
	},
	gap: {
		paddingHorizontal: 10,
	},
})

export default Screen
