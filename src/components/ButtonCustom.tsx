import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

interface Props {
  title: string;
  onPress?: () => void;
  borderRadius?: number;
  backgroundColor?: string;
  textColor?: string;
  underline?: 'underline' | 'none';
}

const ButtonCustom = ({
  title,
  onPress,
  borderRadius = 8,
  backgroundColor = '#000',
  textColor = '#fff',
  underline = 'none',
}: Props) => {
  return (
    <TouchableOpacity
      style={[styles.button, {borderRadius, backgroundColor}]}
      onPress={onPress}>
      <Text
        style={[
          styles.text,
          {color: textColor, textDecorationLine: underline},
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ButtonCustom;
