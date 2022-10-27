import React from 'react';
import {View, Text, StyleSheet, TouchableHighlight, Image} from 'react-native';
import {TvShowSeason} from '../types';

interface ShowListItemProps {
  season: TvShowSeason;
  index: number;
}

const SeasonListItem: React.FC<ShowListItemProps> = ({season, index}) => {
  return (
    <TouchableHighlight>
      <View style={styles.item}>
        {season.image?.medium || season.image?.original ? (
          <Image
            style={styles.image}
            source={{
              uri: season.image?.medium
                ? season.image?.medium
                : season.image?.original,
            }}
          />
        ) : (
          <View style={styles.noImage} />
        )}
        <View style={styles.details}>
          <Text style={styles.title}>Season {index + 1}</Text>
          <Text style={styles.rating}>{season.episodeOrder} episodes</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default SeasonListItem;

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
    width: 70,
    height: 70,
    borderRadius: 5,
  },
  noImage: {
    width: 70,
    height: 70,
    borderRadius: 5,
    backgroundColor: '#333',
  },
  details: {
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    color: '#fff',
    flexWrap: 'wrap',
  },
  rating: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.7,
  },
});
