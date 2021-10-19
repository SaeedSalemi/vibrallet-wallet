import React from 'react'
import { View } from 'react-native'
import ProfileMenu from '../../../components/Profile/ProfileMenu'
import { routes } from '../../../config/routes'
import { globalStyles } from '../../../config/styles'

const items = [
	{
		title: 'Privacy Policy',
	},
	{
		title: 'Terms of Service',
	},
	{
		title: 'Version',
		children: { title: 'Check for update 2.11', color: 'text2' },
	},
]

export default function AboutUs() {
	return (
		<View style={globalStyles.screen}>
			<ProfileMenu data={items} />
		</View>
	)
}
