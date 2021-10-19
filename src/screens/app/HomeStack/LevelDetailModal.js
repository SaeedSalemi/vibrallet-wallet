import React from 'react'
import { Image, View } from 'react-native'
import { G } from 'react-native-svg'
import { Images } from '../../../assets'
import AlertModal from '../../../components/common/AlertModal/AlertModal'
import AppButton from '../../../components/common/AppButton'
import AppText from '../../../components/common/AppText'
import { globalStyles } from '../../../config/styles'

export default function LevelDetailsModal({ visible, setVisible }) {
	return (
		<AlertModal visible={visible} setVisible={setVisible}>
			<View style={{ marginVertical: 24, ...globalStyles.flex.center }}>
				<Image source={Images.level1} />
				<AppText style={{ marginVertical: 12 }} bold typo="md">
					Level 1
				</AppText>
				<AppText
					style={{
						textAlign: 'center',
						paddingHorizontal: 32,
						color: globalStyles.Colors.text2,
					}}
				>
					If you succeed to complete level 1 and have more than $1k transactions
					you’ll got 5 PRX as reward.
				</AppText>
			</View>
		</AlertModal>
	)
}
