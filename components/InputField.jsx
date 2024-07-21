import { View, StyleSheet } from 'react-native';
import { Text, Input } from '@rneui/themed';
import React, { useState } from 'react';

const InputField = ({ title, value, placeholder, otherStyles, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <View style={styles.outer}>
        <View style={styles.title}>
          <Text h4>{title}</Text>
        </View>
        <View style={styles.container}>
          <Input
            value={value}
            placeholder={placeholder}
            secureTextEntry={title === 'Password' && !showPassword}
            style={styles.basic}
          />
        </View>
      </View>
    </>
  );
};

export default InputField;

const styles = StyleSheet.create({
  outer: { alignItems: 'center' },
  title: { alignItems: 'center' },
  container: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 20,
    width: '85%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  basic: {},
});
