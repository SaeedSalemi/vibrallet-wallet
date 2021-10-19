import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import AppInput from '../AppInput/AppInput'

export default function ControllerAppInput({
	name,
	defaultValue,
	control,
	errors,
	message,
	...restProps
}) {
	return (
		<Controller
			control={control}
			name={name}
			defaultValue={defaultValue}
			render={({ field: { onChange, onBlur, value } }) => (
				<AppInput
					onChange={onChange}
					onBlur={onBlur}
					onChangeText={onChange}
					value={value}
					message={errors?.[name]?.message ?? message}
					{...restProps}
				/>
			)}
		/>
	)
}
