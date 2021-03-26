import React, { useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native'
import Animated, { withSpring, useSharedValue, useAnimatedStyle } from 'react-native-reanimated';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export interface KeyMoment {
  id: Number,
  minute: Number,
  keyMomentType: String,
  content: String
}

export interface Props {
  header: string
  keyMoments: Array<KeyMoment>
  onPress: Function
}

const keyMomentSheet: React.FC<Props> = (props) => {
  const [actionSheetStatus, setActionSheetStatus] = useState(false)
  const offset = useSharedValue(0);
  const status = useSharedValue(false)
  
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: offset.value }],
    };
  });

  const actionSheetHandler = () => {
    setActionSheetStatus(!actionSheetStatus)
    if (status.value)
      status.value = false
    else
      status.value = true
    offset.value = withSpring(status.value ? 0 : -150);
  }


  const renderActionSheetItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => handleActionSheetSelection(item.id)} style={{ width: '100%', height: 40, flexDirection: 'row' }}>
        <View style={{ width: 70, height: '100%', alignItems: 'flex-end' }}>
          <Text style={{ fontSize: 20, fontWeight: '400' }}>{item.minute}</Text>
        </View>
        <View style={{ flex: 1, marginLeft: 40 }}>
          <Text style={{ fontSize: 20, fontWeight: '400' }}>{item.keyMomentType}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  const handleActionSheetSelection = (id: number) => {
    actionSheetHandler()
    props.onPress(id)
  }

  return (
    <Animated.View style={[styles.container, animatedStyles]}>
      <View style={{ height: 60, width: '100%', flexDirection: 'row' }}>
        <View style={{ width: 60, height: 60 }}></View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 24, fontWeight: '700' }}>{props.header}</Text>
        </View>
        <View style={{ width: 60, height: 60, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity onPress={actionSheetHandler}>
            <Icon name={actionSheetStatus ? 'chevron-down-circle-outline' : 'chevron-up-circle-outline'} size={32} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        {
          actionSheetStatus ?
            <FlatList
              data={props.keyMoments}
              keyExtractor={(item: KeyMoment) => item.id.toString()}
              renderItem={renderActionSheetItem}
            /> : null
        }
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 200,
    backgroundColor: 'white',
    borderColor: 'black',
    borderTopWidth: 2
  }
});

export default keyMomentSheet