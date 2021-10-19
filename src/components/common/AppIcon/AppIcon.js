import React from 'react'
import { Image } from 'react-native'
import Icons from '../../../assets/Icons'
import SvgUri from 'react-native-svg-uri'

export default function AppIcon({ name, svg, ...restProps }) {
	return svg ? (
		<SvgUri source={Icons[name]} {...restProps} />
	) : (
		<Image source={Icons[name]} {...restProps} />
	)
}
