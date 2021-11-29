import React, { useMemo, useState, useEffect, useContext } from 'react'
import { View, Pressable } from 'react-native'
import AppButton from '../common/AppButton'
import AppInput from '../common/AppInput/AppInput'
import { globalStyles } from '../../config/styles'
import * as yup from 'yup';
import { showMessage } from 'react-native-flash-message'
import AsyncStorage from '@react-native-async-storage/async-storage'
import HttpService from './../../services/HttpService';
import AppIcon from '../common/AppIcon'
import AppText from '../common/AppText'
import { routes } from '../../config/routes'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { useNavigation } from '@react-navigation/core'
import { Context } from '../../context/Provider'

export default function EditProfileForm({ navigation }) {

	const { setUserData } = useContext(Context)

	const { navigate } = useNavigation()

	const [retData, setRetData] = useState({})

	const [countries, setCountries] = useState()

	const [country, setCountry] = useState()
	const [phone, setPhone] = useState()
	const [username, setUsername] = useState()
	const [email, setEmail] = useState()

	useEffect(() => {

		AsyncStorage.getItem("user").then(userData => {
			if (userData) {
				let userinfo = JSON.parse(userData)
				setRetData(userinfo)
			}
		})


		// get countries list
		new HttpService("", {
			"uniqueId": "123",
			"action": "getCountries"
		}).Post(response => {

			if (response) {
				setCountries(response)
			}

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


		// 1- validate form


		const registerInformation = {
			email,
			username,
			country: country.title,
			phone
		}

		setUserData(registerInformation)

		const data = JSON.stringify(registerInformation)
		AsyncStorage.setItem("regUser", data).then(() => {
			alert('registered successfully!')
		})

		showMessage({
			message: `Your Profile has been successfuly updated!`,
			description: null,
			type: 'success',
			icon: null,
			duration: 1000,
			style: { backgroundColor: "#6BC0B1" },
			position: 'top'
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
			/>

			<AppInput
				placeholder={"Enter your email address"}
				label={"Email Address"}
				icon={"envelope"}
				onChangeText={text => setEmail(text)}
				value={email}
			/>

			<AppInput
				placeholder={"Enter your phone number"}
				label={"Phone Number"}
				icon={"mobile"}
				keyboardType={'numeric'}
				onChangeText={text => setPhone(text)}
				value={phone}
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
								console.log('selected country', item)
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
						<AppText color="text3" style={{ marginHorizontal: 22 }} typo="tiny">Choose your region</AppText>
					</View>
					<AppIcon name="arrowRightCircle" />
				</Pressable>
			</View>
			<View style={{ marginVertical: 8 }}>
				<AppButton
					title="Save"
					textStyle={{ fontWeight: 'bold' }}
					typo="sm"
					onPress={handleSubmitProfile}
				/>
			</View>
		</View>
	)
}
