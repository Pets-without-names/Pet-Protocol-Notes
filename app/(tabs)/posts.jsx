import { StyleSheet, SafeAreaView } from 'react-native';
import { Text, Card } from '@rneui/themed';
import React from 'react';

const messages = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Card containerStyle={styles.cardContainer}>
        {/* <Card.Title>User Posts</Card.Title> */}
        <Text h3 style={styles.title}>
          User Posts
        </Text>
      </Card>
    </SafeAreaView>
  );
};

export default messages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F6F4F3',
  },
  cardContainer: {
    width: '90%',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    shadowColor: 'grey',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    marginBottom: 20,
  },
  title: {
    textAlign: 'center',
    fontWeight: '600',
    color: '#304D6D',
  },
});
