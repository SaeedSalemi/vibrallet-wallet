import React from 'react'
import ComingSoon from '../../../components/Home/ComingSoon'
import Screen from '../../../components/Screen'

export default function ExchangeScreen() {
	return (
		<Screen edges={['bottom']}>
			<ComingSoon
				details="You can exchanges all your assets in Vibranium Wallet at:"
				time="78:12:42:05"
				imageName="exchange"
			/>
		</Screen>
	)
}
