import React from 'react';
import {render} from '@testing-library/react-native';
import HomeScreen from '../../src/screens/HomeScreen';
import 'react-native-gesture-handler/jestSetup';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import {NativeModules} from 'react-native';
jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);
jest.mock('react-native-vector-icons/FontAwesome5', () => 'Icon');
jest.mock('axios', () => {
  const mAxiosInstance = {get: jest.fn()};
  return {
    create: jest.fn(() => mAxiosInstance),
  };
});

NativeModules.UIManager = NativeModules.UIManager || {};
NativeModules.UIManager.setLayoutAnimationEnabledExperimental &&
  NativeModules.UIManager.setLayoutAnimationEnabledExperimental(true);

describe('HomeScreen', () => {
  test('renders the screen title', () => {
    const {getByText} = render(<HomeScreen />);
    const titleElement = getByText(/Home/i);
    expect(titleElement).toBeDefined();
  });

  test('renders the popular series list', async () => {
    const {findByText} = render(<HomeScreen />);
    const titleElement = await findByText(/Series más populares/i);
    expect(titleElement).toBeDefined();
  });

  test('renders the recommended series list', async () => {
    const {findByText} = render(<HomeScreen />);
    const titleElement = await findByText(/Series recomendadas/i);
    expect(titleElement).toBeDefined();
  });
});
