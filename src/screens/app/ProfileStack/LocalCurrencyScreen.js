import React from 'react'
import { Image, View } from 'react-native'
import { Images } from '../../../assets'
import AppInput from '../../../components/common/AppInput/AppInput'
import Regions from '../../../components/Profile/Regions'
import { globalStyles } from '../../../config/styles'

const data = [
	{
		title: 'USD',
		image: Images.unitedState,
		detail: 'United States Dollar',
	},
	{
		title: 'EUR',
		image: Images.euro,
		detail: 'Euro',
	},
	{
		title: 'AUD',
		image: Images.australian,
		detail: 'Australian Dollar',
	},
	{
		title: 'CAD',
		image: Images.canada,
		detail: 'Canadian Dollar',
	},
	{
		title: 'GBP',
		image: Images.england,
		detail: 'British Pound',
	},
	{
		title: 'CNY',
		image: Images.chinese,
		detail: 'Chinese Yuan',
	},
	{
		title: 'TRY',
		image: Images.turkish,
		detail: 'Turkish Lir',
	},
]
export default function LocalCurrencyScreen() {
	return (
		<View style={{ ...globalStyles.gapScreen }}>
			<View>
				<AppInput icon="search" placeholder="Search Currencies..." />
			</View>
			<Regions data={data} />
		</View>
	)
}
