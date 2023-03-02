import React, {useState, useEffect} from 'react';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import MovieApi from '../api/MovieApi';
import ButtonCustom from '../components/ButtonCustom';
import {COLORS, FONTS} from '../constants/constans';

interface WelcomeScreenProps {
  navigation: NavigationProp<ParamListBase, 'WelcomeScreen'>;
}

const WelcomeScreen = ({navigation}: WelcomeScreenProps) => {
  const [movieBackdropUrl, setMovieBackdropUrl] = useState('');

  useEffect(() => {
    MovieApi.get('/tv/71912')
      .then(response => {
        const backdropUrl = `https://image.tmdb.org/t/p/original/${response.data.poster_path}`;
        setMovieBackdropUrl(backdropUrl);
      })
      .catch(error => {
        console.error(error);
      });
  }, [movieBackdropUrl]);

  return (
    <ImageBackground
      source={
        movieBackdropUrl
          ? {uri: movieBackdropUrl}
          : {
              uri: 'https://placehold.jp/3d4070/ffffff/500x500.png?text=Not%20found',
            }
      }
      defaultSource={{
        uri: 'https://placehold.jp/3d4070/ffffff/500x500.png?text=Not%20found',
      }} // Imagen por defecto si la URL es nula
      style={styles.backgroundImage}>
      <View style={styles.containerTitle}>
        <Text style={styles.welcomeText}>Welcome!</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.buttonsContainer}>
          <ButtonCustom
            title="Sing Up"
            onPress={() => console.log('Register pressed')}
            backgroundColor={COLORS.primaryYellow}
            borderRadius={20}
            textColor={COLORS.secondaryBlack}
          />
          <ButtonCustom
            title="Log in"
            onPress={() =>
              navigation.navigate('Login', {movieBackdropUrl: movieBackdropUrl})
            }
            borderRadius={20}
            backgroundColor={COLORS.white}
            textColor={COLORS.secondaryBlack}
          />
          <ButtonCustom
            title="Forgot Password?"
            onPress={() => console.log('Forgot Password pressed')}
            textColor={COLORS.white}
            backgroundColor={'transparent'}
            underline={'underline'}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'center',
  },
  containerTitle: {
    marginTop: 100,
    justifyContent: 'flex-start',
  },
  container: {
    marginTop: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 30,
    color: 'white',
    marginBottom: 30,
    fontFamily: FONTS.bold,
  },
  buttonsContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 150,
    width: '50%',
  },
});

export default WelcomeScreen;
