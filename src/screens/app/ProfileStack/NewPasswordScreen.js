import React from 'react'
import Screen from '../../../components/Screen'
import NewPasswordForm from '../../../components/Forms/NewPasswordForm'
import { globalStyles } from '../../../config/styles'

export default function NewPasswordScreen() {
	return (
		<Screen style={{ ...globalStyles.gapScreen }} edges={['bottom']}>
			<NewPasswordForm />
		</Screen>
	)
}
