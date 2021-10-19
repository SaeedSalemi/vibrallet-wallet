import React from 'react'
import NoPriceAlert from '../../../components/PriceAlert/NoPriceAlert'
import PriceAlerts from '../../../components/PriceAlert/PriceAlerts'
import Screen from '../../../components/Screen'

export default function PriceAlertScreen({ route }) {
	const show = route.params?.show

	return (
		<Screen edges={['bottom']}>
			{show ? <PriceAlerts /> : <NoPriceAlert />}
		</Screen>
	)
}
