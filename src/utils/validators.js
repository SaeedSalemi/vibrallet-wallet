import * as yup from 'yup'

const stringValidator = (required = false) => {
	if (required) {
		return yup.string().required('Required')
	} else {
		return yup.string()
	}
}

const retypeValidator = ref =>
	yup
		.string()
		.oneOf([yup.ref(ref), null], 'Passwords must match')
		.required('Required')

export const validators = {
	string: stringValidator,
	retype: retypeValidator,
}
