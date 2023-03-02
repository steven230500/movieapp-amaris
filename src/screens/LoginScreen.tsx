import {ParamListBase, RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {authenticateUser} from '../util/user';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  ImageBackground,
  Alert,
} from 'react-native';
import {COLORS, FONTS} from '../constants/constans';

type LoginScreenNavigationProp = StackNavigationProp<ParamListBase, 'Login'>;

type LoginScreenProps = {
  route: {
    params: {
      movieBackdropUrl: string;
    };
  };
  navigation: LoginScreenNavigationProp;
};

const LoginScreen = ({route, navigation}: LoginScreenProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {movieBackdropUrl} = route.params;

  const handleLogin = async () => {
    if (await authenticateUser(username, password)) {
      navigation.navigate('Home');
    } else {
      Alert.alert(
        'Error',
        'Datos erroneos',
        [
          {
            text: 'OK',
            onPress: () => console.log('OK Pressed'),
            style: 'cancel',
          },
        ],
        {cancelable: false},
      );
    }
  };
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
      }}
      style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.inputsContainer}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#fff"
            onChangeText={text => setUsername(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            placeholderTextColor="#fff"
            onChangeText={text => setPassword(text)}
          />
        </View>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => handleLogin()}>
          <Text style={styles.loginButtonText}>Log in</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.xbutton}>x</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  xbutton: {
    color: COLORS.white,
    fontSize: 24,
  },
  closeButton: {
    position: 'absolute',
    top: 5,
    right: 20,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    backgroundColor: 'rgba(25, 25, 25, 0.8)',
    position: 'relative',
  },
  inputsContainer: {
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    margin: 10,
    fontFamily: FONTS.regular,
    width: 300,
    color: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    backgroundColor: 'transparent',
  },
  loginButton: {
    alignSelf: 'center',
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 20,
    margin: 20,
    width: 200,
  },
  loginButtonText: {
    color: COLORS.secondaryBlack,
    fontSize: 18,
    textAlign: 'center',
    fontFamily: FONTS.regular,
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default LoginScreen;
