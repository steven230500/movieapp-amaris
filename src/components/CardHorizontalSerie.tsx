import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import {COLORS, FONTS} from '../constants/constans';
import Movie from '../models/Movie';
import ButtonCustom from './ButtonCustom';

interface MovieItemProps {
  movie: Movie;
}
const MovieCardHorizontal = ({movie}: MovieItemProps) => {
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
    <TouchableOpacity style={styles.container}>
      <Image
        source={{uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`}}
        style={styles.poster}
        resizeMode="contain"
      />
      <View style={styles.info}>
        <Text style={styles.title}>{movie.name}</Text>
        <View style={styles.rating}>{stars}</View>
        <Text style={styles.text}>IMDb: {movie.vote_average}</Text>
        <View style={styles.button}>
          <ButtonCustom
            title="Watch Now"
            borderRadius={20}
            backgroundColor={COLORS.primaryYellow}
            textColor={COLORS.secondaryBlack}
          />
          <Icon
            name="heart"
            size={30}
            color={COLORS.gray}
            style={{margin: 2}}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    marginVertical: 10,

    flexDirection: 'row',
    marginRight: 15,
  },
  poster: {
    marginRight: 20,
    width: 150,
    height: 220,
  },
  info: {
    height: 70,
    justifyContent: 'space-between',
  },
  title: {
    color: COLORS.white,
    fontFamily: FONTS.regular,
    fontSize: 18,
    fontWeight: 'bold',
  },
  text: {
    color: COLORS.white,
    fontFamily: FONTS.regular,
    fontSize: 14,
  },
  rating: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default MovieCardHorizontal;
