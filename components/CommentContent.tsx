import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export interface Props {
    id: string;
    content: string;
    minute: number;
    keyMomentType: string;
    isLastItem: boolean;
    selected: boolean;
}

const CommentContent: React.FC<Props> = (props) => {
  return (
    <View style={styles(props).container}>
        <View style={styles(props).minuteContainer}>
        <Text style={styles(props).minuteText}>{props.minute}</Text>
        </View>
        <View style={styles(props).contentHighlighted}>
          <Text style={styles(props).contentText}>{props.content}</Text>
        </View>
    </View>
  );
};

const styles = (val: Props) => StyleSheet.create({
  container: {
      borderLeftWidth: 3,
      borderColor: val.isLastItem ? 'white' : 'black',
      marginLeft: 40,
      marginRight: 20
  },
  contentText: {
      fontSize: 14,
      paddingLeft: 15
  },
  contentHighlighted: {
    marginHorizontal: 30,
    borderRadius: 10,
    backgroundColor: val.selected ? 'rgba(0, 255, 0, 0.1)' : 'white',
    borderColor: 'green',
    borderWidth: val.selected ? 2 : 0,
    marginBottom: 20
  },
  minuteContainer: {
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    borderColor: 'black', 
    borderWidth: 3, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: 'white', 
    position: 'absolute', 
    left: -20
  },
  minuteText: {
    color: 'black',
    fontWeight: '500',
    fontSize: 14
  }
});

export default CommentContent;