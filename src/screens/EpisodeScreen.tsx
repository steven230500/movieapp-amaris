import {NavigationProp, ParamListBase} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MovieApi from '../api/MovieApi';
import ButtonCustom from '../components/ButtonCustom';
import {COLORS, FONTS} from '../constants/constans';
import Episode from '../models/Episode';
import Movie from '../models/Movie';

type Props = {
  route: {
    params: {
      movie: Movie;
    };
  };
  navigation: NavigationProp<ParamListBase, 'Episode'>;
};

const EpisodeScreen = ({route, navigation}: Props) => {
  const {movie} = route.params;
  const backgroundImageUri = `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`;
  const [episode, setEpisode] = useState<Episode>();
  const [numberEpisode, setNumberEpisode] = useState<number>(1);
  const [finalEpisode, setFinalEpisode] = useState<Boolean>(false);

  useEffect(() => {
    MovieApi.get(`/tv/${movie.id}/season/${1}/episode/${numberEpisode}`)
      .then(response => {
        setEpisode(response.data);
        console.log('dsd', episode);
      })
      .catch(error => {
        console.error(error);
        setFinalEpisode(true);
        setNumberEpisode(numberEpisode - 1);
        console.log('dsd');
      });
  }, [numberEpisode]);

  const handleNextEpisode = (numberEpisode: number) => {
    const number = numberEpisode + 1;
    if (!finalEpisode) {
      setNumberEpisode(number);
    }
  };

  const handleLastEpisode = (numberEpisode: number) => {
    const number = numberEpisode - 1;
    if (numberEpisode > 1) {
      setFinalEpisode(false);

      setNumberEpisode(number);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{uri: backgroundImageUri}}
        style={styles.backgroundImage}>
        <View style={styles.header}>
          <View style={{alignItems: 'center', flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-left" size={25} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerText}>{movie.name}</Text>
          </View>
          <Icon name="heart" size={25} color="#fff" />
        </View>
        <View style={styles.header}>
          <View style={{alignItems: 'center', flexDirection: 'row'}}>
            {numberEpisode > 1 && (
              <TouchableOpacity
                onPress={() => handleLastEpisode(numberEpisode)}>
                <Icon name="arrow-left" size={25} color="#fff" />
              </TouchableOpacity>
            )}
            <Text style={styles.episodeTextHeader}>
              {numberEpisode} Episode
            </Text>
          </View>
          <TouchableOpacity onPress={() => handleNextEpisode(numberEpisode)}>
            <Icon name="arrow-right" size={25} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            }}
            style={styles.image}
          />
          <TouchableOpacity
            style={{
              position: 'absolute',
              width: 60,
              height: 60,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 30,
              backgroundColor: COLORS.white,
            }}>
            <Icon name="play" size={30} color={COLORS.primaryYellow} />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{episode?.name}</Text>
            <Text style={styles.episodeDescription}>{episode?.overview}</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 20,
    fontFamily: FONTS.regular,
    color: COLORS.white,
    marginLeft: 20,
  },
  episodeTextHeader: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    color: COLORS.white,
    marginLeft: 20,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    backgroundColor: COLORS.secondaryBlack,
    opacity: 0.9,
  },
  imageContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 350,
    height: 250,
  },
  titleContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  title: {
    color: COLORS.white,
    fontFamily: FONTS.bold,

    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  episodeDescription: {
    color: COLORS.white,
    fontFamily: FONTS.regular,
    fontSize: 16,
  },
});
export default EpisodeScreen;
