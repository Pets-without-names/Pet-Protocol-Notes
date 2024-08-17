import { View, StyleSheet, SafeAreaView, ImageBackground } from 'react-native';
import { Text } from '@rneui/themed';
import React, { useState } from 'react';

const Home = () => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text h2 style={styles.heading}>
          Protocol Notes
        </Text>
        <Text h4 style={styles.text}>
          A collaborative note app.
        </Text>
        <Text h4 style={styles.text}>
          Create and update dog walking protocols!
        </Text>

        <ImageBackground
          style={styles.image}
          resizeMode='contain'
          source={require('../../assets/images/pawprint200.png')}
        >
          <View>
            <Text h4 style={styles.imageText}>
              Please check-in with the staff to verify the proper dates and
              protocols
            </Text>
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};
export default Home;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
  },
  heading: {
    textAlign: 'center',
    padding: 10,
    marginTop: 40,
  },
  text: {
    textAlign: 'center',
    padding: 20,
  },
  imageText: {
    color: 'green',
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 40,
  },

  image: {
    height: 300,
    width: 300,
    resizeMode: 'cover',
    opacity: 0.6,
    justifyContent: 'center',
  },
});
