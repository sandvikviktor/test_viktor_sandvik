import React from 'react';
import {ScrollView, StyleSheet, TextInput} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {API_BASE} from '../../env';
import ShowListItem from '../components/ShowListItem';
import {TvShow} from '../types';
// import {useShows} from '../providers/shows/ShowsProvider';

interface TvSeriesProps {}

const TvShows: React.FC<TvSeriesProps> = () => {
  // const {shows, setShows} = useShows();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [shows, setShows] = React.useState<TvShow[]>([]);

  const searchForTvShows = async (query: string) => {
    const response = await fetch(`${API_BASE}/search/shows?q=${query}`);
    const data = await response.json();
    console.log(data);
    console.warn(data);
    setShows(data.map((show: any) => show.show));
    // setSearchResults(data);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search for shows"
        onChangeText={e => setSearchQuery(e)}
        value={searchQuery}
        autoCorrect={false}
        onSubmitEditing={searchForTvShows}
      />
      <ScrollView style={styles.searchResults}>
        {/* {shows.map(show => (
          <ShowListItem show={show} />
        ))} */}
        {shows.map(show => (
          <ShowListItem key={show.id} show={show} />
        ))}
      </ScrollView>
    </SafeAreaView>
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
    padding: 15,
    margin: 10,
    borderRadius: 10,
  },
  searchResults: {
    // flex: 1,
    // backgroundColor: '#333',
  },
});
