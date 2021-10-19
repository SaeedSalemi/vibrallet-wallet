import React from 'react'

import { createIconSetFromIcoMoon } from 'react-native-vector-icons'
import icoMoonConfig from './selection.json'
const Icon = createIconSetFromIcoMoon(
	icoMoonConfig,
	'icomoon',
	'icomoon.ttf'
)

export default function AppIcomoon(props) {
	return <Icon {...props} />
}
