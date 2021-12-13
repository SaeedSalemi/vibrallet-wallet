import React, { useState, useEffect, useContext } from 'react'
import { View, Image } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { Images } from '../../../assets'
import AppText from '../../../components/common/AppText'
import EditProfileForm from '../../../components/Profile/EditPofileForm'
import { globalStyles } from '../../../config/styles'
import Entypo from 'react-native-vector-icons/Entypo'
import DocumentPicker from 'react-native-document-picker'
import RNFS from 'react-native-fs'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { showMessage } from 'react-native-flash-message'
import { Context } from '../../../context/Provider'
import * as Progress from 'react-native-progress';
import { register_user } from './../../../config/async-storage.json'

export default function EditProfileScreen() {

	const { user, setUserProfile } = useContext(Context)
	const [profileImg, setProfileImg] = useState()
	const [progress, setProgress] = useState(0)


	useEffect(() => {
		calculateProgressbarFields()
	}, [])

	useEffect(() => {
		AsyncStorage.getItem('userImage').then(res => {
			if (res) {
				setProfileImg(res)
			}
		})
	}, [profileImg])


	const calculateProgressbarFields = async () => {
		let counter = 0;
		const regiter_item = await AsyncStorage.getItem(register_user)
		if (register_user) {
			const fields = JSON.parse(regiter_item)
			for (let [key, value] of Object.entries(fields)) {
				if (value !== "")
					counter++
			}
			setProgress(counter)
		} else {
			setProgress(0)
		}

	}

	const calc = () => calculateProgressbarFields()


	const handleUploadImage = async () => {
		try {
			const res = await DocumentPicker.pickSingle({
				type: [DocumentPicker.types.images],
				allowMultiSelection: false,

			})
			// setFileUri(res)
			const uri = res.uri
			RNFS.readFile(uri, 'base64')
				.then(res => {
					AsyncStorage.setItem('userImage', res)
					setUserProfile(`data:image/gif;base64,${profileImg}`)
					showMessage({
						message: `Your profile image has been created successfully.`,
						description: null,
						type: 'success',
						icon: null,
						duration: 4000,
						style: { backgroundColor: "#6BC0B1" },
						position: 'top'
					})
				});


		} catch (err) {
			if (DocumentPicker.isCancel(err)) {
				console.log('error', err)
			} else {
				throw err
			}
		}
	}
	return (
		<ScrollView style={globalStyles.gapScreen}>
			<View style={{ ...globalStyles.flex.center, marginVertical: 8 }}>
				{profileImg ? <Image source={{ uri: `data:image/gif;base64,${profileImg}` }} style={{ width: 100, height: 100, borderRadius: 50 }} /> : <Entypo name="user" size={65} color="#9299C2" />}
				<TouchableOpacity onPress={handleUploadImage} style={{ padding: 20 }}>
					<Entypo name="camera" size={15} color="#ccc" />
				</TouchableOpacity>
			</View>
			<View style={{ ...globalStyles.flex.center, paddingBottom: 18 }}>
				<AppText typo="xs" color="text1">
					{user.username ? `Dear ${user.username}` : 'Dear User'}
				</AppText>
				{/* <AppText typo="tiny" color="text2" style={{ marginVertical: 2 }}>
					Complete identity fields blow to earn 100
				</AppText> */}
				<View style={{ ...globalStyles.flex.center }}>
					<Progress.Bar
						animated
						color={progress === 4 ? globalStyles.Colors.success : globalStyles.Colors.failure}
						progress={(progress * 25) / 100}
						width={200}
						style={{ marginVertical: 10 }}
					/>
					{progress === 4 ?
						<AppText typo="dot" color="success">
							Your profile is completed!
						</AppText> : <AppText typo="dot" color="text3">
							{4 - progress} fields to achieve 100
						</AppText>}

				</View>
			</View>
			<View>
				<EditProfileForm onChange={calc} />
			</View>
		</ScrollView>
	)
}
