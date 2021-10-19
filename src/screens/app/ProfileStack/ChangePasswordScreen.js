import React from 'react'
import { useSelector } from 'react-redux'
import ChangePasswordForm from '../../../components/Forms/ChangePasswordForm'
import Screen from '../../../components/Screen'
import { globalStyles } from '../../../config/styles'

export default function ChangePasswordScreen() {
	const password = useSelector(state => state.appSettings.password)

	return (
		<Screen style={{ ...globalStyles.gapScreen }} edges={['bottom']}>
			<ChangePasswordForm password={password} />
		</Screen>
	)
}
