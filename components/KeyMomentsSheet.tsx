import React, { useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, FlatList, ListRenderItem } from 'react-native'
import Animated, { withSpring, useSharedValue, useAnimatedStyle } from 'react-native-reanimated';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export interface KeyMoment {
  id: number,
  minute: number,
  keyMomentType: string,
  content: string
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


  const renderActionSheetItem: ListRenderItem<KeyMoment> = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => handleActionSheetSelection(item.id)} style={styles.renderItemContainer}>
        <View style={styles.minuteContainer}>
          <Text style={styles.itemText}>{item.minute}</Text>
        </View>
        <View style={styles.keyMomentContainer}>
          <Text style={styles.itemText}>{item.keyMomentType}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  const handleActionSheetSelection = (id: number) => {
    actionSheetHandler()
    props.onPress(id)
  }

  return (
    <Animated.View style={[styles.mainContainer, animatedStyles]}>
      <View style={styles.headerContainer}>
        <View style={styles.sideContainers}></View>
        <View style={styles.textContainer}>
          <Text style={styles.headerText}>{props.header}</Text>
        </View>
        <View style={styles.sideContainers}>
          <TouchableOpacity onPress={actionSheetHandler}>
            <Icon name={actionSheetStatus ? 'chevron-down-circle-outline' : 'chevron-up-circle-outline'} size={32} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.actionSheetContainer}>
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
  mainContainer: {
    width: "100%",
    height: 200,
    backgroundColor: 'white',
    borderColor: 'black',
    borderTopWidth: 2
  },
  actionSheetContainer: {
    flex: 1
  },
  headerContainer: {
    height: 60, 
    width: '100%', 
    flexDirection: 'row'
  },
  sideContainers: {
    width: 60, 
    height: 60, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  textContainer: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  headerText: {
    fontSize: 24, 
    fontWeight: '700'
  },
  renderItemContainer: {
    width: '100%', 
    height: 40, 
    flexDirection: 'row'
  },
  minuteItemContainer: {
    width: 70, 
    height: '100%', 
    alignItems: 'flex-end'
  },
  minuteContainer: {
    width: 70, 
    height: '100%', 
    alignItems: 'flex-end'
  },
  keyMomentContainer: {
    flex: 1, 
    marginLeft: 40
  },
  itemText: {
    fontSize: 20, 
    fontWeight: '400'
  }
});

export default keyMomentSheet