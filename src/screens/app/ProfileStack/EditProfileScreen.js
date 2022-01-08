import React, { useState, useEffect, useContext } from 'react'
import { View, Image } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { Images } from '../../../assets'
import AppText from '../../../components/common/AppText'
import EditProfileForm from '../../../components/Profile/EditPofileForm'
import { globalStyles } from '../../../config/styles'
import Entypo from 'react-native-vector-icons/Entypo'
// import DocumentPicker from 'react-native-document-picker'
import * as DocumentPicker from 'expo-document-picker';
import RNFS from 'react-native-fs'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { showMessage } from 'react-native-flash-message'
import { Context } from '../../../context/Provider'
import * as Progress from 'react-native-progress';
import { register_user } from './../../../config/async-storage.json'


const VALID_IMAGE_TYPES = ['.png', '.jpg', '.jpeg']

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
			if (fields) {
				for (let [key, value] of Object.entries(fields)) {
					if (value !== "")
						counter++
				}
				setProgress(counter)
			} else {
				setProgress(0)
			}
		} else {
			setProgress(0)
		}

	}

	const calc = () => calculateProgressbarFields()


	const handleUploadImage = async () => {
		try {

			let res = await DocumentPicker.getDocumentAsync({})
			let uri = ''
			console.log('document picks', res)
			if (res.type === 'success') {
				// this.parseFile(file.uri);
				uri = res.uri
			} else {
				showMessage({
					message: `Warninng! Please check your file again.`,
					description: null,
					type: 'danger',
					icon: null,
					duration: 4000,
					style: { backgroundColor: "#e67e22" },
					position: 'top'
				})
				return
			}
			let isValid = false
			for (let _v of VALID_IMAGE_TYPES) {
				if (uri.includes(_v))
					isValid = true
			}
			if (!isValid) {
				showMessage({
					message: `File type is not valid! Please choose an image.`,
					description: null,
					type: 'danger',
					icon: null,
					duration: 4000,
					style: { backgroundColor: "#e74c3c" },
					position: 'top'
				})
				return
			}

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
			showMessage({
				message: `Warninng! something wrong has been happened! Please try again.`,
				description: null,
				type: 'danger',
				icon: null,
				duration: 4000,
				style: { backgroundColor: "#e67e22" },
				position: 'top'
			})
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
