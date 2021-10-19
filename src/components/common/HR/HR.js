import React from 'react'
import { StyleSheet, View } from 'react-native'
import { globalStyles } from '../../../config/styles'

export default function HR({ style, ...restProps }) {
	return <View style={[styles.style, style]} {...restProps} />
}

const styles = StyleSheet.create({
	style: {
		height: 1,
		backgroundColor: globalStyles.Colors.inputColor,
	},
})
