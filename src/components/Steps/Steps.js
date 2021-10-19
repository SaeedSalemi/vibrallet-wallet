import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { globalStyles } from '../../config/styles'
import AppIcon from '../common/AppIcon'
import AppText from '../common/AppText'

export default function Steps({ data }) {
	return (
		<View style={styles.steps}>
			<View style={styles.progress}>
				<View style={[styles.progressWrapper, { height: data.length * 60 }]}>
					{data.map((item, i) => (
						<View
							key={i}
							style={[
								styles.progressItem,
								i > 0 ? styles.progressItem2 : {},
								{
									backgroundColor:
										i === 0
											? globalStyles.Colors.primaryColor
											: i === 1
											? globalStyles.Colors.step2
											: undefined,
								},
							]}
						>
							<AppText
								typo="dot"
								bold
								color={i === 0 ? 'bckColor' : i === 1 ? 'whiteColor' : 'text3'}
							>
								{i + 1}
							</AppText>
						</View>
					))}
				</View>
			</View>
			<View style={{ flex: 1 }}>
				{data.map((item, i) => (
					<TouchableOpacity key={item.title} onPress={item.onPress}>
						<View style={styles.icon}>
							{item.icon ? (
								<View
									style={[
										styles.iconWrapper,
										{
											backgroundColor:
												i === 0
													? globalStyles.Colors.primaryColor
													: globalStyles.Colors.inputColor,
										},
									]}
								>
									{item.icon}
								</View>
							) : null}
							<View style={{ padding: 10 }}>
								<AppText typo="tiny" bold>
									{item.title}
								</AppText>
								<AppText
									typo="dot"
									style={{
										color: globalStyles.Colors.darkTextColor,
									}}
								>
									{item.subTitle}
								</AppText>
							</View>
						</View>
					</TouchableOpacity>
				))}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	steps: {
		...globalStyles.flex.row,
		paddingHorizontal: 5,
	},
	progress: {
		marginEnd: 12,
	},
	progressWrapper: {
		width: 15,
		backgroundColor: globalStyles.Colors.inputColor,
		borderRadius: 10,
	},
	progressItem: {
		width: '100%',
		height: 61,
		...globalStyles.flex.center,
		borderTopRightRadius: 10,
		borderTopLeftRadius: 10,
	},
	progressItem2: {
		borderTopRightRadius: 0,
		borderTopLeftRadius: 0,
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
	},
	icon: {
		alignItems: 'center',
		flexDirection: 'row',
		marginVertical: 5,
	},
	iconWrapper: {
		width: 30,
		height: 30,
		borderRadius: 7,
		...globalStyles.flex.center,
	},
})
