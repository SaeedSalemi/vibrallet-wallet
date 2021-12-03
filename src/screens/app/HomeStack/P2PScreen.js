import React from 'react'
import ComingSoon from '../../../components/Home/ComingSoon'
import Screen from '../../../components/Screen'

export default function P2PScreen() {
	// const [time, resetTimer] = useTimer(30)
	return (
		<Screen edges={['bottom']}>
			<ComingSoon
				details="You can trade privately at any time with anybody in Vibranium Wallet at:"
				time="65:12:42:05"
				imageName="p2p"
			/>
		</Screen>
	)
}
