import React, { useMemo, useState, useEffect, useContext, createRef, useLayoutEffect } from 'react'
import { View, Pressable } from 'react-native'
import AppButton from '../common/AppButton'
import AppInput from '../common/AppInput/AppInput'
import { globalStyles } from '../../config/styles'
import { showMessage } from 'react-native-flash-message'
import AsyncStorage from '@react-native-async-storage/async-storage'
import HttpService from './../../services/HttpService';
import AppIcon from '../common/AppIcon'
import AppText from '../common/AppText'
import { routes } from '../../config/routes'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { useNavigation } from '@react-navigation/core'
import { Context } from '../../context/Provider'
import { register_user } from '../../config/async-storage.json'


export default function EditProfileForm({ navigation, onChange }) {

	const [submitting, setSubmitting] = useState(false)

	const { setUserData } = useContext(Context)
	const { navigate } = useNavigation()
	const [countries, setCountries] = useState()
	const [country, setCountry] = useState({ title: '' })
	const [phone, setPhone] = useState()
	const [username, setUsername] = useState()
	const [email, setEmail] = useState()

	const usernameRef = createRef()
	const emailRef = createRef()
	const phoneRef = createRef()
	const countryRef = createRef()

	useLayoutEffect(() => {
		new HttpService("", {
			"uniqueId": "123",
			"action": "getCountries"
		}).Post(response => {

			if (response) {
				setCountries(response)
			}

		})
	}, [])

	useEffect(() => {

		AsyncStorage.getItem(register_user).then(userData => {
			console.log('dani debugger', userData)
			if (userData !== null) {
				let parsedUserData = JSON.parse(userData)
				if (parsedUserData.username)
					setUsername(parsedUserData.username)
				if (parsedUserData.email)
					setEmail(parsedUserData.email)
				if (parsedUserData.country) {
					setCountry({ title: parsedUserData.country })
				}
				if (parsedUserData.phone)
					setPhone(parsedUserData.phone)
			}
		}).catch(error => {
			console.log('app storage', error)
		})
	}, [])


	const items = useMemo(() => {
		return [
			// {
			// 	label: 'Username',
			// 	placeholder: 'Enter your username',
			// 	icon: 'user',
			// 	// message: 'It can not be changed while it’s chosen',
			// 	alertIcon: 'info-circle',
			// 	alertIconColor: globalStyles.Colors.failure,
			// },
			// {
			// 	label: 'Email Address',
			// 	placeholder: 'Enter your email address',
			// 	icon: 'envelope',
			// },
			// {
			// 	label: 'Phone Number',
			// 	placeholder: 'Enter your phone number',
			// 	icon: 'mobile',
			// 	keyboardType: 'numeric',
			// },
			// {
			// 	label: 'Region',
			// 	placeholder: 'Choose your region',
			// 	icon: 'map-marker-alt',
			// 	endIcon: 'chevron-circle-down',
			// },
		]
	}, [])

	const handleSubmitProfile = () => {
		setSubmitting(true)
		const registerInformation = {
			email: email || '',
			username: username || '',
			country: country ? country.title : '',
			phone: phone || ''
		}
		setUserData(registerInformation)
		const data = JSON.stringify(registerInformation)
		AsyncStorage.setItem(register_user, data).then(() => {
			showMessage({
				message: `Your Profile has been successfuly updated!`,
				description: null,
				type: 'success',
				icon: null,
				duration: 2500,
				style: { backgroundColor: "#6BC0B1" },
				position: 'top'
			})
			onChange()
			setSubmitting(false)
		})
	}

	return (
		<View>
			<AppInput
				placeholder={"Enter your username"}
				label={"Username"}
				icon={"user"}
				onChangeText={text => setUsername(text)}
				value={username}
				ref={usernameRef}
				onSubmitEditing={() => emailRef.current.focus()}
			/>

			<AppInput
				placeholder={"Enter your email address"}
				label={"Email Address"}
				icon={"envelope"}
				onChangeText={text => setEmail(text)}
				value={email}
				ref={emailRef}
				onSubmitEditing={() => phoneRef.current.focus()}
			/>

			<AppInput
				placeholder={"Enter your phone number"}
				label={"Phone Number"}
				icon={"mobile"}
				keyboardType={'numeric'}
				onChangeText={text => setPhone(text)}
				value={phone}
				ref={phoneRef}
			/>

			<View>
				<AppText typo="tiny" color="text2" style={{ marginVertical: 4, marginLeft: 2 }}>
					Region
				</AppText>

				{/* {id: country.phone, title: country.name } */}
				<Pressable
					onPress={() => {
						navigate(routes.itemPicker, {
							items: countries.map(country => {
								return { id: country.phone, title: country.name }
							}),
							onSelect: (item) => {
								setCountry(item)
							}
						})
					}}

					style={{
						backgroundColor: globalStyles.Colors.inputColor,
						borderRadius: 10,
						height: 55,
						alignItems: 'center',
						justifyContent: 'space-between',
						alignSelf: 'stretch',
						flexDirection: 'row',
						paddingHorizontal: 16,
					}}
				>
					<View style={{ flexDirection: 'row' }}>
						<FontAwesome5Icon style={{ marginLeft: 4 }} size={15} color={globalStyles.Colors.text2} name="map-marker-alt" />
						<AppText color={country && country.title ? 'text2' : 'text3'} style={{ marginHorizontal: 22 }} typo="tiny">
							{country && country.title ? country.title : 'Choose your region'}
						</AppText>
					</View>
					<AppIcon name="arrowRightCircle" />
				</Pressable>
			</View>
			<View style={{ marginVertical: 8 }}>
				<AppButton
					loading={submitting}
					title="Save"
					// textStyle={{ fontWeight: 'bold' }}
					typo="xs"
					onPress={handleSubmitProfile}
				/>
			</View>
		</View>
	)
}
