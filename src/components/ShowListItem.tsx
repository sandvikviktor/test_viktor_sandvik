import React from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import {TvShow} from '../types';

interface ShowListItemProps {
  show: TvShow;
}

const ShowListItem: React.FC<ShowListItemProps> = ({show}) => {
  console.log(show);
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{show.name}</Text>
    </View>
  );
};

export default ShowListItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    color: '#000',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 32,
  },
});
