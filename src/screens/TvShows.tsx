import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {API_BASE} from '../../env';
import ShowListItem from '../components/ShowListItem';
import {TvShow, TvShowResponse} from '../types';
import useDebounce from '../hooks/useDebounce';

interface TvSeriesProps {}

const TvShows: React.FC<TvSeriesProps> = () => {
  const [shows, setShows] = useState<TvShow[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    searchForTvShows(debouncedSearchQuery);
  }, [debouncedSearchQuery]);

  const searchForTvShows = async (queryString: string) => {
    setIsLoading(true);
    const response = await fetch(`${API_BASE}/search/shows?q=${queryString}`);
    const data = await response.json();
    if (data.length > 0) {
      const showsData = data.map((show: TvShowResponse) => show.show);
      setShows(showsData);
      setIsLoading(false);
    } else {
      console.log('No shows were found');
      setShows([]);
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search for tv shows"
          onChangeText={e => setSearchQuery(e)}
          value={searchQuery}
          autoCorrect={false}
        />
        {isLoading && (
          <ActivityIndicator
            style={styles.loadingSpinner}
            size={'small'}
            color="#000"
          />
        )}
      </View>
      {!isLoading && debouncedSearchQuery !== '' && shows.length === 0 && (
        <Text style={styles.errorMessage}>No shows were found.</Text>
      )}
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
  searchContainer: {
    position: 'relative',
  },
  searchBar: {
    backgroundColor: '#fff',
    padding: 20,
    marginHorizontal: 10,
    marginVertical: 20,
    borderRadius: 10,
  },
  errorMessage: {
    color: '#fff',
    fontSize: 16,
    marginHorizontal: 10,
  },
  loadingSpinner: {
    position: 'absolute',
    right: 26,
    top: 38,
  },
});
