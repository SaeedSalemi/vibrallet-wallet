import React from 'react'
import { View } from 'react-native'
import AppIcon from '../../../components/common/AppIcon'
import AppInput from '../../../components/common/AppInput/AppInput'
import AppText from '../../../components/common/AppText'
import Screen from '../../../components/Screen'
import { globalStyles } from '../../../config/styles'

export default function SearchPairsScreen() {
	const history = ['BTC/USDT', 'ETH/USDT', 'CRV/USDT']

	return (
		<Screen>
			<View style={{ flex: 1 }}>
				<AppInput
					icon="search"
					containerStyle={{ paddingVertical: 0 }}
					placeholder="Search All Pairs..."
				/>
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
					<AppIcon name="delete" />
				</View>
				<View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
					{[...history, ...history].map((item, i) => (
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
