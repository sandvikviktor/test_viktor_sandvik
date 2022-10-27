import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, StyleSheet, Image, TouchableHighlight} from 'react-native';
import {TvShow} from '../types';

interface ShowListItemProps {
  show: TvShow;
}

const ShowListItem: React.FC<ShowListItemProps> = ({show}) => {
  const {navigate} = useNavigation();
  return (
    <TouchableHighlight
      onPress={() =>
        navigate('ShowDetails', {showId: show.id, showName: show.name})
      }>
      <View style={styles.item}>
        {/* <Image style={styles.image} source={{ uri: show.image?.medium ? show.image.medium : show.image?.original }} /> */}
        {show.image?.medium || show.image?.original ? (
          <Image
            style={styles.image}
            source={{
              uri: show.image?.medium
                ? show.image?.medium
                : show.image?.original,
            }}
          />
        ) : (
          <View style={styles.noImage} />
        )}
        <View style={styles.details}>
          <Text style={styles.title}>{show.name}</Text>
          <Text style={styles.rating}>
            Rating: {show.rating?.average ? show.rating?.average : 0}
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default ShowListItem;

const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#222',
    padding: 10,
    marginBottom: 16,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  image: {
    aspectRatio: 1,
    flex: 1,
    width: 100,
    borderRadius: 5,
  },
  noImage: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 5,
    backgroundColor: '#333',
  },
  details: {
    flex: 3,
    marginLeft: 10,
    width: '100%',
    paddingRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    color: '#fff',
    flexWrap: 'wrap',
    width: '100%',
  },
  rating: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.7,
  },
});
