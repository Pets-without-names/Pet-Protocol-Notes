import { Pressable, StyleSheet } from 'react-native';
import { Card } from '@rneui/themed';
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
        <Card.Title style={styles.name}>{dogInfo.name}</Card.Title>
      </Card>
    </Pressable>
  );
};

export default DogNote;

const styles = StyleSheet.create({
  container: {},
  card: {
    //backgroundColor: '#2B58ED',
    //backgroundColor: '#4357AD',
    //backgroundColor: '#82A0BC',
    backgroundColor: '#304D6D',
    cornerRadius: '10',
    borderColor: 'black',
    borderWidth: '1',
    borderRadius: '10',
  },
  name: {
    fontSize: '20',
    letterSpacing: 1.5,
    color: 'white',
    marginTop: 10,
  },
});
