import React from 'react'
import { View } from 'react-native'
import { Images } from '../../../assets'
import Regions from '../../../components/Profile/Regions'
import { globalStyles } from '../../../config/styles'

const data = [
	{
		image: Images.england,
		title: 'English',
	},
	{
		image: Images.arabic,
		title: 'Arabic',
	},
	{
		image: Images.turkish,
		title: 'Turkish',
	},
	{
		image: Images.germany,
		title: 'Germany',
	},
	{
		image: Images.russia,
		title: 'Russia',
	},
]
export default function LanguageScreen() {
	return (
		<View style={{ ...globalStyles.screen }}>
			<Regions data={data} />
		</View>
	)
}
