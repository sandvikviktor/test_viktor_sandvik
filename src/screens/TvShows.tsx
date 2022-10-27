import React from 'react';
import {ScrollView, StyleSheet, TextInput, View} from 'react-native';
import {API_BASE} from '../../env';
import ShowListItem from '../components/ShowListItem';
import {TvShow, TvShowResponse} from '../types';

interface TvSeriesProps {}

const TvShows: React.FC<TvSeriesProps> = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [shows, setShows] = React.useState<TvShow[]>([]);

  const searchForTvShows = async () => {
    const response = await fetch(`${API_BASE}/search/shows?q=${searchQuery}`);
    const data = await response.json();
    if (data.length > 0) {
      const showsData = data.map((show: TvShowResponse) => show.show);
      setShows(showsData);
      setSearchQuery('');
      // console.warn(showsData);
    } else {
      console.log('No shows were found');
      setShows([]);
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search for tv shows"
        onChangeText={e => setSearchQuery(e)}
        value={searchQuery}
        autoCorrect={false}
        onSubmitEditing={searchForTvShows}
      />
      <ScrollView>
        {shows.map(show => (
          <ShowListItem key={show.id} show={show} />
        ))}
      </ScrollView>
    </View>
  );
};

export default TvShows;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  searchBar: {
    backgroundColor: '#fff',
    padding: 20,
    marginHorizontal: 10,
    marginVertical: 20,
    borderRadius: 10,
  },
});
