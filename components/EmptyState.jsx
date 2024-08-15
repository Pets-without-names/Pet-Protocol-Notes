import { View, StyleSheet } from 'react-native';
import { Text } from '@rneui/themed';
import React, { useEffect } from 'react';

const EmptyState = ({ title, subtitle }) => {
  return (
    <View style={styles.container}>
      <Text h2>{title}</Text>
      <Text h3>{subtitle}</Text>
    </View>
  );
};

export default EmptyState;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 2,
    borderColor: 'lightgray',
    borderRadius: 10,
  },
  title: {},
  subtitle: {},
});
