import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  useWindowDimensions,
} from 'react-native';
import {API_BASE} from '../../env';
import SeasonListItem from '../components/SeasonListItem';
import {TvShow, TvShowSeason} from '../types';
interface ShowDetailsProps {
  route: any;
}

const ShowDetails: React.FC<ShowDetailsProps> = ({route}) => {
  const {showId, showName} = route.params;
  const [show, setShow] = React.useState<TvShow>();
  const [seasons, setSeasons] = React.useState<TvShowSeason[]>([]);
  const [isImageLoading, setIsImageLoading] = React.useState(true);

  const {height: screenHeight} = useWindowDimensions();

  const navigation = useNavigation();
  navigation.setOptions({title: showName});

  // Get show details
  React.useEffect(() => {
    if (showId) {
      getShowById(showId);
    }
  }, [showId]);

  // Get seasons when show data is set
  React.useEffect(() => {
    if (show) {
      getSeasonsByShowId(show.id);
    }
  }, [show]);

  const getShowById = async (id: string) => {
    const response = await fetch(`${API_BASE}/shows/${id}`);
    const data = await response.json();
    if (data) {
      setShow(data);
    } else {
      console.log('No show was found');
    }
  };

  const getSeasonsByShowId = async (id: string) => {
    const response = await fetch(`${API_BASE}/shows/${id}/seasons`);
    const data = await response.json();
    if (data.length > 0) {
      setSeasons(data);
    } else {
      console.log('No seasons were found');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {isImageLoading && (
          <ActivityIndicator
            style={styles.loadingSpinner}
            size={'large'}
            color="#fff"
          />
        )}
        <View style={(styles.header, {height: screenHeight * 0.6})}>
          {show && (
            <Image
              style={styles.ImageBackground}
              source={{uri: show.image?.original}}
              onLoadStart={() => setIsImageLoading(true)}
              onLoadEnd={() => setIsImageLoading(false)}
            />
          )}
          <View style={styles.headerTitle}>
            <Text style={styles.title}>{show?.name}</Text>
            <Text style={styles.rating}>
              Rating: {show?.rating?.average ? show?.rating?.average : 0}
            </Text>
          </View>
          <Image
            style={styles.ImageLayer}
            source={require('../assets/gradient.png')}
          />
        </View>
        {seasons.length > 0 &&
          seasons.map((season, index) => (
            <SeasonListItem key={index} season={season} index={index} />
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ShowDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    position: 'relative',
  },
  ImageBackground: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    resizeMode: 'cover',
    width: '100%',
    alignItems: 'center',
    zIndex: 1,
  },
  ImageLayer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: 2,
  },
  headerTitle: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    padding: 20,
    zIndex: 3,
  },
  title: {
    fontSize: 32,
    color: '#fff',
  },
  rating: {
    fontSize: 16,
    color: '#fff',
  },
  loadingSpinner: {
    position: 'absolute',
    right: 20,
    top: 25,
    zIndex: 100,
  },
});
