import React, { useMemo, useState } from 'react'
import { View } from 'react-native'
import AppButton from '../common/AppButton'
import AppInput from '../common/AppInput/AppInput'
import { globalStyles } from '../../config/styles'
import * as yup from 'yup';
import { showMessage } from 'react-native-flash-message'

export default function EditProfileForm() {


	let schema = yup.object().shape({
		username: yup.string().required(),
		email: yup.string().email(),
		phonenumber: yup.string(),
	});


	const items = useMemo(() => {
		return [
			{
				label: 'Username',
				placeholder: 'Enter your username',
				icon: 'user',
				// message: 'It can not be changed while it’s chosen',
				alertIcon: 'info-circle',
				alertIconColor: globalStyles.Colors.failure,
			},
			{
				label: 'Email Address',
				placeholder: 'Enter your email address',
				icon: 'envelope',
			},
			{
				label: 'Phone Number',
				placeholder: 'Enter your phone number',
				icon: 'mobile',
				keyboardType: 'numeric',
			},
			{
				label: 'Region',
				placeholder: 'Choose your region',
				icon: 'map-marker-alt',
				endIcon: 'chevron-circle-down',
			},
		]
	}, [])


	const handleSubmitProfile = () => {
		schema.isValid({}).then(valid => {
			// submit the form
		}).catch(err => {
			showMessage({
				message: `Please check`,
				description: null,
				type: 'success',
				icon: null,
				duration: 1000,
				style: { backgroundColor: "#6BC0B1" },
				position: 'top'
			})
		})
	}

	return (
		<View>
			{items.map((item, i) => (
				<AppInput
					placeholder={item.placeholder}
					label={item.label}
					icon={item.icon}
					alertIconColor={item.alertIconColor}
					alertIcon={item.alertIcon}
					keyboardType={item.keyboardType}
					message={item.message}
					key={i}
					endIcon={item.endIcon}
				/>
			))}
			<View style={{ marginVertical: 8 }}>
				<AppButton
					title="Save"
					textStyle={{ fontWeight: 'bold' }}
					typo="sm"
					z
				/>
			</View>
		</View>
	)
}
