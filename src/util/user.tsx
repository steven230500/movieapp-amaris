import User from '../models/User';
import AsyncStorage from '@react-native-async-storage/async-storage';

const users: User[] = [
  {
    name: 'maria',
    password: 'password',
  },
  {
    name: 'pedro',
    password: '123456',
  },
];

export const authenticateUser = async (name: string, password: string) => {
  const user = users.find(u => u.name === name);

  if (user && user.password === password) {
    await AsyncStorage.setItem('isAuthenticated', 'true');
    return true;
  } else {
    return false;
  }
};
