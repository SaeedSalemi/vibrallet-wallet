import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import { globalStyles } from '../../../config/styles'

const AppLoader = ({ size = 80, color = globalStyles.Colors.primaryColor }) => {
  return (
    <View
      style={{
        ...globalStyles.flex.center,
        flex: 1,
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        backgroundColor: globalStyles.Colors.inputColorOpacity,
      }}
    >
      <ActivityIndicator
        size={size}
        color={color}
      />
    </View>
  )
}

export default AppLoader