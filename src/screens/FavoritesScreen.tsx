import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import React, {useContext, useState} from 'react';
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MovieCardHorizontal from '../components/CardHorizontalSerie';
import {COLORS, FONTS} from '../constants/constans';
import {FavoriteContext} from '../context/FavoritesContext';
import Movie from '../models/Movie';

interface FavoritesScreenProps {
  navigation: NavigationProp<ParamListBase, 'Favorites'>;
}

const FavoritesScreen = ({navigation}: FavoritesScreenProps) => {
  const {favoriteSeries, removeFavorite} = useContext(FavoriteContext);

  const logout = async () => {
    try {
      await AsyncStorage.setItem('isAuthenticated', 'false');
      navigation.navigate('Auth', {screen: 'Welcome'});
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Favorites</Text>
        <TouchableOpacity onPress={logout}>
          <Icon name="close" size={25} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <FlatList
          data={favoriteSeries}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <MovieCardHorizontal
              movie={item}
              onAction={() => removeFavorite(item.id)}
            />
          )}
        />
      </View>
    </View>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondaryBlack,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#222',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 10,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: FONTS.bold,
    color: COLORS.white,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: FONTS.bold,
    color: COLORS.primaryYellow,
    textAlign: 'right',
  },
  posterContainer: {
    width: 120,
    height: 180,
    marginRight: 15,
  },
  posterImage: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 10,
  },
  posterTitle: {
    backgroundColor: '#000',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  posterTitleText: {
    color: '#fff',
    marginTop: 10,
    textAlign: 'center',
    fontFamily: FONTS.regular,
  },
  recommendedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  recommendedImage: {
    width: 100,
    height: 150,
    marginRight: 15,
  },
  recommendedTitle: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  recommendedTitleText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  recommendedRating: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fdcc0d',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  recommendedRatingText: {
    color: '#fff',
    marginLeft: 5,
  },
  favoritesButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fdcc0d',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    bottom: 20,
    right: 20,
  },
  favoritesButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
