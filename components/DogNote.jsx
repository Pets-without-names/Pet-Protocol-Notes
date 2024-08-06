import { Pressable, StyleSheet } from 'react-native';
import { Card } from '@rneui/themed';
import React from 'react';
import { router } from 'expo-router';

const DogNote = ({ dogInfo }) => {
  return (
    <Pressable
      onPress={() => {
        router.push({
          pathname: `../../details/${dogInfo.$id}`,
          params: dogInfo,
        });
        // router.push(`../../details/${dogInfo.$id}`);
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
  card: {
    backgroundColor: 'lightblue',
    cornerRadius: '10',
    borderColor: 'black',
    borderWidth: '1',
    borderRadius: '10',
  },
  name: {
    fontSize: '16',
  },
});
