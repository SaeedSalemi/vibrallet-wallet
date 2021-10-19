import React from 'react'
import { StyleSheet, View } from 'react-native'
import { globalStyles } from '../../config/styles'
import AppText from '../common/AppText'

export default function Timer({ time }) {
	const renderItems = () => {
		const times = time.split(':')
		return times.map((item, i) => (
			<React.Fragment key={i}>
				<View style={styles.timeItem}>
					<AppText typo="xl" bold>
						{item}
					</AppText>
					<AppText
						typo="dot"
						color="text3"
						style={{
							position: 'absolute',
							bottom: -24,
						}}
					>
						{i === 0
							? 'DAYS'
							: i === 1
							? 'HOURS'
							: i === 2
							? 'MINUTES'
							: 'SECONDS'}
					</AppText>
				</View>
				{i + 1 !== times.length ? (
					<AppText typo="md" style={styles.twoDots}>
						:
					</AppText>
				) : null}
			</React.Fragment>
		))
	}

	return <View style={styles.container}>{renderItems()}</View>
}

const styles = StyleSheet.create({
	container: {
		alignSelf: 'stretch',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-evenly',
	},
	timeItem: {
		backgroundColor: globalStyles.Colors.inputColor,
		borderRadius: 10,
		...globalStyles.flex.center,
		width: 60,
		height: 60,
		position: 'relative',
	},
	twoDots: {
		color: globalStyles.Colors.darkTextColor,
	},
})
