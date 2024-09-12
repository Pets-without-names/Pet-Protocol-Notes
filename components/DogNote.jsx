import { Pressable, StyleSheet } from 'react-native';
import { Card, Text } from '@rneui/themed';
import React from 'react';
import { router } from 'expo-router';

const DogNote = ({ dogInfo }) => {
  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        router.push({
          pathname: `../../details/${dogInfo.$id}`,
          params: dogInfo,
        });
      }}
    >
      <Card containerStyle={styles.card}>
        <Text style={styles.name}>{dogInfo.name}</Text>
      </Card>
    </Pressable>
  );
};

export default DogNote;

const styles = StyleSheet.create({
  container: {},
  card: {
    backgroundColor: '#304D6D',
    cornerRadius: '10',
    borderColor: 'black',
    borderWidth: '1',
    borderRadius: '10',
    padding: 12,
  },
  name: {
    fontSize: '22',
    fontWeight: '600',
    letterSpacing: 1.5,
    color: 'white',
    textAlign: 'center',
  },
});
