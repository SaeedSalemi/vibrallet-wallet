import AsyncStorage from '@react-native-async-storage/async-storage'

export const getUser = async () => {
	try {
		const user = await AsyncStorage.getItem('user')
		if (user) {
			return JSON.parse(user)
		} else {
			return null
		}
	} catch (e) {
		console.log(e, 'e in getUser')
	}
}

export const setUser = async user => {
	try {
		await AsyncStorage.setItem('user', JSON.stringify(user))
	} catch (e) {
		console.log(e, 'e in setUser')
	}
}
