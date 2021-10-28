import React from 'react'
import { FlatList, Pressable, View } from 'react-native'
import Screen from '../../Screen'
import AppIcon from '../AppIcon'
import AppText from '../AppText'

const AppItemPicker = ({ navigation, route }) => {
  const { items = [], onSelect = () => { } } = route.params
  const handlePressItem = (item) => {
    try {
      onSelect(item)
      navigation.pop()
    } catch (e) {
      console.error(e)
    }
  }
  const handleRenderItem = ({ item, index }) => {
    return (
      <Pressable
        onPress={() => handlePressItem(item)}
        style={{ height: 60, justifyContent: "center", alignItems: "center", borderBottomColor: "gray", borderBottomWidth: 1 }}
      >
        <View style={{ flexDirection: "row" }}>
          <AppText style={{ flex: 1, textAlign: "center" }}>
            {item.title}
          </AppText>

          <AppIcon name="arrowRightCircle" />

        </View>
      </Pressable>
    )
  }
  return (
    <Screen>
      <FlatList
        data={items}
        keyExtractor={(_, index) => index.toString()}
        renderItem={handleRenderItem}
      />
    </Screen>
  )

}

export default AppItemPicker
