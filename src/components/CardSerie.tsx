import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import {COLORS, FONTS} from '../constants/constans';
import Movie from '../models/Movie';

interface MovieItemProps {
  movie: Movie;
}
const MovieCard = ({movie}: MovieItemProps) => {
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
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 210,
    marginRight: 15,
  },
  poster: {
    width: 80,
    height: 120,
    marginRight: 10,
  },
  info: {
    width: 80,
    height: 70,
    justifyContent: 'space-between',
  },
  title: {
    color: COLORS.white,
    fontFamily: FONTS.regular,
    fontSize: 18,
    fontWeight: 'bold',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default MovieCard;
