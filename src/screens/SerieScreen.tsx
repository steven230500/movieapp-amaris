import {NavigationProp, ParamListBase} from '@react-navigation/native';
import React from 'react';
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
import ButtonCustom from '../components/ButtonCustom';
import {COLORS, FONTS} from '../constants/constans';
import Movie from '../models/Movie';

type Props = {
  route: {
    params: {
      movie: Movie;
    };
  };
  navigation: NavigationProp<ParamListBase, 'Serie'>;
};

const DetailScreen = ({route, navigation}: Props) => {
  const {movie} = route.params;
  const backgroundImageUri = `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`;
  const numStars = Math.floor(movie.vote_average / 2);

  const stars = new Array(numStars).fill('').map((_, index) => {
    return (
      <Icon
        key={index}
        name="star"
        size={10}
        color={COLORS.gray}
        style={{margin: 2}}
      />
    );
  });

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{uri: backgroundImageUri}}
        style={styles.backgroundImage}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={25} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Popular</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            }}
            style={styles.image}
          />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{movie.name}</Text>
            <View style={styles.rating}>{stars}</View>
            <Text style={styles.textIMD}>IMDb: {movie.vote_average}</Text>
            <ButtonCustom
              title="Watch Now"
              borderRadius={20}
              onPress={() =>
                navigation.navigate('Episode', {
                  movie: movie,
                })
              }
              backgroundColor={COLORS.primaryYellow}
              textColor={COLORS.secondaryBlack}
            />
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
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 20,
    fontFamily: FONTS.regular,
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
    width: 200,
    height: 300,
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
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textIMD: {
    color: COLORS.white,
    fontFamily: FONTS.regular,
    fontSize: 14,
    marginVertical: 10,
  },
});
export default DetailScreen;
