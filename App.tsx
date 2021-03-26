/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect } from 'react';

import {
  SafeAreaView,
  StyleSheet,
  View,
  FlatList
} from 'react-native';
import CommentContent from "./components/CommentContent";
import data from "./data/fantastec.json";
import KeyMomentSheet from "./components/KeyMomentsSheet"

export interface KeyMoment {
  id: Number,
  minute: Number,
  keyMomentType: String,
  content: String
}

const renderCommentItem = ({ item, index }) => {
  return (
    <CommentContent
      id={item.id}
      content={item.content}
      minute={item.minute}
      keyMomentType={item.keyMomentType}
      isLastItem={data.length - 1 === index ? true : false}
      selected={true}
    />
  )
}

const App = () => {
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.mainContainer}>
        <View style={styles.commentContainer}>
          <FlatList
            data={data}
            keyExtractor={item => item.id}
            renderItem={renderCommentItem}
          />
        </View>
        <View style={styles.sheetContainer}>
          <KeyMomentSheet
            header="Key Moments"
            keyMoments={data.filter((moment: KeyMoment) => moment.keyMomentType !== null)}
            onPress={(id: number) => alert(id)}
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
