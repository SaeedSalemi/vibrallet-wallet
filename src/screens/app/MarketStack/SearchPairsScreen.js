import React, { useContext, useState, useEffect } from 'react'
import { View, TouchableOpacity } from 'react-native'
import AppInput from '../../../components/common/AppInput/AppInput'
import AppText from '../../../components/common/AppText'
import Screen from '../../../components/Screen'
import { globalStyles } from '../../../config/styles'
import { Context } from '../../../context/Provider'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import AsyncStorage from '@react-native-async-storage/async-storage'
export default function SearchPairsScreen({ navigation }) {

	const [state, setState] = useState()
	const [searchHistory, setSearchHistory] = useState([])
	const { setMarketSearchFilter } = useContext(Context)

	const searchHistoryStorageKey = 'searchHistory'

	// const history = ['BTC/USDT', 'ETH/USDT', 'CRV/USDT']

	useEffect(() => {
		AsyncStorage.getItem(searchHistoryStorageKey).then(res => {
			if (res) {
				setSearchHistory(JSON.parse(res))
			}
		}).catch(err => { })
	}, [])

	const submitHandler = () => {
		AsyncStorage.setItem(searchHistoryStorageKey, JSON.stringify([...searchHistory, state]))
		setSearchHistory([...searchHistory, state])
		setMarketSearchFilter(state)
		navigation.pop()
	}

	return (
		<Screen>
			<View style={{ flex: 1 }}>
				<AppInput
					icon="search"
					containerStyle={{ paddingVertical: 0 }}
					placeholder="Search All Pairs..."
					onChangeText={(text) => setState(text)}
					onSubmitEditing={submitHandler}
				/>

				{searchHistory.length > 0 &&
					<View
						style={{
							marginVertical: 16,
							alignItems: 'center',
							justifyContent: 'space-between',
							flexDirection: 'row',
						}}
					>
						<AppText color="text2" typo="tiny">
							History
						</AppText>

						<TouchableOpacity onPress={() => {
							AsyncStorage.removeItem(searchHistoryStorageKey)
							setMarketSearchFilter('')
							navigation.pop()
						}}>
							<FontAwesome5 name="trash" color={globalStyles.Colors.text3} size={15} />
						</TouchableOpacity>
					</View>}
				<View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
					{searchHistory.map((item, i) => (
						<View
							style={{
								width: '33%',
								paddingHorizontal: 4,
								marginBottom: 8,
							}}
							key={i}
						>
							<View
								style={{
									height: 40,
									backgroundColor: globalStyles.Colors.text3,
									...globalStyles.flex.center,
									borderRadius: 10,
								}}
							>
								<AppText>{item}</AppText>
							</View>
						</View>
					))}
				</View>
			</View>
		</Screen>
	)
}
