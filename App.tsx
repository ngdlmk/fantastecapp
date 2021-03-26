/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useState, useRef } from 'react';

import {
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  ListRenderItem
} from 'react-native';
import CommentContent from "./components/CommentContent";
import data from "./data/fantastec.json";
import KeyMomentSheet from "./components/KeyMomentsSheet"

export interface KeyMoment {
  id: number,
  minute: number,
  keyMomentType: string,
  content: string
}

const App = () => {
  const [selectedKeyMomentId, setSelectedKeyMomentId] = useState(null)
  const flatListRef = useRef()
  const renderCommentItem: ListRenderItem<KeyMoment> = ({ item, index }) => {
    return (
      <CommentContent
        id={item.id.toString()}
        content={item.content}
        minute={item.minute}
        keyMomentType={item.keyMomentType}
        isLastItem={data.length - 1 === index ? true : false}
        selected={selectedKeyMomentId === item.id}
      />
    )
  }
  
  const handleActionSheetSelection = (id: number) => {
    const index = data.findIndex((item: KeyMoment) => item.id === id)
    setSelectedKeyMomentId(data[index].id)
    flatListRef.current.scrollToIndex({ index })
  }

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.mainContainer}>
        <View style={styles.commentContainer}>
          <FlatList
            ref={flatListRef}
            data={data}
            keyExtractor={(item: KeyMoment) => item.id.toString()}
            renderItem={renderCommentItem}
          />
        </View>
        <View style={styles.sheetContainer}>
          <KeyMomentSheet
            header="Key Moments"
            keyMoments={data.filter((moment: KeyMoment) => moment.keyMomentType !== null)}
            onPress={(id: number) => handleActionSheetSelection(id)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1
  },
  mainContainer: {
    flex: 1
  },
  commentContainer: {
    flex: 1
  },
  sheetContainer: {
    width: "100%",
    height: 50,
  }
});

export default App;
