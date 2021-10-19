import React from 'react'
import { View } from 'react-native'
import ProfileMenu from '../../../components/Profile/ProfileMenu'
import { routes } from '../../../config/routes'
import { globalStyles } from '../../../config/styles'

const items = [
	{
		title: 'Knowledge Base',
		detail: 'Common questions and support docs',
		// icon: 'knowledgeBase',
	},
	{
		title: 'Help Center',
		detail: 'Get in touch with us',
		// icon: 'helpCenter',
	},
	{
		title: 'Rate US',
		detail: 'Rate Binrex so we can solve our issues quickly',
		// icon: 'rateUs',
	},
	{
		title: 'Share Us',
		detail: 'Share Binrex with your friends',
		// icon: 'shareUs',
	},
	{
		title: 'About',
		detail: 'Find more details about our team',
		// icon: 'currency',
		route: routes.aboutUs,
	},
]

export default function SupportScreen() {
	return (
		<View style={{ ...globalStyles.screen }}>
			<ProfileMenu data={items} />
		</View>
	)
}
